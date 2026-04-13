import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Project Hub | Next.js AI Learning Lab",
  description:
    "Explore and build AI-powered Next.js projects step by step, including chatbot UI, structured output, RAG, and tool-calling workflows.",
  icons: {
    icon: {
      url: "/ai.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
