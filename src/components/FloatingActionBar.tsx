import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface FloatingActionBarProps {
  lang: Language;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <aside
      aria-label={isAr ? 'روابط الاتصال السريع' : 'Quick contact links'}
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 sm:hidden shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center gap-3">
        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 py-2.5 px-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'اتصل الآن' : 'Call Now'}</span>
          <span className="font-mono tabular-nums text-slate-300">({BUSINESS_INFO.phone})</span>
        </a>

        {/* Instant WhatsApp Button */}
        <a
          href={`https://wa.me/966540079672?text=${encodeURIComponent(
            isAr
              ? 'مرحباً المتحدة كلين، أود الاستفسار عن خدمات التنظيف بالبخار في جدة'
              : 'Hello United Clean, I would like to inquire about steam cleaning in Jeddah'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>
      </div>
    </aside>
  );
};
