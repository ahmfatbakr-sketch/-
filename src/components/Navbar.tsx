import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Globe, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = lang === 'ar';

  const navLinks = [
    { href: '#services', labelAr: 'الخدمات', labelEn: 'Services' },
    { href: '#calculator', labelAr: 'حاسبة الأسعار', labelEn: 'Price Estimator' },
    { href: '#booking', labelAr: 'مكان الحجز', labelEn: 'Book Online' },
    { href: '#coverage', labelAr: 'تغطية جدة', labelEn: 'Jeddah Coverage' },
    { href: '#reviews', labelAr: 'آراء العملاء', labelEn: 'Reviews' },
    { href: '#location', labelAr: 'الموقع', labelEn: 'Location' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element wordmark, no subtitle or tag pills) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow-sm group-hover:bg-cyan-700 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>{isAr ? BUSINESS_INFO.shortNameAr : BUSINESS_INFO.shortNameEn}</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cyan-700 transition-colors whitespace-nowrap shrink-0 relative py-1 hover:underline underline-offset-8"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + Language switch */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-cyan-700 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer whitespace-nowrap shrink-0"
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Quick Call link for desktop */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-600" />
              <span className="tabular-nums font-mono">{BUSINESS_INFO.phone}</span>
            </a>

            {/* Primary Action Button - Smoothly scrolls to booking place or opens modal */}
            <a
              href="#booking"
              onClick={(e) => {
                const el = document.getElementById('booking');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onOpenBooking();
                }
              }}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:text-cyan-700 hover:bg-slate-50 transition-colors"
              >
                {isAr ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-slate-800 rounded-lg text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>{isAr ? 'اتصال مباشر:' : 'Direct Call:'} {BUSINESS_INFO.phone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 text-white rounded-lg text-sm font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'محادثة واتساب سريعة' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
