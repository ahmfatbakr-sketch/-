import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Search, ShieldCheck } from 'lucide-react';
import { JEDDAH_DISTRICTS } from '../data/content';
import { Language } from '../types';

interface JeddahCoverageProps {
  lang: Language;
}

export const JeddahCoverage: React.FC<JeddahCoverageProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = [
    { id: 'all', labelAr: 'كافة أحياء جدة', labelEn: 'All Districts' },
    { id: 'north', labelAr: 'شمال جدة', labelEn: 'North Jeddah' },
    { id: 'central', labelAr: 'وسط جدة', labelEn: 'Central Jeddah' },
    { id: 'south-east', labelAr: 'شرق وجنوب جدة', labelEn: 'East & South' },
  ];

  const filteredDistricts = useMemo(() => {
    return JEDDAH_DISTRICTS.filter((district) => {
      // Zone match
      let zoneMatch = true;
      if (selectedZone === 'north') {
        zoneMatch = district.zoneAr.includes('شمال');
      } else if (selectedZone === 'central') {
        zoneMatch = district.zoneAr.includes('وسط');
      } else if (selectedZone === 'south-east') {
        zoneMatch = district.zoneAr.includes('جنوب') || district.zoneAr.includes('شرق');
      }

      // Query match
      const queryMatch =
        searchQuery.trim() === '' ||
        district.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        district.nameEn.toLowerCase().includes(searchQuery.toLowerCase());

      return zoneMatch && queryMatch;
    });
  }, [selectedZone, searchQuery]);

  return (
    <section id="coverage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'نطاق الخدمة السريعة' : 'Rapid Response Coverage'}</span>
            </div>
            <h2
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
              {isAr
                ? 'تغطية فورية لجميع أحياء ومناطق محافظة جدة'
                : 'Instant 24/7 Coverage Across All Jeddah Neighborhoods'}
            </h2>
            <p className="text-base text-slate-600 font-normal">
              {isAr
                ? 'سيارات مجهزة بأحدث أجهزة التنظيف بالبخار الإيطالي متمركزة في مختلف أحياء جدة لضمان سرعة الوصول خلال 30 إلى 60 دقيقة.'
                : 'Equipped mobile steam units stationed across Jeddah ensure rapid on-site arrival within 30 to 60 minutes.'}
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن حيك بجدة...' : 'Search your district...'}
              className="w-full ps-10 pe-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-600 text-slate-800"
            />
          </div>
        </div>

        {/* Zone Segmented Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-xl max-w-fit">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedZone === zone.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isAr ? zone.labelAr : zone.labelEn}
            </button>
          ))}
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredDistricts.map((district, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl hover:border-cyan-400 transition-colors flex flex-col justify-between"
            >
              <div className="font-bold text-sm text-slate-900 mb-1">
                {isAr ? district.nameAr : district.nameEn}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60 mt-1">
                <span>{isAr ? district.zoneAr : district.zoneEn}</span>
                <span className="flex items-center gap-1 text-cyan-800 font-semibold tabular-nums">
                  <Clock className="w-3 h-3 text-cyan-600" />
                  {district.deliveryTime}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDistricts.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm font-medium">
              {isAr
                ? 'لم نجد الحي المطلوب بالاسم المدخل، لكننا نغطي جميع أنحاء جدة بلا استثناء!'
                : 'No district matched your specific keyword, but we cover every location across Jeddah!'}
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-cyan-50/70 border border-cyan-200/80 rounded-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-950 font-semibold">
            <ShieldCheck className="w-5 h-5 text-cyan-700 shrink-0" />
            <span>
              {isAr
                ? 'هل حيك غير مذكور في القائمة؟ لا تقلق، فريقنا المتنقل يغطي كل زاوية في محافظة جدة والمناطق المحيطة.'
                : 'Is your district not listed? Do not worry, our mobile fleet covers all areas of Greater Jeddah.'}
            </span>
          </div>
          <a
            href="tel:0540079672"
            className="text-xs font-bold text-cyan-800 hover:text-cyan-950 underline underline-offset-4"
          >
            {isAr ? 'تأكيد وصول الفريق لحيك فوراً 0540079672' : 'Confirm dispatch to your area: 0540079672'}
          </a>
        </div>
      </div>
    </section>
  );
};
