import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Flame, Clock, Award, Star, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { IMAGES } from '../assets/images';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking }) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Location kicker - clean unboxed metadata with separators */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 mb-6">
          <span>{isAr ? 'جدة' : 'Jeddah'}</span>
          <span aria-hidden="true">·</span>
          <span>{isAr ? 'خدمات النظافة المتخصصة' : 'Specialized Cleaning'}</span>
          <span aria-hidden="true">·</span>
          <span className="text-cyan-700 font-bold">{isAr ? 'تنظيف بالبخار عالي الضغط' : 'High-Pressure Steam Cleaning'}</span>
        </div>

        {/* 2-Column Split: Hero Proposition & Generated 16:9 Visual Carrier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Column 1: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Trust badge kicker */}
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-cyan-800">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                {isAr ? 'الشركة الرائدة المعتمدة بجدة' : 'Certified Leading Cleaning Company in Jeddah'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="tabular-nums font-mono font-bold">4.9 / 5</span>
                <span>({isAr ? '340+ تقييم حقيقي' : '340+ Google Reviews'})</span>
              </span>
            </div>

            {/* Headline with clamp size and balanced wrapping */}
            <h1
              className="text-slate-900 font-black tracking-tight leading-[1.18] mb-5 text-[clamp(2rem,3.8vw,3.5rem)]"
              style={{ textWrap: 'balance' }}
            >
              {isAr
                ? 'تنظيف بالبخار الحار بجدة للكنب، السجاد، والمجالس بأعلى معايير الإتقان'
                : 'Premium Steam Cleaning in Jeddah for Sofas, Carpets, and Luxury Living Spaces'}
            </h1>

            {/* Body proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              {isAr
                ? 'نخلصك من أصعب البقع والدهون وروائح المفروشات القديمة بقوة البخار الإيطالي عند درجة 140°C مع القضاء التام على 99.9% من الجراثيم والبكتيريا، وتجفيف فائق السرعة خلال ساعتين فقط.'
                : 'Eliminate stubborn coffee, grease, and pet odors with high-temperature Italian steam at 140°C, eradicating 99.9% of bacteria and allergens with accelerated 2-hour drying across all Jeddah districts.'}
            </p>

            {/* Primary Action Points */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6">
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
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <span>{isAr ? 'احجز موعدك الآن' : 'Schedule Service Now'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-5 py-3.5 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 shadow-sm"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'اتصال مباشر:' : 'Call:'}</span>
                <span className="tabular-nums font-mono text-cyan-900">{BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/966540079672?text=${encodeURIComponent(
                  isAr
                    ? 'السلام عليكم، أود الاستفسار وحجز خدمة تنظيف بالبخار في جدة'
                    : 'Hello, I would like to inquire about steam cleaning services in Jeddah'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm sm:text-base font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'مراسلة واتساب فورية' : 'Instant WhatsApp'}</span>
              </a>
            </div>

            {/* Key feature pills replaced with clean unboxed text metadata */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
              <span>✓ {isAr ? 'مواد إيطالية آمنة ومعتمدة' : 'Eco-Safe Italian Detergents'}</span>
              <span aria-hidden="true">·</span>
              <span>✓ {isAr ? 'فنيون محترفون ذوو خبرة' : 'Certified Sanitation Technicians'}</span>
              <span aria-hidden="true">·</span>
              <span>✓ {isAr ? 'دفع مريح بعد المعاينة والرضا' : 'Pay After Inspection & Satisfaction'}</span>
            </div>
          </div>

          {/* Column 2: Generated 16:9 Focal Image with clean card frame (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl group">
              <img
                src={IMAGES.hero}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('public')) {
                    target.src = '/images/hero_steam_cleaning.jpg';
                  }
                }}
                alt={isAr ? 'فني شركة الأفضل كلين أثناء تنظيف كنب بالبخار الحار في جدة' : 'Al-Afdal Cleaning technician steam cleaning upholstery in Jeddah'}
                className="w-full h-full min-h-[300px] lg:min-h-[440px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs uppercase tracking-wider text-cyan-300 font-bold mb-1">
                  {isAr ? 'تقنية التنظيف بالبخار 140°C' : '140°C High-Pressure Steam'}
                </div>
                <div className="text-sm font-semibold leading-snug">
                  {isAr
                    ? 'إزالة عميقة للبقع والشوائب العالقة مع التعقيم الجذري للأنسجة الحساسة'
                    : 'Deep dirt extraction & biological disinfection for delicate fabrics'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Strip in a dedicated row below hero split */}
        <div className="mt-12 pt-8 border-t border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              <span className="tabular-nums font-mono">+15,000</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {isAr ? 'عميل راضٍ في أحياء جدة' : 'Satisfied Clients across Jeddah'}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-cyan-700 tracking-tight">
              <Flame className="w-5 h-5 text-amber-500 self-center" />
              <span className="tabular-nums font-mono">140°C</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {isAr ? 'حرارة البخار للقضاء على الجراثيم' : 'Thermal Steam Eliminating 99.9% Germs'}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              <Clock className="w-5 h-5 text-cyan-600 self-center" />
              <span className="tabular-nums font-mono">30-60</span>
              <span className="text-sm font-normal text-slate-500">{isAr ? 'دقيقة' : 'min'}</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {isAr ? 'سرعة الوصول لكافة مناطق جدة' : 'Average Arrival Window in Jeddah'}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight">
              <Award className="w-5 h-5 text-emerald-600 self-center" />
              <span className="tabular-nums font-mono">100%</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {isAr ? 'ضمان الرضا وإعادة التنظيف مجاناً' : 'Money-Back & Free Re-clean Guarantee'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
