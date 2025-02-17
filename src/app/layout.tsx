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
    <html lang="pt" className="h-full">
      <body className="flex flex-col h-full">
        <NavBar />
        {/* <main className="flex-grow overflow-x-hidden">{children}</main> */}
        <h2>Hello World!</h2>
        <div className="font-bold text-gray-900 text-2xl">hello world!</div>
        <Footer />
      </body>
    </html>
  );
}
