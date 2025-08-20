import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Lachlan Chavasse",
    template: "%s | Lachlan Chavasse"
  },
  description: "Operator. Creator. Innovator. Building the future of AI and technology.",
  keywords: ["Lachlan Chavasse", "AI", "technology", "product management", "innovation"],
  authors: [{ name: "Lachlan Chavasse" }],
  creator: "Lachlan Chavasse",
  publisher: "Lachlan Chavasse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lachlan.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lachlan.xyz',
    title: 'Lachlan Chavasse',
    description: 'Operator. Creator. Innovator. Building the future of AI and technology.',
    siteName: 'Lachlan Chavasse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lachlan Chavasse',
    description: 'Operator. Creator. Innovator. Building the future of AI and technology.',
    creator: '@lachlanchavasse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
