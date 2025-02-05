import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";

export const metadata: Metadata = {
  title: "Sourelle",
  description: "Sourelle Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=''>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
