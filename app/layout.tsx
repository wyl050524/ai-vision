import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 产品视觉识别｜王云龙",
  description: "从产品图片到技术、成分、功效与适用人群，一份可读、可核验的 AI 产品档案。",
  openGraph: {
    title: "AI 产品视觉识别",
    description: "看见包装，更读懂配方。",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "AI 产品视觉识别" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 产品视觉识别",
    description: "看见包装，更读懂配方。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
