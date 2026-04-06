export default function EmptyState() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                ✨
            </div>
            <h2 className="text-2xl font-semibold text-white">Start your first conversation</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 md:text-base">
                This is your deployed chatbot UI shell. Right now it uses mock data and
                fake replies. In the next step, you’ll connect it to a real AI model
                through an API route.
            </p>
        </div>
    );
}