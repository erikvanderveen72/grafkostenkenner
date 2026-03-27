import Link from 'next/link';
import { Lock, Shield, RefreshCw } from 'lucide-react';

const columns = [
  {
    title: 'Provincies',
    links: [
      { label: 'Groningen', href: '/provincie/groningen' },
      { label: 'Friesland', href: '/provincie/friesland' },
      { label: 'Drenthe', href: '/provincie/drenthe' },
      { label: 'Overijssel', href: '/provincie/overijssel' },
      { label: 'Gelderland', href: '/provincie/gelderland' },
      { label: 'Noord-Holland', href: '/provincie/noord-holland' },
      { label: 'Zuid-Holland', href: '/provincie/zuid-holland' },
      { label: 'Noord-Brabant', href: '/provincie/noord-brabant' },
      { label: 'Limburg', href: '/provincie/limburg' },
      { label: 'Alle provincies', href: '/#provincies' },
    ],
  },
  {
    title: 'Informatie',
    links: [
      { label: 'Wat kost een uitvaart?', href: '/uitvaartkosten' },
      { label: 'Soorten begraafplaatsen', href: '/soorten-begraafplaatsen' },
      { label: 'Grafrechten uitleg', href: '/grafrechten-uitleg' },
      { label: 'Begrippenlijst', href: '/begrippenlijst' },
      { label: 'Grafkosten besparen', href: '/grafkosten-besparen' },
    ],
  },
  {
    title: 'Over Begraafplaatskosten',
    links: [
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
];

const trustBadges = [
  { icon: Lock, label: 'SSL beveiligd' },
  { icon: Shield, label: 'Onafhankelijk' },
  { icon: RefreshCw, label: 'Regelmatig bijgewerkt' },
];

export default function Footer() {
  return (
    <footer className="bg-earth-dark text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo — no icon */}
        <div className="mb-8">
          <Link href="/" className="flex items-center">
            <span className="text-[22px] font-extrabold tracking-tight text-white">
              begraafplaats<span className="text-green-300">kosten</span><span className="text-stone-500">.nl</span>
            </span>
          </Link>
          <p className="text-stone-500 text-sm mt-3 max-w-md">
            Vergelijk grafkosten en grafrechten in heel Nederland. Onafhankelijk, transparant en gratis.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-sm mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 bg-earth-mid rounded-full px-3 py-1"
            >
              <badge.icon size={12} className="text-stone-400" />
              <span className="text-xs text-stone-400">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-earth-mid pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Begraafplaatskosten.nl — Alle rechten voorbehouden
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-stone-500 hover:text-stone-300">Privacy</Link>
            <Link href="/disclaimer" className="text-xs text-stone-500 hover:text-stone-300">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
