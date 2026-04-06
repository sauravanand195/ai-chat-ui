"use client";

import { useMemo, useState } from "react";
import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import ChatSidebar from "@/components/chat-sidebar";
import EmptyState from "@/components/empty-state";
import { initialChats, initialMessages } from "@/lib/mock-data";
import { ChatMessage } from "@/lib/types";

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const mockReplies = [
  "That sounds good. Once you’re ready, the next step is connecting this UI to a real model API through a Next.js route handler.",
  "Nice — your UI layer is the right place to begin. After deployment, we can replace this mocked reply with an actual chatbot response.",
  "You now have the shell of a chatbot app. Later we can add streaming, message persistence, and model switching.",
];

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  const handleSendMessage = (value: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: value,
      createdAt: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: mockReplies[Math.floor(Math.random() * mockReplies.length)],
        createdAt: getCurrentTime(),
      };

      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 900);
  };

  return (
    <main className="flex h-screen bg-black text-white">
      <ChatSidebar chats={initialChats} />

      <section className="flex min-w-0 flex-1 flex-col">
        <ChatHeader />

        {hasMessages ? (
          <ChatMessages messages={messages} />
        ) : (
          <EmptyState />
        )}

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </section>
    </main>
  );
}