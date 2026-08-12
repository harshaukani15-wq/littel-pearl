import type { Metadata } from "next";
import { Outfit, Cinzel } from "next/font/google";
import "./globals.css";
import { STORE_NAME, STORE_DESCRIPTION } from "@/lib/constants";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${STORE_NAME}`,
    default: `${STORE_NAME} - Premium Indian Baby Wear & Jewellery`,
  },
  description: STORE_DESCRIPTION,
  keywords: ["baby clothes", "pearl jewellery", "indian premium brand", "kids wear"],
  authors: [{ name: STORE_NAME }],
  creator: STORE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://littlepearl.in",
    siteName: STORE_NAME,
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: STORE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: STORE_NAME,
    description: STORE_DESCRIPTION,
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${cinzel.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
