import type { Metadata } from "next";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import "./globals.css";

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
