import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "La Loge — Liste d’attente",
  description:
    "Rejoignez La Loge — scoring intelligent, enrichissement automatique et mise en relation avec les grandes marques beauté.",
  openGraph: {
    title: "La Loge — Liste d’attente",
    description:
      "La conciergerie beauté qui négocie pour les meilleurs salons de France.",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Loge — Liste d’attente",
    description:
      "La conciergerie beauté qui négocie pour les meilleurs salons de France.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
