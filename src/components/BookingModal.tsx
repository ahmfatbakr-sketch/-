import React, { useState, useEffect } from 'react';
import { X, Calendar, Phone, User, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES, JEDDAH_DISTRICTS } from '../data/content';
import { Language, ServiceItem } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: ServiceItem | null;
  initialEstimate?: {
    serviceName: string;
    quantity: number;
    totalPrice: number;
    addons: string[];
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService,
  initialEstimate,
}) => {
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [district, setDistrict] = useState(JEDDAH_DISTRICTS[0].nameAr);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (initialEstimate) {
      setSelectedService(initialEstimate.serviceName);
    } else if (initialService) {
      setSelectedService(isAr ? initialService.titleAr : initialService.titleEn);
    } else {
      setSelectedService(isAr ? SERVICES[0].titleAr : SERVICES[0].titleEn);
    }
  }, [initialService, initialEstimate, isAr]);

  if (!isOpen) return null;

  const validatePhone = (value: string): boolean => {
    // Saudi phone validation: either 05xxxxxxxx or 9665xxxxxxxx
    const cleaned = value.replace(/\s+/g, '');
    const saudiRegex = /^(05|5|\+9665|9665)[0-9]{8}$/;
    return saudiRegex.test(cleaned) || cleaned.length >= 9;
  };

  const buildWhatsAppMessage = () => {
    const timeSlotLabel =
      preferredTime === 'morning'
        ? (isAr ? 'صباحاً (9:00 ص - 1:00 م)' : 'Morning (9:00 AM - 1:00 PM)')
        : preferredTime === 'afternoon'
        ? (isAr ? 'عصراً (1:00 م - 5:00 م)' : 'Afternoon (1:00 PM - 5:00 PM)')
        : (isAr ? 'مساءً (5:00 م - 10:00 م)' : 'Evening (5:00 PM - 10:00 PM)');

    return isAr
      ? `*طلب حجز خدمة تنظيف بالبخار بجدة - الأفضل كلين*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *الاسم الكريم:* ${name}\n` +
        `📱 *رقم الجوال:* ${phone}\n` +
        `✨ *الخدمة المطلوبة:* ${selectedService}\n` +
        `📍 *الحي في جدة:* ${district}\n` +
        `📅 *تاريخ الزيارة:* ${preferredDate || 'بأقرب موعد متاح'}\n` +
        `⏰ *الفترة المناسبة:* ${timeSlotLabel}\n` +
        (initialEstimate ? `💰 *التقدير المالي:* ${initialEstimate.totalPrice} ريال\n` : '') +
        `📝 *ملاحظات:* ${notes || 'لا توجد'}\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `أرجو تأكيد موعد وصول الفريق لمنزلي بجدة.`
      : `*Steam Cleaning Booking - Al-Afdal Cleaning Jeddah*\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client Name:* ${name}\n` +
        `📱 *Mobile Phone:* ${phone}\n` +
        `✨ *Service Requested:* ${selectedService}\n` +
        `📍 *Jeddah District:* ${district}\n` +
        `📅 *Preferred Date:* ${preferredDate || 'Earliest available'}\n` +
        `⏰ *Time Slot:* ${timeSlotLabel}\n` +
        (initialEstimate ? `💰 *Estimated:* ${initialEstimate.totalPrice} SAR\n` : '') +
        `📝 *Notes:* ${notes || 'None'}\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `Please confirm our appointment and team dispatch.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !validatePhone(phone)) {
      setPhoneError(isAr ? 'يرجى إدخال رقم جوال سعودي صحيح (مثال: 0540079672)' : 'Please enter a valid Saudi phone number (e.g. 0540079672)');
      return;
    }
    setPhoneError('');

    // Automatically send all information to WhatsApp
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/966540079672?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const handleOpenWhatsAppFromConfirmation = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/966540079672?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Handle Escape key to dismiss form
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-6">
        {/* Explicit Top-Left Corner X button to dismiss/get rid of the form */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
          aria-label={isAr ? 'إغلاق النموذج' : 'Close form'}
          title={isAr ? 'إغلاق (Esc)' : 'Close (Esc)'}
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {!submitted ? (
          <div>
            <div className={`mb-6 ${isAr ? 'pe-2' : 'ps-10'}`}>
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">
                {isAr ? 'حجز موعد فوري بجدة' : 'Direct Booking in Jeddah'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {isAr ? 'طلب زيارة فريق التنظيف بالبخار' : 'Book Steam Cleaning Visit'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isAr
                  ? 'املأ النموذج وسيقوم مشرف الخدمة بالاتصال بك خلال 15 دقيقة لتأكيد الموعد.'
                  : 'Submit your request and our supervisor will call you within 15 minutes.'}
              </p>
            </div>

            {initialEstimate && (
              <div className="mb-5 p-3.5 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-cyan-950">{initialEstimate.serviceName}</span>
                  <div className="text-cyan-800">
                    {initialEstimate.quantity} {isAr ? 'وحدات' : 'units'}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-[10px] text-cyan-700">{isAr ? 'التقدير المبدئي' : 'Estimated'}</div>
                  <div className="font-black text-cyan-950 text-base tabular-nums font-mono">
                    {initialEstimate.totalPrice} {isAr ? 'ريال' : 'SAR'}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {isAr ? 'الاسم الكريم:' : 'Your Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: عبد الله السالم' : 'e.g. Abdullah'}
                    className="w-full ps-9 pe-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {isAr ? 'رقم الجوال السعودي:' : 'Phone Number (KSA):'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
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
                    className="w-full ps-9 pe-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 font-mono"
                  />
                </div>
                {phoneError && <p className="text-xs text-rose-600 mt-1">{phoneError}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isAr ? 'الخدمة المطلوبة:' : 'Service:'}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 text-xs"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={isAr ? s.titleAr : s.titleEn}>
                        {isAr ? s.titleAr : s.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isAr ? 'الحي في جدة:' : 'Jeddah District:'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full ps-9 pe-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 text-xs"
                    >
                      {JEDDAH_DISTRICTS.map((d, idx) => (
                        <option key={idx} value={isAr ? d.nameAr : d.nameEn}>
                          {isAr ? `${d.nameAr} (${d.zoneAr})` : `${d.nameEn}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isAr ? 'تاريخ الزيارة المفضل:' : 'Preferred Date:'}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute top-3 start-3" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full ps-9 pe-2.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {isAr ? 'الوقت المناسب:' : 'Time Slot:'}
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 text-xs"
                  >
                    <option value="morning">{isAr ? 'صباحاً (9 ص - 1 م)' : 'Morning (9 AM - 1 PM)'}</option>
                    <option value="afternoon">{isAr ? 'عصراً (1 م - 5 م)' : 'Afternoon (1 PM - 5 PM)'}</option>
                    <option value="evening">{isAr ? 'مساءً (5 م - 10 م)' : 'Evening (5 PM - 10 PM)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {isAr ? 'ملاحظات إضافية (نوع القماش أو البقع):' : 'Additional Notes (Fabric/Stains):'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? 'مثال: طقم كنب مخمل عليه بقع قهوة، أو فيلا جديدة تحتاج جلي رخام...'
                      : 'e.g., Velvet sofa with coffee stains, or deep marble buffing needed...'
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-600 text-slate-800 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-sm text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'إرسال بيانات الحجز مباشرة للواتساب' : 'Send All Booking Info to WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              {isAr ? 'تم استلام طلبك بنجاح!' : 'Booking Request Received!'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {isAr
                ? `شكراً لك يا ${name}. تم تسجيل طلبك لخدمة ${selectedService} في ${district}. سيتواصل معك مشرفنا على الرقم ${phone} لتأكيد الموعد النهائي.`
                : `Thank you ${name}. Your request for ${selectedService} in ${district} has been registered. Our supervisor will call ${phone} shortly.`}
            </p>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={handleOpenWhatsAppFromConfirmation}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'تأكيد الحجز فوراً عبر الواتساب' : 'Confirm Instantly on WhatsApp'}</span>
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                {isAr ? 'إغلاق النافذة' : 'Close Window'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
