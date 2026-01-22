import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Solutions | Precision Estimator",
  description: "Industrial repair cost estimation platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200`}>
        <Navbar />
        {/* We add padding-top so the navbar doesn't cover the content */}
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}