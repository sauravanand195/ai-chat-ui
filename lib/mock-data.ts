import { ChatMessage, ChatPreview } from "./types";

export const initialChats: ChatPreview[] = [
    {
        id: "1",
        title: "Getting started with AI",
        updatedAt: "Just now",
    },
    {
        id: "2",
        title: "React architecture ideas",
        updatedAt: "2h ago",
    },
    {
        id: "3",
        title: "Next.js deployment notes",
        updatedAt: "Yesterday",
    },
];

export const initialMessages: ChatMessage[] = [
    {
        id: "1",
        role: "assistant",
        content:
            "Hi! I’m your AI chat UI shell. For now I’m using mock responses, but the interface is ready for real chatbot integration later.",
        createdAt: "12:00 PM",
    },
];