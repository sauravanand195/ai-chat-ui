import { NextResponse } from "next/server";
import {
    ProjectPlanRequestSchema,
    ProjectPlanSchema,
    type ProjectPlan,
} from "@/lib/schemas/project-plan";

const OLLAMA_BASE_URL =
    process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

type ProjectPlanRequest = {
    goal: string;
};

type OllamaGenerateResponse = {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    done_reason?: string;
    thinking?: string;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
    error?: string;
};

export async function POST(req: Request) {
    console.log(' IN ST -> ',  );
    try {
        const body: ProjectPlanRequest = await req.json();

        const parsedBody = ProjectPlanRequestSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json(
                {
                    error: parsedBody.error.issues[0]?.message || "Invalid request body",
                },
                { status: 400 }
            );
        }


        const { goal }: ProjectPlanRequest = parsedBody.data;

        const prompt: string = `
You are an expert project planner.

Return ONLY valid JSON with this exact structure:
{
    "title": "string",
    "difficulty": "Beginner|Intermediate|Advanced",
    "estimatedTime": "string",
    "summary": "string",
    "tools": ["string"],
    "steps": ["string"],
    "risks": ["string"]
}

Project goal: ${goal}
    `.trim();

        const ollamaResponse: Response = await fetch(`http://localhost:11434/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt,
                format: "json",
                stream: false,
                keep_alive: "0m",
                options: {
                    temperature: 0.1,
                    top_p: 0.9,
                },
            }),
        });

        const rawText: string = await ollamaResponse.text();

        let data: OllamaGenerateResponse;

        try {
            data = JSON.parse(rawText) as OllamaGenerateResponse;
        } catch {
            return NextResponse.json(
                {
                    error: "Ollama returned HTML or invalid JSON",
                    preview: rawText.slice(0, 300),
                },
                { status: 500 }
            );
        }

        if (!ollamaResponse.ok || !data.response) {
            return NextResponse.json(
                {
                    error: `Ollama failed: ${data.error || "No response"}`,
                },
                { status: 500 }
            );
        }

        let parsedModelResponse: ProjectPlan;

        try {
            parsedModelResponse = JSON.parse(data.response) as ProjectPlan;
        } catch {
            return NextResponse.json(
                {
                    error: "Invalid JSON returned by model",
                    preview: data.response.slice(0, 300),
                },
                { status: 500 }
            );
        }

        const validatedPlan = ProjectPlanSchema.safeParse(parsedModelResponse);

        if (!validatedPlan.success) {
            return NextResponse.json(
                {
                    error: "Model returned invalid project plan structure",
                    details: validatedPlan.error.flatten(),
                },
                { status: 500 }
            );
        }

        const plan: ProjectPlan = validatedPlan.data;

        return NextResponse.json({ plan });
    } catch (error) {
        console.error("Route error:", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Server error",
            },
            { status: 500 }
        );
    }
}