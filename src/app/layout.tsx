import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/lib/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap", 
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sugar Plum",
  description: "Make every moment magical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ReduxProvider> 
        <Navbar />  
        <main className="min-h-screen">{children}</main>
        <Footer />
        </ReduxProvider> 
      </body>
    </html>
  );
}
