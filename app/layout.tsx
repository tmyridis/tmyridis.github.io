import React from "react";
import { WavyBackground } from "./components/UI/wavy-background";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "tmyridis",
  description: "tmyridis portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WavyBackground
          backgroundFill="#0a0a0a"
          className="flex flex-col min-h-screen mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 font-[family-name:var(--font-geist-sans)] "
        >
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </WavyBackground>
      </body>
    </html>
  );
}
