import { NextResponse } from 'next/server'
import { ProjectPlanSchema } from '@/lib/schemas/project-plan'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const userGoal = body?.goal

        if (!userGoal || typeof userGoal !== 'string') {
            return NextResponse.json({ error: 'Goal is required.' }, { status: 400 })
        }

        // llama3.2:3b specific prompt that works reliably
        const prompt = `You are an expert project planner. Return ONLY valid JSON matching this exact schema, nothing else:

                        {
                            "title": "string - project title",
                            "difficulty": "Beginner|Intermediate|Advanced",
                            "estimatedTime": "string - like '2-4 weeks'",
                            "summary": "string - 1-2 sentence overview",
                            "tools": ["array", "of", "tech", "tools"],
                            "steps": ["array", "of", "5-8", "actionable", "steps"],
                            "risks": ["array", "of", "2-4", "potential", "problems"]
                        }

                        Project goal: ${userGoal}`

        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2:3b',
                prompt,
                format: 'json',
                stream: false,
                options: {
                    temperature: 0.1, // Low temp = more reliable JSON
                    top_p: 0.9,
                },
            }),
        })

        const data = await ollamaResponse.json()

        // Debug log - check your server terminal
        console.log('Ollama response:', data)

        if (!ollamaResponse.ok || !data.response) {
            return NextResponse.json({ error: `Ollama failed: ${data.error || 'No response'}` }, { status: 500 })
        }

        // Parse and validate
        let parsed
        try {
            parsed = JSON.parse(data.response)
        } catch {
            return NextResponse.json({ error: 'Invalid JSON from model' }, { status: 500 })
        }

        // Safe fallback for UI
        const validated = ProjectPlanSchema.parse({
            title: parsed.title || 'Untitled Project',
            difficulty: parsed.difficulty || 'Intermediate',
            estimatedTime: parsed.estimatedTime || '1-2 weeks',
            summary: parsed.summary || 'No summary available',
            tools: parsed.tools || [],
            steps: parsed.steps || [],
            risks: parsed.risks || [],
        })

        return NextResponse.json({ plan: validated })
    } catch (error) {
        console.error('Route error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
