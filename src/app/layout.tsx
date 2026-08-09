import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://haidarfiaz.dev"),
  title: {
    default: "Haidar Fiaz — Full-Stack React Developer",
    template: "%s · Haidar Fiaz",
  },
  description:
    "Full-Stack React Developer building fast, scalable web and mobile products with Next.js, TypeScript, React Native, GraphQL and AI-powered search.",
  keywords: [
    "Haidar Fiaz",
    "React Developer",
    "Next.js",
    "React Native",
    "TypeScript",
    "GraphQL",
    "Lahore",
    "Full-Stack Developer",
  ],
  authors: [{ name: "Haidar Fiaz" }],
  openGraph: {
    title: "Haidar Fiaz — Full-Stack React Developer",
    description:
      "Building fast, scalable web and mobile products for teams across Pakistan and the US.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haidar Fiaz — Full-Stack React Developer",
    description:
      "Building fast, scalable web and mobile products for teams across Pakistan and the US.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
