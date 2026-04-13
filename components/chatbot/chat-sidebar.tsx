import { ChatPreview } from "@/lib/types";

interface ChatSidebarProps {
    chats: ChatPreview[];
}

export default function ChatSidebar({ chats }: ChatSidebarProps) {
    return (
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#111111] lg:flex lg:flex-col">
            <div className="border-b border-white/10 p-4">
                <button className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">
                    + New chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Recent chats
                </p>

                <div className="space-y-2">
                    {chats.map((chat) => (
                        <button
                            key={chat.id}
                            className="w-full rounded-xl border border-transparent bg-white/5 px-3 py-3 text-left transition hover:border-white/10 hover:bg-white/10"
                        >
                            <p className="truncate text-sm font-medium text-white">
                                {chat.title}
                            </p>
                            <p className="mt-1 text-xs text-neutral-400">{chat.updatedAt}</p>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}