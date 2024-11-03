import type { Metadata } from "next";
import { Inter, Roboto } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar"
import { SessionProvider } from 'next-auth/react';
import AuthProvider from "./api/auth/Provider";
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";
// import { Suspense } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
});

const poppins = localFont({
  src: '../public/fonts/poppins-regular-webfont.woff2',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  openGraph: {
    title: '...',
    description: '...'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalyticsScript />
      {/* <body className={`${roboto.className} ${roboto.className} antialiased`}> */}
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">
            {/* <Suspense fallback={<p>Loading...</p>}> */}
            {children}
            {/* </Suspense> */}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
