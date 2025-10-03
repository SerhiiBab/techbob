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
  title: "TechBOB – News & Trends zu IT, KI, Wissenschaft und Cybersecurity",
  description:
    "TechBOB bietet aktuelle Nachrichten, Analysen und Trends aus den Bereichen IT, Künstliche Intelligenz, Wissenschaft und Cybersecurity.",
  alternates: {
    canonical: "https://techbob.de/",
  },
    openGraph: {
    title: "TechBOB – News & Trends zu IT, KI, Wissenschaft und Cybersecurity",
    description:
      "TechBOB bietet aktuelle Nachrichten, Analysen und Trends aus den Bereichen IT, Künstliche Intelligenz, Wissenschaft und Cybersecurity.",
    url: "https://techbob.de/",
    siteName: "TechBOB",
    images: [
      {
        url: "https://cms.techbob.de/wp-content/uploads/2025/10/background.webp",
        width: 1200,
        height: 630,
        alt: "TechBOB Hintergrundbild",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBOB – News & Trends zu IT, KI, Wissenschaft und Cybersecurity",
    description:
      "TechBOB bietet aktuelle Nachrichten, Analysen und Trends aus den Bereichen IT, Künstliche Intelligenz, Wissenschaft und Cybersecurity.",
    images: [
      "https://cms.techbob.de/wp-content/uploads/2025/10/background.webp",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="c07fa878-23ca-45a4-b26c-177c86628286"
          strategy="afterInteractive"
        />

        {/* JSON-LD für Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TechBOB",
              "url": "https://techbob.de/",
              "publisher": {
                "@type": "Organization",
                "name": "TechBOB",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://cms.techbob.de/wp-content/uploads/2025/10/logo.webp",
                },
              },
            }),
          }}
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
