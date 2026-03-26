import Link from 'next/link';
import { Lock, Shield, RefreshCw } from 'lucide-react';

const columns = [
  {
    title: 'Provincies',
    links: [
      { label: 'Groningen', href: '/provincie/groningen' },
      { label: 'Friesland', href: '#' },
      { label: 'Drenthe', href: '#' },
      { label: 'Overijssel', href: '#' },
    ],
  },
  {
    title: 'Informatie',
    links: [
      { label: 'Soorten begraafplaatsen', href: '/soorten-begraafplaatsen' },
      { label: 'Grafrechten uitleg', href: '/grafrechten-uitleg' },
    ],
  },
  {
    title: 'Vergelijk',
    links: [
      { label: 'Grafkosten Groningen', href: '/provincie/groningen' },
    ],
  },
  {
    title: 'Over Grafkostenkenner',
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
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="34" height="34" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill="#475569" />
              <circle cx="18" cy="18" r="14" fill="#1e293b" />
              <text x="18" y="24" textAnchor="middle" fontFamily="Inter" fontSize="16" fontWeight="700" fill="#fff">&#x271D;</text>
            </svg>
            <span className="text-[22px] font-extrabold tracking-tight text-white">
              grafkosten<span className="text-slate-400">kenner</span><span className="text-slate-500">.nl</span>
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
              className="flex items-center gap-2 bg-stone-800 rounded-full px-3 py-1"
            >
              <badge.icon size={12} className="text-stone-400" />
              <span className="text-xs text-stone-400">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Grafkostenkenner.nl — Alle rechten voorbehouden
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
