"use client";

import { FormEvent, useState } from "react";
import { ProjectPlan } from "@/lib/schemas/project-plan";

export default function StructuredOutputPage() {
    const [goal, setGoal] = useState("");
    const [plan, setPlan] = useState<ProjectPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!goal.trim()) return;

        setIsLoading(true);
        setError("");
        setPlan(null);

        try {
            const response = await fetch("/api/structured-output", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ goal }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Failed to generate project plan.");
            }

            setPlan(data.plan);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-dvh overflow-x-hidden bg-[#050816] px-6 py-10 text-white md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                        Structured Output
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        Turn AI into clean, usable product data
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                        Enter a project idea and get back a structured plan with title,
                        difficulty, tools, steps, and risks. This is the step where AI
                        becomes something your UI can reliably render.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                        <h2 className="text-xl font-semibold text-white">
                            Generate a project plan
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-zinc-400">
                            Example: Build a Next.js AI resume analyzer with upload, scoring,
                            and improvement suggestions.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label
                                    htmlFor="goal"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Your project goal
                                </label>
                                <textarea
                                    id="goal"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    rows={7}
                                    placeholder="Describe the AI app you want to build..."
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a1020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/40"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? "Generating..." : "Generate structured plan"}
                            </button>
                        </form>

                        {error ? (
                            <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200">
                                {error}
                            </div>
                        ) : null}
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                        {!plan ? (
                            <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0a1020] p-8 text-center">
                                <div>
                                    <p className="text-lg font-medium text-white">
                                        No plan generated yet
                                    </p>
                                    <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
                                        Submit a goal on the left and the AI will return a typed
                                        plan object your UI can render safely.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-2xl font-semibold text-white">
                                            {plan.title}
                                        </h2>
                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-200">
                                            {plan.difficulty}
                                        </span>
                                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-200">
                                            {plan.estimatedTime}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm leading-7 text-cyan-50/90">
                                        {plan.summary}
                                    </p>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="rounded-2xl border border-white/10 bg-[#0a1020] p-5">
                                        <h3 className="text-lg font-semibold text-white">Tools</h3>
                                        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                                            {plan.tools.map((tool, index) => (
                                                <li key={index} className="rounded-xl bg-white/[0.03] px-3 py-2">
                                                    {tool}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-[#0a1020] p-5">
                                        <h3 className="text-lg font-semibold text-white">Risks</h3>
                                        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                                            {plan.risks.map((risk, index) => (
                                                <li key={index} className="rounded-xl bg-white/[0.03] px-3 py-2">
                                                    {risk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-[#0a1020] p-5">
                                    <h3 className="text-lg font-semibold text-white">Steps</h3>
                                    <div className="mt-4 space-y-3">
                                        {plan.steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 rounded-2xl bg-white/[0.03] p-4"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-200">
                                                    {index + 1}
                                                </div>
                                                <p className="text-sm leading-7 text-zinc-300">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}