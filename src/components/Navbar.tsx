'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, MapPin, ChevronDown } from 'lucide-react';

const navItems = [
  {
    label: 'Provincies',
    items: [
      { label: 'Groningen', href: '/provincie/groningen', description: '13 begraafplaatsen in 9 gemeenten' },
      { label: 'Drenthe', href: '/provincie/drenthe', description: '10 gemeenten vergeleken' },
      { label: 'Meer provincies', href: '#', description: 'Binnenkort beschikbaar' },
    ],
  },
  { label: 'Grafrechten uitleg', href: '/grafrechten-uitleg' },
  { label: 'Begrippenlijst', href: '/begrippenlijst' },
  { label: 'Bespaartips', href: '/grafkosten-besparen' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <svg width="34" height="34" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill={isScrolled ? '#475569' : '#475569'} />
              <circle cx="18" cy="18" r="14" fill={isScrolled ? '#334155' : '#1e293b'} />
              <text x="18" y="24" textAnchor="middle" fontFamily="Inter" fontSize="16" fontWeight="700" fill="#fff">&#x271D;</text>
            </svg>
            <span className={`text-[22px] font-extrabold tracking-tight ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
              grafkosten<span className="text-slate-400">kenner</span><span className={isScrolled ? 'text-slate-500' : 'text-slate-400'}>.nl</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isScrolled
                        ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isScrolled
                          ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                          : 'text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-sm font-medium text-stone-900">{subItem.label}</div>
                            {subItem.description && (
                              <div className="text-xs text-stone-400 mt-0.5">{subItem.description}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Trust badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ml-4 ${
                isScrolled
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-emerald-500/20 text-emerald-300'
              }`}
            >
              <Shield size={12} />
              <span>Onafhankelijk & gratis</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-stone-700' : 'text-white'}`}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 rounded-b-2xl shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-2.5 text-sm font-medium text-stone-400">{item.label}</div>
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-stone-600 hover:bg-stone-50"
                      >
                        <MapPin size={14} />
                        {subItem.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
