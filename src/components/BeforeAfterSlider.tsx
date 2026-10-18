import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../assets/images';
import { Language } from '../types';

interface BeforeAfterSliderProps {
  lang: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'برهان الجودة والنتائج' : 'Proof of Performance'}</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {isAr
              ? 'شاهد الفرق الملموس قبل وبعد التنظيف بالبخار'
              : 'Witness The Difference Before & After Steam Extraction'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            {isAr
              ? 'اسحب المؤشر التفاعلي يميناً ويساراً لمشاهدة قدرة تقنية البخار الحار 140°C على إزالة التصبغات والدهون وتفتيت الأوساخ وإعادة النقاء الأصلي.'
              : 'Drag the interactive slider to see how our 140°C high-pressure steam removes deep-seated grease, pet stains, and soil from premium upholstery.'}
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative h-[340px] sm:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-700 shadow-2xl"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-label="Before and after comparison slider"
          >
            {/* Background Image: Clean (After) State */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={IMAGES.carpet}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('public')) {
                    target.src = '/images/service_carpet_steam.jpg';
                  }
                }}
                alt="After Steam Cleaning"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 end-4 bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isAr ? 'بعد التنظيف بالبخار' : 'After Steam Clean'}</span>
              </div>
            </div>

            {/* Foreground Clipped Image: Dirty (Before) State */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img
                  src={IMAGES.carpet}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('public')) {
                      target.src = '/images/service_carpet_steam.jpg';
                    }
                  }}
                  alt="Before Steam Cleaning"
                  className="w-full h-full object-cover filter brightness-75 sepia-[0.35] contrast-125"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    maxWidth: 'none',
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 start-4 bg-slate-900/90 backdrop-blur-sm text-amber-400 px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
                  {isAr ? 'قبل التنظيف (بقع وأتربة)' : 'Before (Stains & Dirt)'}
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-9 h-9 rounded-full bg-cyan-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick preset selector buttons for users */}
          <div className="mt-5 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{isAr ? '👈 اسحب للمقارنة الكاملة' : '👈 Drag to compare'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSliderPosition(20)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition-colors cursor-pointer"
              >
                {isAr ? 'عرض النتيجة (بعد)' : 'View Clean (After)'}
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition-colors cursor-pointer"
              >
                {isAr ? 'منتصف (50/50)' : 'Split (50/50)'}
              </button>
              <button
                onClick={() => setSliderPosition(80)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition-colors cursor-pointer"
              >
                {isAr ? 'عرض السابق (قبل)' : 'View Before'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
