import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/content';
import { Language } from '../types';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{isAr ? 'آراء عملاء جدة الحقيقية' : 'Real Jeddah Client Reviews'}</span>
            </div>
            <h2
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
              {isAr
                ? 'ثقة وتجارب تفوق التوقعات في كافة أحياء جدة'
                : 'Customer Trust & Experiences Exceeding Expectations'}
            </h2>
            <p className="text-base text-slate-600 font-normal">
              {isAr
                ? 'نفخر بتقييم 4.9 من 5 بناءً على مئات المراجعات والآراء الموثقة لعملائنا في تنظيف الكنب والسجاد والمجالس والفلل.'
                : 'Rated 4.9 out of 5 based on authentic reviews from homeowners and business clients across Jeddah.'}
            </p>
          </div>

          {/* Social Proof Summary Block */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4 shrink-0">
            <div className="text-3xl font-black text-slate-900 tabular-nums font-mono">
              {BUSINESS_INFO.rating}
            </div>
            <div>
              <div className="flex text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {isAr ? 'أكثر من 340 تقييم معتمد على خرائط جوجل' : '340+ verified Google Maps reviews'}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Meta header: Author, Neighborhood, Date */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{review.author}</h3>
                    {/* Clean unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{isAr ? review.districtAr : review.districtEn}</span>
                      <span aria-hidden="true">·</span>
                      <span>{isAr ? review.dateAr : review.dateEn}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50/80 px-2.5 py-1 rounded-md mb-3.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                  <span>{isAr ? review.serviceAr : review.serviceEn}</span>
                </div>

                {/* Comment quote */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  "{isAr ? review.commentAr : review.commentEn}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'حجز مؤكد ومراجعة حقيقية' : 'Verified Booking & Review'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
