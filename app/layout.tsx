import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechBOB News",
  description: "TechBOB News Portal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="c07fa878-23ca-45a4-b26c-177c86628286"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div
    className="fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-10"
    style={{
      backgroundImage:
        "url('https://cms.techbob.de/wp-content/uploads/2025/10/background.webp')",
    }}
  />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
