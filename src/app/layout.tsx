import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({ variable: '--font-serif', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | Begraafplaatskosten.nl',
    default: 'Begraafplaatskosten Vergelijken 2026 | Begraafplaatskosten.nl',
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
  metadataBase: new URL('https://begraafplaatskosten.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://begraafplaatskosten.nl',
    siteName: 'Begraafplaatskosten.nl',
    title: 'Begraafplaatskosten Vergelijken 2026 | Begraafplaatskosten.nl',
    description: 'Vergelijk grafkosten per gemeente. Onafhankelijk, transparant en gratis.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Begraafplaatskosten.nl — Vergelijk grafkosten in heel Nederland' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  alternates: {
    canonical: 'https://begraafplaatskosten.nl',
    languages: { 'nl-NL': 'https://begraafplaatskosten.nl' },
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
                  name: 'Begraafplaatskosten.nl',
                  url: 'https://begraafplaatskosten.nl',
                  description:
                    'Vergelijk grafkosten en grafrechten in heel Nederland per gemeente en begraafplaats.',
                },
                {
                  '@type': 'Organization',
                  name: 'Begraafplaatskosten.nl',
                  url: 'https://begraafplaatskosten.nl',
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
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-surface`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
