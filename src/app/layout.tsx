import type { Metadata } from "next";
import { Goldman } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer"

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
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="pt-16 flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
