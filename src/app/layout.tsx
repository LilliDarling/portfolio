import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { Goldman } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import DustCursor from "@/components/ui/DustCursor";
import ClientWrapper from "@/components/ui/ClientWrapper";
import StructuredData from "./structured-data";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Web3Wrapper from "@/components/providers/Web3Wrapper"

const gold = Goldman({
  weight: "400",
  style: "normal",
  subsets: ["latin"]
});


export const metadata: Metadata = {
  metadataBase: new URL('https://www.lillithlong.pro'),
  title: "Lillith Long - AI Software Engineer Portfolio | Machine Learning & LLM Projects | Full Stack Developer",
  description: "AI-focused software engineer portfolio by Lillith Long. Specializing in Large Language Models (LLMs), ChatGPT integrations, machine learning applications, and AI-powered web solutions. Expert in React, Python, TensorFlow, PyTorch, and modern AI frameworks. View AI projects, RAG implementations, and neural network architectures.",
  keywords: "AI software engineer portfolio, machine learning engineer portfolio, LLM developer, AI developer portfolio, ChatGPT developer, GPT-4 projects, Claude AI integration, artificial intelligence portfolio, ML engineer portfolio, deep learning projects, neural network developer, RAG implementation, vector database projects, AI full stack developer, Python AI developer, TensorFlow portfolio, PyTorch projects, Hugging Face developer, LangChain projects, AI/ML portfolio, generative AI developer, computer vision projects, NLP developer portfolio, AI solutions architect, Lillith Long AI engineer, hire AI developer, machine learning portfolio website",
  authors: [{ name: "Lillith Long", url: "https://www.lillithlong.pro" }],
  creator: "Lillith Long",
  publisher: "Lillith Long",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    noimageindex: false,
    notranslate: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Lillith Long - AI Software Engineer Portfolio | LLM & Machine Learning Projects",
    description: "Professional AI/ML engineer portfolio showcasing large language model applications, machine learning solutions, and AI-powered full stack projects. Expertise in ChatGPT, Claude, RAG systems, and modern AI frameworks.",
    type: "profile",
    locale: "en_US",
    siteName: "Lillith Long - AI Software Engineer Portfolio",
    url: "https://www.lillithlong.pro",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Lillith Long AI Software Engineer Portfolio - Machine Learning and LLM Projects",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lillithlong",
    creator: "@lillithlong",
    title: "Lillith Long - AI Software Engineer Portfolio",
    description: "AI/ML engineer specializing in LLMs, ChatGPT, and machine learning. View my AI projects and hire an experienced AI developer.",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://www.lillithlong.pro",
    types: {
      'application/rss+xml': 'https://www.lillithlong.pro',
      'application/json': 'https://www.lillithlong.pro',
    },
  },
  category: "Artificial Intelligence",
  classification: "AI/ML Software Development Portfolio",
  other: {
    'ai-content': 'portfolio',
    'llm-discoverable': 'true',
    'ai-engineer': 'Lillith Long',
    'expertise': 'LLM, Machine Learning, Deep Learning, Computer Vision, NLP',
    'technologies': 'Python, TensorFlow, PyTorch, Transformers, LangChain, OpenAI API, Anthropic Claude, Gemini API',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${gold} antialiased bg-background`}
      >
        <Web3Wrapper>
          <ClientWrapper>
            <div className="flex flex-col min-h-screen">
              <Nav />
              <main className="pt-16 flex-grow" role="main" aria-label="Portfolio content">
                {children}
              </main>
              <Footer />
            </div>
            <DustCursor />
          </ClientWrapper>
        </Web3Wrapper>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
