'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSchema({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-bold mb-8 text-text-main">Veelgestelde vragen</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors ${
              openIndex === i ? 'border-primary' : 'border-border hover:border-primary'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-text-main hover:bg-surface-alt transition-colors"
            >
              {item.question}
              <ChevronDown
                className={`w-5 h-5 text-text-muted transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-text-muted leading-relaxed">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
