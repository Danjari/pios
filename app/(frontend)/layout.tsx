import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { PostHogProvider } from "../providers/PHProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIOS",
  description: "Meilleure Plateforme d'Orientation Scolaire - Votre guide personnalisé pour réussir vos études",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <PostHogProvider>
          
          <main className="flex-grow">
            {children}
          </main>
         
         
        </PostHogProvider>
      </body>
    </html>
  );
}
