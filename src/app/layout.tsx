import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="fr">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
