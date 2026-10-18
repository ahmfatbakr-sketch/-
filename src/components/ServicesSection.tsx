import React from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/content';
import { Language, ServiceItem } from '../types';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const isAr = lang === 'ar';

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'خدماتنا المتخصصة بالبخار في جدة' : 'Specialized Steam Cleaning Services in Jeddah'}</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {isAr
              ? 'حلول تنظيف وتعقيم متطورة لكافة المفروشات والمساحات'
              : 'Advanced Steam Cleaning & Deep Sanitation Solutions'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            {isAr
              ? 'نستخدم أحدث أجهزة البخار التوربينية الإيطالية المعتمدة عالمياً لضمان أعلى درجات النقاء، التطهير، وحماية الأنسجة الثمينة في منازل وفلل جدة.'
              : 'We deploy certified high-pressure Italian steam extractors to ensure the deepest hygiene, microscopic pathogen elimination, and fabric preservation.'}
          </p>
        </div>

        {/* Bento Grid layout with asymmetric hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const isMarquee = service.popular;

            return (
              <div
                key={service.id}
                className={`flex flex-col bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 group ${
                  isMarquee && index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Visual Header */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-200">
                  <img
                    src={service.image}
                    alt={isAr ? service.titleAr : service.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Editorial Index - Clean Human Numbering */}
                  <div className="absolute top-4 start-4 bg-slate-900/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-mono font-bold">
                    {formattedIndex}.
                  </div>

                  {/* Starting Price Tag - Unboxed styled badge */}
                  <div className="absolute bottom-4 start-4 text-white">
                    <div className="text-xs text-cyan-300 font-medium">{isAr ? 'يبدأ من' : 'Starts from'}</div>
                    <div className="text-xl font-black tabular-nums">
                      {service.startingPrice} <span className="text-xs font-normal">{isAr ? 'ريال' : 'SAR'}</span>
                      <span className="text-xs text-slate-300 font-normal ms-1">/ {isAr ? service.unitAr : service.unitEn}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-cyan-700 transition-colors">
                      {isAr ? service.titleAr : service.titleEn}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {isAr ? service.descAr : service.descEn}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6">
                      {(isAr ? service.featuresAr : service.featuresEn).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Working Action Button */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer group-hover:underline underline-offset-4"
                    >
                      <span>{isAr ? 'حجز هذه الخدمة وتحديد السعر' : 'Book & Calculate Price'}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <span className="text-xs text-slate-400 font-medium">
                      {isAr ? 'خدمة فورية بجدة' : 'Instant in Jeddah'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
