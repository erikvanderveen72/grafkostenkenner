import { type LucideIcon } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  highlightedSubtitle?: string;
  badge?: string;
  icon?: LucideIcon;
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({
  title,
  subtitle,
  highlightedSubtitle,
  badge,
  showBreadcrumbs = false,
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-stone-900">
      {/* Animated blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-stone-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 plus-pattern opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="text-stone-300 text-sm font-medium">{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          {title}
        </h1>

        {highlightedSubtitle && (
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mb-4">
            {highlightedSubtitle}
          </p>
        )}

        {subtitle && (
          <p className="text-stone-400 text-lg sm:text-xl max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
