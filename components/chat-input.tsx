"use client";

import { FormEvent, useState } from "react";

interface ChatInputProps {
    onSendMessage: (value: string) => void;
    isLoading: boolean;
}

export default function ChatInput({
    onSendMessage,
    isLoading,
}: ChatInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmed = value.trim();
        if (!trimmed || isLoading) return;

        onSendMessage(trimmed);
        setValue("");
    };

    return (
        <div className="border-t border-white/10 bg-[#0b0b0b] px-4 py-4 md:px-6">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
            >
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={1}
                    placeholder="Type your message here..."
                    className="max-h-40 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "Thinking..." : "Send"}
                </button>
            </form>

            <p className="mx-auto mt-3 max-w-4xl text-xs text-neutral-500">
                Version 1 uses mock responses only. Real AI integration comes next.
            </p>
        </div>
    );
}