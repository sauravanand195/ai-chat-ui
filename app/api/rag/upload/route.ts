import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            return Response.json(
                { error: "A valid file is required." },
                { status: 400 }
            );
        }

        const fileName = file.name.toLowerCase();
        const fileType = file.type;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let text = "";

        if (
            fileType === "text/plain" ||
            fileName.endsWith(".txt") ||
            fileName.endsWith(".md")
        ) {
            text = buffer.toString("utf-8");
        } else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
            const parser = new PDFParse({ data: buffer });
            const pdfData = await parser.getText();
            text = pdfData.text;
        } else {
            return Response.json(
                {
                    error: "Unsupported file type. Please upload a PDF, TXT, or MD file.",
                },
                { status: 400 }
            );
        }

        if (!text.trim()) {
            return Response.json(
                { error: "No readable text found in the uploaded file." },
                { status: 400 }
            );
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const splitDocs = await splitter.createDocuments(
            [text],
            [
                {
                    source: file.name,
                    fileType: file.type || "unknown",
                },
            ]
        );

        const chunks = splitDocs.map((doc, index) => ({
            id: index + 1,
            content: doc.pageContent,
            metadata: doc.metadata,
        }));

        return Response.json({
            success: true,
            fileName: file.name,
            totalChunks: chunks.length,
            chunks,
        });
    } catch (error) {
        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while processing the file.",
            },
            { status: 500 }
        );
    }
}