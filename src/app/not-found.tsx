import Link from 'next/link';
import { Metadata } from 'next';
import { Home, Search, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pagina Niet Gevonden',
  description: 'De pagina die u zoekt bestaat niet of is verplaatst.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <div className="bg-primary-light w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Search size={40} className="text-primary" />
        </div>

        <h1 className="text-4xl font-extrabold text-text-main mb-4">Pagina niet gevonden</h1>
        <p className="text-text-muted text-lg mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de homepage of bekijk onze populaire pagina&apos;s.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            <Home size={20} />
            Naar homepage
          </Link>
          <Link
            href="/provincie/groningen"
            className="flex items-center justify-center gap-2 bg-white border border-border text-text-main px-6 py-3 rounded-xl font-semibold hover:border-primary transition-colors"
          >
            <MapPin size={20} />
            Grafkosten Groningen
          </Link>
        </div>
      </div>
    </div>
  );
}
