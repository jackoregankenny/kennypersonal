// app/layout.tsx
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import LastUpdatedFooter from '@/components/LastUpdated';
import '@/styles/globals.css';
import'../styles/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://jackoregankenny.com'), // Replace with your actual domain
  title: {
    default: "Jack O'Regan Kenny",
    template: "%s | Jack O'Regan Kenny",
  },
  description: "Jack O'Regan Kenny's personal site - Putting things on the internet",
  keywords: ['Jack O\'Regan Kenny', 'personal site', 'blog', 'tools', 'projects'],
  authors: [{ name: "Jack O'Regan Kenny" }],
  creator: "Jack O'Regan Kenny",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jackoregankenny.com/',
    siteName: "Jack O'Regan Kenny",
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@jackoregankenny', // Replace with your actual Twitter handle if different
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}