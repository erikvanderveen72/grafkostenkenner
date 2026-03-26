import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | Grafkostenkenner.nl',
    default: 'Grafkosten Vergelijken 2026 | Grafkostenkenner.nl',
  },
  description:
    'Vergelijk grafkosten en grafrechten in heel Nederland. Bekijk tarieven per gemeente, begraafplaats en looptijd. 100% onafhankelijk en gratis.',
  keywords: [
    'grafkosten',
    'grafrechten',
    'begraafplaats kosten',
    'begraafplaats vergelijken',
    'begrafenis kosten',
    'graf kopen',
    'grafrechten gemeente',
    'onderhoud graf',
    'eeuwige grafrust',
    'columbarium kosten',
    'urnengraf kosten',
    'begraafplaats Nederland',
  ],
  metadataBase: new URL('https://grafkostenkenner.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://grafkostenkenner.nl',
    siteName: 'Grafkostenkenner.nl',
    title: 'Grafkosten Vergelijken 2026 | Grafkostenkenner.nl',
    description: 'Vergelijk grafkosten per gemeente. Onafhankelijk, transparant en gratis.',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: 'https://grafkostenkenner.nl',
    languages: { 'nl-NL': 'https://grafkostenkenner.nl' },
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        {/* Geo meta */}
        <meta name="geo.country" content="NL" />
        <meta name="geo.placename" content="Netherlands" />
        <meta name="geo.position" content="52.3676;4.9041" />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Grafkostenkenner.nl',
                  url: 'https://grafkostenkenner.nl',
                  description:
                    'Vergelijk grafkosten en grafrechten in heel Nederland per gemeente en begraafplaats.',
                },
                {
                  '@type': 'Organization',
                  name: 'Grafkostenkenner.nl',
                  url: 'https://grafkostenkenner.nl',
                  description:
                    'Onafhankelijke vergelijkingssite voor grafkosten en grafrechten in Nederland.',
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Customer Service',
                    availableLanguage: 'Dutch',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-surface`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
