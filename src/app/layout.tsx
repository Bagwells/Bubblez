import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Mulish,
  Pacifico,
  Work_Sans,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import AppPreloader from "@/components/layout/AppPreloader";
import { ModalProvider } from "@/contexts/ModalContext";
import { Flip, ToastContainer } from "react-toastify";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-work",
  subsets: ["latin"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const fontVariables = [
  plusJakartaSans.variable,
  mulish.variable,
  pacifico.variable,
  workSans.variable,
  spaceGrotesk.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Bubblez Cleaning Services",
  description: "Bubblez Cleaning Services - Trusted local cleaning company in Johannesburg & Pretoria. Residential, commercial, post-construction, and specialty cleaning services.",
  keywords: "cleaning services near me, residential cleaning Johannesburg, commercial cleaning Pretoria, post-construction cleaning, cleaning services Johannesburg, cleaning services Pretoria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="font-jakarta antialiased">
        <ModalProvider>
          <AppPreloader>
            <ToastContainer position='top-right' closeOnClick 
              newestOnTop autoClose={2000} transition={Flip}
            />
            <NavBar />
            <main className="w-screen min-h-screen overflow-hidden">
              {children}
            </main>
            <Footer />
          </AppPreloader>
        </ModalProvider>
      </body>
    </html>
  );
}
