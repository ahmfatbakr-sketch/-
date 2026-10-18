import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, ExternalLink, Copy, Check, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface GoogleMapsSectionProps {
  lang: Language;
}

export const GoogleMapsSection: React.FC<GoogleMapsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps embed URL using the coordinates: 21.4375174, 39.3021424
  const mapEmbedUrl = `https://maps.google.com/maps?q=${BUSINESS_INFO.coordinates.lat},${BUSINESS_INFO.coordinates.lng}&hl=${
    isAr ? 'ar' : 'en'
  }&z=14&output=embed`;

  return (
    <section id="location" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isAr ? 'موقعنا على خرائط جوجل' : 'Our Google Maps Location'}</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {isAr
              ? 'تفضل بزيارة موقعنا أو اطلب خدمة التوصيل لمنزلك في جدة'
              : 'Visit Our Location or Request On-Site Home Service'}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {isAr
              ? 'مقرنا المركزي في جدة يوفر انطلاقاً سريعاً لسيارات الخدمة المتنقلة المزودة بأحدث مولدات وماكينات البخار الاحترافية.'
              : 'Our central dispatch hub in Jeddah coordinates mobile steam cleaning vans serving all surrounding districts 24 hours a day.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Business Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Rating header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">
                    {isAr ? 'تقييم Google Maps المعتمد' : 'Verified Google Maps Rating'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                      {BUSINESS_INFO.rating}
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded">
                    {isAr ? 'مفتوح 24/7' : 'Open 24/7'}
                  </span>
                  <div className="text-xs text-slate-400 mt-1">
                    {BUSINESS_INFO.reviewsCount} {isAr ? 'مراجعة موثقة' : 'Verified Reviews'}
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {isAr ? BUSINESS_INFO.nameAr : BUSINESS_INFO.nameEn}
                </h3>
                <p className="text-xs text-slate-500">
                  {isAr ? BUSINESS_INFO.addressDetailAr : BUSINESS_INFO.addressDetailEn}
                </p>
              </div>

              {/* Info Rows */}
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      {isAr ? 'إحداثيات الموقع:' : 'Geo Coordinates:'}
                    </div>
                    <div className="text-slate-500 font-mono tabular-nums">
                      {BUSINESS_INFO.coordinates.lat}, {BUSINESS_INFO.coordinates.lng}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">{isAr ? 'هاتف وواتساب الحجز:' : 'Direct Hotline:'}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={`tel:${BUSINESS_INFO.phone}`}
                        className="text-cyan-800 font-bold font-mono hover:underline tabular-nums"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                      <button
                        onClick={handleCopyPhone}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                        title={isAr ? 'نسخ الرقم' : 'Copy phone'}
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800">{isAr ? 'ساعات العمل:' : 'Business Hours:'}</div>
                    <div className="text-slate-500">
                      {isAr ? BUSINESS_INFO.workingHoursAr : BUSINESS_INFO.workingHoursEn}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps External Launchers */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_INFO.coordinates.lat},${BUSINESS_INFO.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 text-cyan-600" />
                <span>{isAr ? 'طلب الاتجاهات' : 'Get Directions'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[360px] lg:min-h-[460px] relative">
            <iframe
              src={mapEmbedUrl}
              title={isAr ? 'موقع شركة تنظيف بالبخار بجدة الأفضل كلين على الخريطة' : 'Al-Afdal Cleaning Steam Cleaning Jeddah Google Map'}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
