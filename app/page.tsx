"use client";

import { useMemo, useState } from "react";
import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import ChatSidebar from "@/components/chat-sidebar";
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

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  const handleSendMessage = async (value: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: value,
      createdAt: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to fetch response");
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
        {hasMessages ? (
          <ChatMessages messages={messages} />
        ) : null}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </section>
    </main>
  );
}