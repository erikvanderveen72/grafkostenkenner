'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight } from 'lucide-react';

interface GemeenteItem {
  naam: string;
  slug: string;
  provincie: string;
}

export default function GemeenteZoeken({ gemeenten }: { gemeenten: GemeenteItem[] }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const resultaten = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return gemeenten
      .filter((g) => g.naam.toLowerCase().includes(q) || g.provincie.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, gemeenten]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const showDropdown = isFocused && query.length >= 2;

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type="text"
          placeholder="Zoek je gemeente..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-base"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-border overflow-hidden z-50">
          {resultaten.length > 0 ? (
            resultaten.map((g) => (
              <Link
                key={g.slug}
                href={`/gemeente/${g.slug}`}
                onClick={() => { setIsFocused(false); setQuery(''); }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-earth-light transition-colors group"
              >
                <MapPin size={16} className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-text-main">{g.naam}</span>
                  <span className="text-text-muted text-sm ml-2">{g.provincie}</span>
                </div>
                <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-text-muted text-sm">
              Geen gemeente gevonden voor &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
