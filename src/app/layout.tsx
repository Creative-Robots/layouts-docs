
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mintlify/mdx/dist/styles.css"
import Head from 'next/head';
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Layouts.dev",
  description: "A notebook for building interfaces with Tailwind &amp; Shadcn/UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Layouts.dev" />
        <meta name="og:logo" content="/android-chrome-512x512.png" />
      </Head>
      <Script id="custom-script" strategy="lazyOnload">
          {`
            (function() {
              // Get URL search params
              const searchParams = new URLSearchParams(window.location.search);
              const darkParam = searchParams.has('dark');
              
              // Get dark mode setting from localStorage
              const darkModeSetting = localStorage.getItem('darkMode');
              
              // Check if dark parameter exists in the URL or localStorage is set to true
              if (darkParam && searchParams.get('dark') === "false") {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
              } else if (darkParam || darkModeSetting === 'true') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
              } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
              }
            })();
          `}
        </Script>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}