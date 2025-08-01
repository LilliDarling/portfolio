import type { Metadata } from "next";
import { Goldman } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import DustCursor from "@/components/ui/DustCursor";
import ClientWrapper from "@/components/ui/ClientWrapper";

const gold = Goldman({
  weight: "400",
  style: "normal"
});


export const metadata: Metadata = {
  title: "Lillith Long",
  description: "Lillith Long software engineering portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gold} antialiased bg-background`}
      >
        <ClientWrapper>
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="pt-16 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <DustCursor />
        </ClientWrapper>
      </body>
    </html>
  );
}
