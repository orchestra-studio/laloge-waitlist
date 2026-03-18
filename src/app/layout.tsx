import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "La Loge — Conciergerie Beauté IA",
  description:
    "Rejoignez La Loge, la conciergerie beauté IA qui négocie les meilleures conditions auprès des marques pour votre salon.",
  openGraph: {
    title: "Rejoignez La Loge",
    description:
      "La conciergerie beauté IA qui négocie les meilleures conditions auprès des marques pour votre salon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-theme="light" style={{ colorScheme: "light" }}>
      <body className={`${instrumentSerif.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
