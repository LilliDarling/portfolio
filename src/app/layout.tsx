import Metadata from "next";
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
  metadataBase: new URL('https://lillithlong.pro'),
  title: "Lillith Long | Software Engineer & AI Solutions Architect",
  description: "Software engineer specializing in AI, React, Python, and Flutter. Building innovative solutions with modern technologies. View my projects and get in touch.",
  keywords: "software developer, software engineer, React developer, Python developer, AI engineer, flutter developer, TypeScript, Next.js, portfolio",
  authors: [{ name: "Lillith Long" }],
  creator: "Lillith Long",
  publisher: "Lillith Long",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Lillith Long | Software Engineer & AI Solutions Architect",
    description: "Software engineer specializing in AI, React, Python, and Flutter. Building innovative solutions with modern technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Lillith Long Portfolio",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Lillith Long Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lillith Long | Software Engineer",
    description: "Software engineer specializing in AI, React, Python, and Flutter. View my projects and get in touch.",
    images: ["/hero.png"],
  },
  alternates: {
    canonical: "https://lillithlong.pro",
  }
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
