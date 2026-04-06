export type Role = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: Role;
    content: string;
    createdAt: string;
}

export interface ChatPreview {
    id: string;
    title: string;
    updatedAt: string;
}