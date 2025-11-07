import type { Metadata } from "next";

import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import "./css/style.css";

import Navbar from "@/components/ui/Navbar/components/Navbar";
import Footer from "@/components/ui/Footer";
import ArticleProgress from "@/components/ui/ArticleProgress";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Balla Light",
  description: "Balla Light Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        /> */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <Navbar />
        <ArticleProgress />
        <div className="min-h-screen max-w-7xl mx-auto">
          <main className='md:py-2 px-4 md:px-0 mt-2 '>
            {children}
          </main>
        </div>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}