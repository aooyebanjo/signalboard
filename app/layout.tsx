import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "SignalBoard",
  description: "A data intelligence dashboard built with React, Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AppShell>
          {children} {/* The main content from page.tsx */}
        </AppShell>
      </body>
    </html>
  );
}
