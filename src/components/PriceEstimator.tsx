import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { Language } from '../types';

interface PriceEstimatorProps {
  lang: Language;
  onOpenBookingWithEstimate: (details: {
    serviceName: string;
    quantity: number;
    totalPrice: number;
    addons: string[];
  }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({
  lang,
  onOpenBookingWithEstimate,
}) => {
  const isAr = lang === 'ar';

  const [selectedServiceId, setSelectedServiceId] = useState<string>('sofa-majlis');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['fragrance']);

  const addonsList = useMemo(
    () => [
      {
        id: 'fragrance',
        titleAr: 'تعطير فرنسي فاخر ذكي يدوم 14 يوماً',
        titleEn: 'French luxury fragrance infusion (14 days)',
        price: 30,
      },
      {
        id: 'anti-bacterial',
        titleAr: 'تعقيم نانو حراري إضافي مضاد للجراثيم والفيروسات',
        titleEn: 'Nano thermal antimicrobial mist disinfection',
        price: 50,
      },
      {
        id: 'stain-shield',
        titleAr: 'طبقة حماية نانو طاردة لانسكاب السوائل والقهوة',
        titleEn: 'Nano stain & liquid repellant fabric shield',
        price: 70,
      },
    ],
    []
  );

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0],
    [selectedServiceId]
  );

  const calculateTotal = useMemo(() => {
    const base = activeService.startingPrice * quantity;
    const addonsTotal = selectedAddons.reduce((acc, currId) => {
      const item = addonsList.find((a) => a.id === currId);
      return acc + (item ? item.price : 0);
    }, 0);
    return base + addonsTotal;
  }, [activeService, quantity, selectedAddons, addonsList]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppBooking = () => {
    const serviceName = isAr ? activeService.titleAr : activeService.titleEn;
    const unitName = isAr ? activeService.unitAr : activeService.unitEn;
    const addonNames = selectedAddons
      .map((id) => {
        const item = addonsList.find((a) => a.id === id);
        return item ? (isAr ? item.titleAr : item.titleEn) : '';
      })
      .filter(Boolean)
      .join(', ');

    const message = isAr
      ? `مرحباً الأفضل كلين، أود حجز خدمة:\n- الخدمة: ${serviceName}\n- الكمية: ${quantity} (${unitName})\n- الإضافات: ${addonNames || 'بدون إضافات'}\n- السعر التقديري: ${calculateTotal} ريال سعودي\nأرجو تأكيد أقرب موعد لزيارة منزلي في جدة.`
      : `Hello Al-Afdal Cleaning, I would like to book:\n- Service: ${serviceName}\n- Quantity: ${quantity} (${unitName})\n- Addons: ${addonNames || 'None'}\n- Estimated Price: ${calculateTotal} SAR\nPlease confirm the earliest available slot in Jeddah.`;

    const url = `https://wa.me/966540079672?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleModalBooking = () => {
    onOpenBookingWithEstimate({
      serviceName: isAr ? activeService.titleAr : activeService.titleEn,
      quantity,
      totalPrice: calculateTotal,
      addons: selectedAddons.map((id) => {
        const item = addonsList.find((a) => a.id === id);
        return item ? (isAr ? item.titleAr : item.titleEn) : '';
      }),
    });
  };

  return (
    <section id="calculator" className="py-20 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'شفافية كاملة في الأسعار' : 'Instant Transparent Pricing'}</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {isAr
              ? 'احسب تكلفة خدمة التنظيف بالبخار فوراً واحجز موعدك'
              : 'Calculate Your Steam Cleaning Cost & Book Instantly'}
          </h2>
          <p className="text-base text-slate-600 font-normal">
            {isAr
              ? 'حدد الخدمة والكمية للحصول على السعر التقديري الدقيق شاملاً التنظيف والتعقيم الحراري والتجفيف السريع.'
              : 'Select your desired service, quantity, and optional protection add-ons for an instant, transparent quote.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Step 1: Service Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                {isAr ? '1. اختر الخدمة المطلوبة:' : '1. Select Desired Service:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedServiceId(s.id);
                      setQuantity(1);
                    }}
                    className={`p-3 text-start rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                      selectedServiceId === s.id
                        ? 'bg-cyan-50 border-cyan-600 text-cyan-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate">{isAr ? s.titleAr : s.titleEn}</span>
                    <span className="text-xs text-slate-500 tabular-nums font-mono shrink-0 ms-2">
                      {s.startingPrice} {isAr ? 'ريال' : 'SAR'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Quantity Slider & Counter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900">
                  {isAr ? '2. تحديد الكمية / العدد:' : '2. Select Quantity / Units:'}
                </label>
                <div className="text-sm font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-md">
                  {quantity} {isAr ? activeService.unitAr : activeService.unitEn}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <button
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-lg hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Step 3: Optional Protection & Fragrance Addons */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-900 mb-3">
                {isAr ? '3. إضافات الحماية والتعطير الخاصة:' : '3. Special Protection & Scent Add-ons:'}
              </label>
              <div className="space-y-2.5">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'border-cyan-600 bg-cyan-50/60'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-cyan-600 border-cyan-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-800">
                          {isAr ? addon.titleAr : addon.titleEn}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums font-mono shrink-0">
                        +{addon.price} {isAr ? 'ريال' : 'SAR'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quote Summary Column (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg sticky top-28">
            <div className="flex items-center justify-between pb-5 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'ملخص التقدير' : 'Estimate Summary'}
              </span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded">
                {isAr ? 'شامل التعقيم والتجفيف' : 'Includes Sanitization & Drying'}
              </span>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">{isAr ? activeService.titleAr : activeService.titleEn}</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {activeService.startingPrice * quantity} {isAr ? 'ريال' : 'SAR'}
                </span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500">{isAr ? 'الإضافات المحددة:' : 'Selected Add-ons:'}</div>
                  {selectedAddons.map((id) => {
                    const addon = addonsList.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex justify-between text-xs text-slate-600">
                        <span>{isAr ? addon.titleAr : addon.titleEn}</span>
                        <span className="font-bold tabular-nums">+{addon.price} {isAr ? 'ريال' : 'SAR'}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">{isAr ? 'المجموع التقديري' : 'Estimated Total'}</div>
                  <div className="text-xs text-slate-400">{isAr ? '*قد يختلف السعر حسب حالة الاتساخ' : '*Final price subject to onsite inspection'}</div>
                </div>
                <div className="text-3xl font-black text-cyan-700 tabular-nums font-mono">
                  {calculateTotal} <span className="text-sm font-semibold text-slate-700">{isAr ? 'ريال' : 'SAR'}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'إرسال التقدير وتأكيد الحجز بالواتساب' : 'Send Quote & Book on WhatsApp'}</span>
              </button>

              <button
                onClick={handleModalBooking}
                className="w-full py-3.5 px-4 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{isAr ? 'حجز موعد عبر نموذج الاتصال' : 'Book Appointment via Form'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 pt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>{isAr ? 'فريق عمل متواجد في كافة أحياء جدة' : 'Teams available across all Jeddah districts'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
