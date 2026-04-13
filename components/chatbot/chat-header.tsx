export default function ChatHeader() {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-white/10 bg-black/70 px-4 backdrop-blur md:px-6">
            <div>
                <h1 className="text-base font-semibold text-white md:text-lg">
                    AI Chat UI
                </h1>
                <p className="text-xs text-neutral-400 md:text-sm">
                    Next.js starter shell for your first chatbot project
                </p>
            </div>

            <button className="rounded-xl border border-white/10 px-3 py-2 text-sm text-neutral-200 transition hover:bg-white/10">
                Upgrade later
            </button>
        </header>
    );
}