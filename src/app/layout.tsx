import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "cyrillic"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "latin-ext", "cyrillic"] });

export const metadata: Metadata = {
  title: "TEJAMKOR SAVAT — Isrofni kamaytir, pulingni tejab qol!",
  description: "Toshkent uchun oziq-ovqat isrofini kamaytiruvchi demo marketplace MVP: restoranlarning kun oxiridagi mahsulotlari chegirma bilan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <StoreProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
