import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace Divine Voyage | Agence de Voyage",
  description: "Vous satisfaire est notre priorite. Vente de billets, reservation de vol, assistance visa, reservation d'hotel et plus encore.",
  keywords: ["voyage", "billet d'avion", "visa", "hotel", "Guinee", "Conakry", "grace divine voyage"],
  icons: {
    icon: [
    { url: "/favicon.svg", type: "image/svg+xml" },
  ],
  },
  openGraph: {
    title: "Grace Divine Voyage | Agence de Voyage",
    description: "Vous satisfaire est notre priorite. Vente de billets, reservation de vol, assistance visa, reservation d'hotel et plus encore.",
    siteName: "Grace Divine Voyage",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <NextAuthProvider>
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
