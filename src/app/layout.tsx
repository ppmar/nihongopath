import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NihongoPath — Apprends le japonais",
  description:
    "Apprends le japonais de zéro avec NihongoPath. Hiragana, katakana, kanji, vocabulaire et grammaire — du JLPT N5 au N1.",
  keywords: ["japonais", "JLPT", "hiragana", "katakana", "kanji", "apprentissage"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "backdrop-blur-xl bg-card/90 border border-border text-foreground",
          }}
        />
      </body>
    </html>
  );
}
