export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return Response.json({ error: "No file received" }, { status: 400 });
        }

        return Response.json({
            success: true,
            name: file.name,
            type: file.type,
            size: file.size,
        });
    } catch (error) {
        return Response.json(
            {
                error:
                    error instanceof Error ? error.message : "Upload route failed",
            },
            { status: 500 }
        );
    }
}