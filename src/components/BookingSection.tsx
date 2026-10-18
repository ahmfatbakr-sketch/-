import React, { useState } from 'react';
import { Calendar, Phone, User, MapPin, CheckCircle2, MessageCircle, Clock, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, JEDDAH_DISTRICTS } from '../data/content';
import { Language } from '../types';

interface BookingSectionProps {
  lang: Language;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(
    isAr ? SERVICES[0].titleAr : SERVICES[0].titleEn
  );
  const [district, setDistrict] = useState(JEDDAH_DISTRICTS[0].nameAr);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (value: string): boolean => {
    const cleaned = value.replace(/\s+/g, '');
    const saudiRegex = /^(05|5|\+9665|9665)[0-9]{8}$/;
    return saudiRegex.test(cleaned) || cleaned.length >= 9;
  };

  const buildWhatsAppMessage = () => {
    const timeSlotLabel =
      preferredTime === 'morning'
        ? isAr ? 'صباحاً (9:00 ص - 1:00 م)' : 'Morning (9:00 AM - 1:00 PM)'
        : preferredTime === 'afternoon'
        ? isAr ? 'عصراً (1:00 م - 5:00 م)' : 'Afternoon (1:00 PM - 5:00 PM)'
        : isAr ? 'مساءً (5:00 م - 10:00 م)' : 'Evening (5:00 PM - 10:00 PM)';

    return isAr
      ? `*طلب حجز خدمة تنظيف بالبخار بجدة - الأفضل كلين*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *الاسم الكريم:* ${name}\n` +
        `📱 *رقم الجوال:* ${phone}\n` +
        `✨ *الخدمة المطلوبة:* ${selectedService}\n` +
        `📍 *الحي في جدة:* ${district}\n` +
        `📅 *تاريخ الزيارة:* ${preferredDate || 'بأقرب موعد متاح'}\n` +
        `⏰ *الفترة المناسبة:* ${timeSlotLabel}\n` +
        `📝 *ملاحظات:* ${notes || 'لا توجد'}\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `أرجو تأكيد موعد وصول الفريق لمنزلي بجدة.`
      : `*Steam Cleaning Booking - Al-Afdal Cleaning Jeddah*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client Name:* ${name}\n` +
        `📱 *Mobile Phone:* ${phone}\n` +
        `✨ *Service Requested:* ${selectedService}\n` +
        `📍 *Jeddah District:* ${district}\n` +
        `📅 *Preferred Date:* ${preferredDate || 'Earliest available slot'}\n` +
        `⏰ *Preferred Time:* ${timeSlotLabel}\n` +
        `📝 *Notes:* ${notes || 'None'}\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm our appointment and team dispatch.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !validatePhone(phone)) {
      setPhoneError(
        isAr
          ? 'يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 (مثال: 0540079672)'
          : 'Please enter a valid Saudi mobile number (e.g. 0540079672)'
      );
      return;
    }
    setPhoneError('');

    // Automatically send all info to WhatsApp
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/966540079672?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const handleOpenWhatsAppFromConfirmation = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/966540079672?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="booking" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition & Contact Guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-3 py-1.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حجز موعد فوري بجدة' : 'Instant Jeddah Booking'}</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {isAr
                ? 'مكان حجز موعدك لخدمات التنظيف والتعقيم بالبخار'
                : 'Book Your Professional Steam Cleaning Service in Jeddah'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {isAr
                ? 'املأ بيانات حجزك أدناه وسيقوم فريق العمل بالتنسيق معك فوراً وتأكيد أقرب موعد لزيارة منزلك بأحدث ماكينات البخار الإيطالية 140°C.'
                : 'Submit your appointment details below and our service supervisor will confirm the earliest dispatch to your residence in Jeddah.'}
            </p>

            {/* Direct hotline box */}
            <div className="p-4 sm:p-5 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-3">
              <div className="text-xs text-slate-400 font-medium">
                {isAr ? 'أو تفضل بالاتصال والحجز الفوري عبر الهاتف:' : 'Or call our direct booking hotline:'}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-bold transition-colors font-mono tabular-nums shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'الدفع نقداً أو عبر مدى بعد المعاينة والرضا التام' : 'Pay via Cash or Mada after inspection & satisfaction'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isAr ? 'خدمة سريعة تغطي جميع أحياء جدة على مدار 24 ساعة' : '24/7 Rapid response covering all Jeddah districts'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isAr ? 'ضمان إعادة التنظيف مجاناً في حال عدم إزالة البقع' : 'Free re-clean guarantee if stains persist'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Actual Interactive Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-9 shadow-2xl border border-slate-200">
              {!submitted ? (
                <div>
                  <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                        {isAr ? 'نموذج حجز الموعد' : 'Booking Form'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isAr ? 'تأكيد فوري خلال أقل من 15 دقيقة' : 'Instant confirmation within 15 minutes'}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {isAr ? 'متاح اليوم' : 'Available Today'}
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'الاسم الكريم:' : 'Full Name:'}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute top-3.5 start-3 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={isAr ? 'مثال: عبد الله السالم' : 'e.g. Abdullah'}
                            className="w-full ps-9 pe-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'رقم الجوال السعودي:' : 'Mobile Number (KSA):'}
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute top-3.5 start-3 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            dir="ltr"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (phoneError) setPhoneError('');
                            }}
                            placeholder="054 007 9672"
                            className="w-full ps-9 pe-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 font-mono transition-colors"
                          />
                        </div>
                        {phoneError && <p className="text-xs text-rose-600 mt-1">{phoneError}</p>}
                      </div>
                    </div>

                    {/* Service & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'الخدمة المطلوبة:' : 'Service:'}
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium transition-colors"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={isAr ? s.titleAr : s.titleEn}>
                              {isAr ? s.titleAr : s.titleEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'الحي في محافظة جدة:' : 'Jeddah District:'}
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute top-3.5 start-3 pointer-events-none" />
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full ps-9 pe-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium transition-colors"
                          >
                            {JEDDAH_DISTRICTS.map((d, idx) => (
                              <option key={idx} value={isAr ? d.nameAr : d.nameEn}>
                                {isAr ? `${d.nameAr} (${d.zoneAr})` : `${d.nameEn} (${d.zoneEn})`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'التاريخ المفضل للزيارة:' : 'Preferred Date:'}
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-slate-400 absolute top-3.5 start-3 pointer-events-none" />
                          <input
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full ps-9 pe-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 text-xs sm:text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-800 mb-1.5">
                          {isAr ? 'الفترة الزمنية المناسبة:' : 'Preferred Time Slot:'}
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 text-xs sm:text-sm font-medium transition-colors"
                        >
                          <option value="morning">{isAr ? 'صباحاً (9:00 ص - 1:00 م)' : 'Morning (9:00 AM - 1:00 PM)'}</option>
                          <option value="afternoon">{isAr ? 'عصراً (1:00 م - 5:00 م)' : 'Afternoon (1:00 PM - 5:00 PM)'}</option>
                          <option value="evening">{isAr ? 'مساءً (5:00 م - 10:00 م)' : 'Evening (5:00 PM - 10:00 PM)'}</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block font-bold text-slate-800 mb-1.5">
                        {isAr ? 'ملاحظات حول المفروشات أو البقع (اختياري):' : 'Additional Notes (Optional):'}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={
                          isAr
                            ? 'مثال: طقم كنب مجلس رجال 7 مقاعد به بقع قهوة، أو شقة جديدة بعد الدهان...'
                            : 'e.g., 7-seat majlis sofa with coffee stains, or new apartment post-renovation...'
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 focus:bg-white text-slate-900 text-xs sm:text-sm transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-sm sm:text-base transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{isAr ? 'إرسال بيانات الحجز مباشرة إلى الواتساب (0540079672)' : 'Send All Booking Info to WhatsApp (0540079672)'}</span>
                      </button>
                    </div>

                    <div className="text-center text-xs text-slate-400 font-medium pt-1">
                      {isAr ? 'لا يلزم الدفع مسبقاً · معاينة مجانية وضمان الرضا التام' : 'No prepayment required · Free inspection & 100% satisfaction guarantee'}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900">
                    {isAr ? 'تم استلام طلب الحجز بنجاح!' : 'Booking Request Confirmed!'}
                  </h3>

                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? `شكراً لك يا ${name}. تم تسجيل طلبك لخدمة ${selectedService} في ${district}. سيتصل بك مشرف الخدمة على جوالك ${phone} خلال دقائق لتأكيد الموعد النهائي.`
                      : `Thank you ${name}. Your request for ${selectedService} in ${district} has been recorded. Our team will contact you at ${phone} shortly.`}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleOpenWhatsAppFromConfirmation}
                      className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد الموعد عبر الواتساب' : 'Confirm on WhatsApp'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setPhone('');
                        setNotes('');
                      }}
                      className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                    >
                      {isAr ? 'حجز موعد إضافي' : 'Book Another Service'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
