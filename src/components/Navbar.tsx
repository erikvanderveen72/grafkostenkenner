'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield, MapPin, ChevronDown } from 'lucide-react';

const navItems = [
  {
    label: 'Provincies',
    items: [
      { label: 'Groningen', href: '/provincie/groningen' },
      { label: 'Friesland', href: '/provincie/friesland' },
      { label: 'Drenthe', href: '/provincie/drenthe' },
      { label: 'Overijssel', href: '/provincie/overijssel' },
      { label: 'Flevoland', href: '/provincie/flevoland' },
      { label: 'Gelderland', href: '/provincie/gelderland' },
      { label: 'Utrecht', href: '/provincie/utrecht' },
      { label: 'Noord-Holland', href: '/provincie/noord-holland' },
      { label: 'Zuid-Holland', href: '/provincie/zuid-holland' },
      { label: 'Zeeland', href: '/provincie/zeeland' },
      { label: 'Noord-Brabant', href: '/provincie/noord-brabant' },
      { label: 'Limburg', href: '/provincie/limburg' },
    ],
  },
  { label: 'Uitvaartkosten', href: '/uitvaartkosten' },
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
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — no icon */}
          <Link href="/" className="flex flex-col shrink-0">
            <span className={`text-[22px] font-extrabold tracking-tight leading-tight ${isScrolled ? 'text-earth-dark' : 'text-white drop-shadow-md'}`}>
              begraafplaats<span className={isScrolled ? 'text-primary' : 'text-white/80'}>kosten</span><span className={isScrolled ? 'text-text-muted' : 'text-white/60'}>.nl</span>
            </span>
            <span className={`text-[11px] tracking-[0.2em] uppercase font-medium ${isScrolled ? 'text-text-muted' : 'text-white/60 drop-shadow-sm'}`}>
              geeft rust
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
                        ? 'text-text-muted hover:text-text-main hover:bg-earth-light'
                        : 'text-white/80 hover:text-white hover:bg-white/10 drop-shadow-sm'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isScrolled
                          ? 'text-text-muted hover:text-text-main hover:bg-earth-light'
                          : 'text-white/80 hover:text-white hover:bg-white/10 drop-shadow-sm'
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="p-2 grid grid-cols-2 gap-0.5">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-lg hover:bg-earth-light transition-colors"
                          >
                            <div className="text-sm font-medium text-text-main">{subItem.label}</div>
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
                  ? 'bg-primary-light text-primary'
                  : 'bg-white/15 text-white/90 backdrop-blur-sm border border-white/20'
              }`}
            >
              <Shield size={12} />
              <span>Onafhankelijk & gratis</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-text-main' : 'text-white'}`}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-border rounded-b-2xl shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-text-main hover:bg-earth-light"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-3 py-2.5 text-sm font-medium text-text-muted">{item.label}</div>
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm text-text-muted hover:bg-earth-light"
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
