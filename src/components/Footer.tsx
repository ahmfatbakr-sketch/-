import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 pb-20 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-xl font-black text-white">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>{isAr ? BUSINESS_INFO.shortNameAr : BUSINESS_INFO.shortNameEn}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isAr
                ? 'شركة متخصصة في خدمات التنظيف والتعقيم بالبخار الحار 140°C بجدة. غسيل كنب، سجاد، مجالس، مراتب، وجلي رخام بأحدث الماكينات الإيطالية المعتمدة.'
                : 'Specialized 140°C high-pressure steam cleaning & deep sanitization company in Jeddah. Serving residential sofas, carpets, majlis, and villas.'}
            </p>

            {/* Regional trust markers */}
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div>{isAr ? '• المركز الإقليمي: محافظة جدة، منطقة مكة المكرمة' : '• Regional Hub: Jeddah, Makkah Province, KSA'}</div>
              <div>{isAr ? '• تغطية على مدار الساعة لكافة الأحياء' : '• 24/7 Coverage across all Jeddah districts'}</div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  {isAr ? 'الخدمات المتخصصة' : 'All Services'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  {isAr ? 'حاسبة الأسعار التقديرية' : 'Price Estimator'}
                </a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-cyan-400 transition-colors">
                  {isAr ? 'أحياء التغطية بجدة' : 'Coverage Districts'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-cyan-400 transition-colors">
                  {isAr ? 'آراء العملاء والتقييمات' : 'Customer Reviews'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-cyan-400 transition-colors">
                  {isAr ? 'موقعنا على الخريطة' : 'Map & Location'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isAr ? 'خدمات البخار' : 'Steam Cleaning'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>{isAr ? 'تنظيف الكنب والمجالس' : 'Sofa & Majlis Cleaning'}</li>
              <li>{isAr ? 'غسيل السجاد والموكيت' : 'Carpet & Rug Wash'}</li>
              <li>{isAr ? 'تعقيم المراتب والستائر' : 'Mattress Sanitizing'}</li>
              <li>{isAr ? 'تنظيف الفلل والشقق' : 'Villa Deep Cleaning'}</li>
              <li>{isAr ? 'جلي وتلميع الرخام' : 'Marble Polishing'}</li>
              <li>{isAr ? 'تنظيف وعزل الخزانات' : 'Water Tank Insulation'}</li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isAr ? 'التواصل المباشر' : 'Direct Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono tabular-nums">{BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{isAr ? 'محادثة واتساب فورية' : 'WhatsApp Hotline'}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{isAr ? BUSINESS_INFO.cityAr : BUSINESS_INFO.cityEn}</span>
              </div>

              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 underline"
                >
                  <span>{isAr ? 'عرض الموقع على Google Maps' : 'View on Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {isAr ? BUSINESS_INFO.nameAr : BUSINESS_INFO.nameEn}.{' '}
            {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <span>{isAr ? 'ساعات العمل: 24/7' : 'Hours: 24/7'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
