import type { Metadata } from "next";
import { GeistSans, GeistMono } from "@vercel/geist/font";
import "./globals.css";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SWIFT - User Comments Dashboard",
  description: "A comprehensive dashboard for managing user comments with advanced filtering, sorting, and pagination capabilities.",
  keywords: ["dashboard", "comments", "user management", "SWIFT"],
  authors: [{ name: "SWIFT Team" }],
  viewport: "width=device-width, initial-scale=1",
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
        {children}
      </body>
    </html>
  );
}
