import type { Metadata } from "next";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

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
        <AppProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}