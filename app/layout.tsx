import type { Metadata } from "next";
import { DM_Sans, Forum } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const forum = Forum({
  weight: "400",
  variable: "--font-forum",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batra Utensils Store",
  description: "Batra Utensils Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${forum.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
