"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/lib/types";

interface ChatMessagesProps {
    messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
            <div className="space-y-6">
                {messages.map((message) => {
                    const isUser = message.role === "user";

                    return (
                        <div
                            key={message.id}
                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-3xl rounded-2xl px-4 py-3 shadow-sm ${isUser
                                        ? "bg-white text-black"
                                        : "border border-white/10 bg-white/5 text-white"
                                    }`}
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${isUser
                                                ? "bg-neutral-200 text-black"
                                                : "bg-emerald-500/20 text-emerald-300"
                                            }`}
                                    >
                                        {isUser ? "You" : "Assistant"}
                                    </span>

                                    <span className="text-xs text-neutral-400">
                                        {message.createdAt}
                                    </span>
                                </div>

                                <p className="whitespace-pre-wrap text-sm leading-7 md:text-[15px]">
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}