"use client";

import { useState } from "react";

type Chunk = {
    id: number;
    content: string;
    metadata?: {
        source?: string;
        fileType?: string;
    };
};

export default function RagPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [chunks, setChunks] = useState<Chunk[]>([]);
    const [totalChunks, setTotalChunks] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        setFileName(file?.name || "");
        setChunks([]);
        setTotalChunks(0);
        setError("");
        setSuccess("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please choose a file first.");
            return;
        }

        try {
            setIsUploading(true);
            setError("");
            setSuccess("");
            setChunks([]);
            setTotalChunks(0);

            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("/api/rag/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data?.error || "Upload failed.");
                return;
            }

            setSuccess(`File processed successfully: ${data.fileName}`);
            setChunks(data.chunks || []);
            setTotalChunks(data.totalChunks || 0);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong during upload."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#050816] text-white">
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                        RAG Search
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        Build a knowledge-based AI assistant.
                    </h1>
                    <p className="mt-6 text-base leading-8 text-zinc-300 md:text-lg">
                        Upload a file, split it into chunks, and prepare it for retrieval.
                        This is the first real step in a RAG pipeline.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                        <h2 className="text-xl font-semibold text-white">Upload document</h2>
                        <p className="mt-2 text-sm leading-7 text-zinc-400">
                            Supported formats for now: TXT, MD
                        </p>
                        <p className="mt-2 text-sm leading-7 text-zinc-400">
                            PDF support will be added next
                        </p>

                        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6">
                            <input
                                type="file"
                                accept=".pdf,.txt,.md"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-cyan-200"
                            />

                            {fileName ? (
                                <p className="mt-4 text-sm text-zinc-300">
                                    Selected file: <span className="font-medium text-white">{fileName}</span>
                                </p>
                            ) : (
                                <p className="mt-4 text-sm text-zinc-500">
                                    No file selected yet.
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isUploading ? "Processing..." : "Upload and chunk"}
                            </button>
                        </div>

                        {error ? (
                            <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                                {error}
                            </div>
                        ) : null}

                        {success ? (
                            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                                {success}
                            </div>
                        ) : null}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                        <h2 className="text-xl font-semibold text-white">Pipeline preview</h2>
                        <p className="mt-2 text-sm leading-7 text-zinc-400">
                            Right now we are handling ingestion. Retrieval and answer generation come next.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-sm text-zinc-300">
                                1. Upload file
                            </div>
                            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
                                2. Extract text
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-sm text-zinc-300">
                                3. Split into chunks
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-sm text-zinc-300">
                                4. Create embeddings
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-sm text-zinc-300">
                                5. Retrieve relevant chunks
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4 text-sm text-zinc-300">
                                6. Generate grounded answer
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-semibold text-white">Chunk results</h3>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                            {totalChunks} chunks
                        </span>
                    </div>

                    <p className="mt-2 text-sm leading-7 text-zinc-400">
                        After upload, the generated chunks will appear here.
                    </p>

                    <div className="mt-6 space-y-4">
                        {chunks.length === 0 ? (
                            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 text-sm text-zinc-500">
                                No chunks yet. Upload a file to see processed text segments.
                            </div>
                        ) : (
                            chunks.slice(0, 6).map((chunk) => (
                                <div
                                    key={chunk.id}
                                    className="rounded-2xl border border-white/10 bg-[#0b1020] p-5"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-cyan-300">
                                            Chunk {chunk.id}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            {chunk.metadata?.source || "Unknown source"}
                                        </p>
                                    </div>

                                    <p className="mt-3 text-sm leading-7 text-zinc-300">
                                        {chunk.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}