import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oluwatomiwa Awodokun — Product Design & Research",
  description:
    "Portfolio of Oluwatomiwa Awodokun. Product Designer and Researcher. Previously enterprise digital solutions for MTN, Airtel, and Alpha Morgan at Lotus Beta Analytics; Head of Marketing & Research at Klario Finance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#D97757]/20 selection:text-current">
        {children}
      </body>
    </html>
  );
}
