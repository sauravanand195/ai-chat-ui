"use client";

import { useState } from "react";
import ChatHeader from "@/components/chatbot/chat-header";
import ChatInput from "@/components/chatbot/chat-input";
import ChatMessages from "@/components/chatbot/chat-messages";
import ChatSidebar from "@/components/chatbot/chat-sidebar";
import { initialChats, initialMessages } from "@/lib/mock-data";
import { ChatMessage } from "@/lib/types";

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function Home() {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (value: string) => {
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: value,
            createdAt: getCurrentTime(),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            // const apiMessages = [
            //   {
            //     role: "system" as const,
            //     content:
            //       "You are a helpful AI assistant inside a Next.js learning project. Keep answers clear, short, and beginner friendly.",
            //   },
            //   ...updatedMessages.map(({ role, content }) => ({
            //     role,
            //     content,
            //   })),
            // ];

            const trimmedMessages = updatedMessages.slice(-6);

            const apiMessages = [
                {
                    role: "system" as const,
                    content:
                        "You are a helpful AI assistant inside a Next.js learning project. Keep answers clear, short, and beginner friendly.",
                },
                ...trimmedMessages.map(({ role, content }) => ({
                    role,
                    content,
                })),
            ];

            console.log('apiMessages -> ', apiMessages);

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: apiMessages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to fetch chatbot response.");
            }

            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: data.reply,
                createdAt: getCurrentTime(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                    error instanceof Error
                        ? `Error: ${error.message}`
                        : "Something went wrong.",
                createdAt: getCurrentTime(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex h-screen bg-black text-white">
            <ChatSidebar chats={initialChats} />

            <section className="flex min-w-0 flex-1 flex-col">
                <ChatHeader />
                <ChatMessages messages={messages} />
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </section>
        </main>
    );
}