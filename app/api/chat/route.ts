type IncomingMessage = {
    role: "user" | "assistant" | "system";
    content: string;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages = body?.messages as IncomingMessage[] | undefined;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return Response.json(
                { error: "A valid messages array is required." },
                { status: 400 }
            );
        }

        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama3.2:3b",
                messages,
                stream: false,
                keep_alive: "0m",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();

            return Response.json(
                { error: `Ollama request failed: ${errorText}` },
                { status: 500 }
            );
        }

        const data = await response.json();

        return Response.json({
            reply: data?.message?.content ?? "No response returned by Ollama.",
        });
    } catch (error) {
        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while talking to Ollama.",
            },
            { status: 500 }
        );
    }
}