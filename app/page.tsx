import Link from "next/link";

const projects = [
  {
    title: "AI Chatbot",
    description:
      "Start with the core loop of AI apps: prompts, chat history, API calls, and rendering responses in real time.",
    href: "/projects/chatbot",
    status: "Ready",
    tag: "Foundation",
  },
  {
    title: "Structured Output",
    description:
      "Learn how to generate clean JSON responses for forms, workflows, dashboards, and automation use cases.",
    href: "/projects/structured-output",
    status: "Next",
    tag: "Practical",
  },
  {
    title: "RAG Search",
    description:
      "Understand embeddings, retrieval, chunking, and how external knowledge is injected into prompts.",
    href: "/projects/rag",
    status: "Planned",
    tag: "Advanced",
  },
  {
    title: "Tool Calling",
    description:
      "Build agents that can call APIs, trigger actions, and combine reasoning with real app capabilities.",
    href: "/projects/tool-calling",
    status: "Planned",
    tag: "Agentic",
  },
];

const steps = [
  {
    step: "01",
    title: "Start with chat",
    text: "Learn prompts, roles, message arrays, and the request-response loop.",
  },
  {
    step: "02",
    title: "Shape the output",
    text: "Make AI respond in predictable JSON you can trust inside UI flows.",
  },
  {
    step: "03",
    title: "Add knowledge",
    text: "Use retrieval and embeddings so the app answers from your own data.",
  },
  {
    step: "04",
    title: "Use tools",
    text: "Let the model trigger actions, APIs, and workflows like a real assistant.",
  },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "OpenAI API",
  "Route Handlers",
  "Streaming UI",
  "Embeddings",
  "Vector DB",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.14),transparent_22%),linear-gradient(to_bottom,#050816,#070b1a,#050816)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]" />

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-8 md:pb-28 md:pt-10">
          <header className="mb-16 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                AI Project Hub
              </p>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              <a href="#projects" className="transition hover:text-white">
                Projects
              </a>
              <a href="#roadmap" className="transition hover:text-white">
                Roadmap
              </a>
              <a href="#stack" className="transition hover:text-white">
                Stack
              </a>
            </nav>
          </header>

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Building real AI apps with Next.js
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
                Learn AI by building one focused project at a time.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
                This hub is your personal lab for understanding how modern AI
                products work — from chatbot fundamentals to structured output,
                RAG pipelines, and tool-calling workflows.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects/chatbot"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-200"
                >
                  Start with chatbot
                </Link>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Explore project hub
                </a>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">4+</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    AI projects planned
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">Stepwise</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    From beginner to advanced
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">Next.js</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Built around your stack
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm text-zinc-400">Current focus</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      AI Chatbot Project
                    </h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      User
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-200">
                      How do I integrate AI into my Next.js applications step by
                      step?
                    </p>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                      Assistant
                    </p>
                    <p className="mt-2 text-sm leading-7 text-cyan-50">
                      Start with a chatbot. It teaches prompts, history, API
                      routes, loading states, and response rendering — the core
                      loop behind most AI products.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">
                      What you learn
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      Prompts, request payloads, state, API flow, and model
                      responses.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">
                      Why it matters
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      It becomes the foundation for RAG, tools, and agent-based
                      apps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="projects"
        className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24"
      >
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            A hands-on roadmap for learning AI app development
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            Each project adds one major AI concept so you build understanding in
            the right order instead of trying to learn everything at once.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.05]"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                    {project.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                  {project.status}
                </span>
              </div>

              <p className="relative mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                {project.description}
              </p>

              <div className="relative mt-8 flex items-center gap-2 text-sm font-medium text-cyan-300">
                Open project
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="roadmap"
        className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
              Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              How your AI learning path should progress
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
              The idea is simple: learn one capability at a time, and turn each
              concept into a working product surface.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-200">
                  {item.step}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
                Stack
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Built around the tools you already use
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                This hub is designed for a frontend-heavy workflow, so you can
                learn AI in a way that connects naturally with your existing
                Next.js and TypeScript skills.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-violet-500/10 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">
                Start now
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Begin with the chatbot and expand from there
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-200/90">
                The chatbot is the clearest first project because it teaches the
                request-response cycle that sits underneath most AI product
                experiences.
              </p>
            </div>

            <Link
              href="/projects/chatbot"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Open first project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}