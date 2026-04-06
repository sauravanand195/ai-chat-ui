const mockReplies = [
    "This response is coming from your Next.js API route, not from the frontend anymore.",
    "Nice — you have now connected your chat UI to a backend endpoint.",
    "Your integration step is working. The next upgrade will be replacing this mock response with a real model call.",
    "This is a mocked assistant reply returned by app/api/chat/route.ts.",
];

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const message = body?.message;

        if (!message || typeof message !== "string") {
            return Response.json(
                { error: "A valid message is required." },
                { status: 400 }
            );
        }

        const randomReply =
            mockReplies[Math.floor(Math.random() * mockReplies.length)];

        return Response.json({
            reply: `${randomReply}\n\nYou said: "${message}"`,
        });
    } catch {
        return Response.json(
            { error: "Something went wrong while processing the request." },
            { status: 500 }
        );
    }
}