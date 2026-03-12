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
  title: "La Loge — Rejoignez la liste d’attente",
  description:
    "La conciergerie beauté IA qui négocie les meilleures conditions auprès des marques pour votre salon.",
  openGraph: {
    title: "La Loge — Rejoignez la liste d’attente",
    description:
      "Accès sur invitation à la conciergerie beauté IA pensée pour les salons exigeants.",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Loge — Rejoignez la liste d’attente",
    description:
      "Accès sur invitation à la conciergerie beauté IA pensée pour les salons exigeants.",
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
