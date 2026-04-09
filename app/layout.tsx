import { Inter } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "LMCustoms — Custom Dev Tools",
  description:
    "LMCustoms is a software studio building thoughtful developer tools and self-hosted solutions.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
