import type { Metadata } from "next";
import { SmoothScroll } from "@/components/animations";
import "./globals.css";

export const metadata: Metadata = {
  title: "YuLife — Employee Benefits That People Love",
  description:
    "YuLife transforms employee benefits with a fresh approach that rewards healthy living.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for better performance */}
        <link
          rel="preload"
          href="/YuniversalDraft/fonts/lota/3B06D5_A_0.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/YuniversalDraft/fonts/berlingske/BerlingskeSerif-Bd.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
