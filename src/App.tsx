/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { PriceEstimator } from './components/PriceEstimator';
import { BookingSection } from './components/BookingSection';
import { JeddahCoverage } from './components/JeddahCoverage';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BookingModal } from './components/BookingModal';
import { Language, ServiceItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeEstimate, setActiveEstimate] = useState<{
    serviceName: string;
    quantity: number;
    totalPrice: number;
    addons: string[];
  } | null>(null);

  // Sync HTML lang and dir when user toggles language
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleOpenBooking = () => {
    setSelectedService(null);
    setActiveEstimate(null);
    setBookingModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setActiveEstimate(null);
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithEstimate = (details: {
    serviceName: string;
    quantity: number;
    totalPrice: number;
    addons: string[];
  }) => {
    setActiveEstimate(details);
    setSelectedService(null);
    setBookingModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${lang === 'ar' ? 'font-sans' : ''}`}>
      {/* 3-Zone Top Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with 16:9 focal carrier, balanced typography, and full-width KPI row */}
        <Hero lang={lang} onOpenBooking={handleOpenBooking} />

        {/* 2. Core Capabilities & Bento Services Grid */}
        <ServicesSection lang={lang} onSelectService={handleSelectService} />

        {/* 3. Interactive Before/After Comparison Slider */}
        <BeforeAfterSlider lang={lang} />

        {/* 4. Instant Transparent Price & Booking Estimator */}
        <PriceEstimator
          lang={lang}
          onOpenBookingWithEstimate={handleOpenBookingWithEstimate}
        />

        {/* 5. Dedicated On-Page Booking Section ("Booking Place") */}
        <BookingSection lang={lang} />

        {/* 6. Jeddah Neighborhoods & Rapid Response Coverage */}
        <JeddahCoverage lang={lang} />

        {/* 6. Google Maps Embedded Integration from user prompt */}
        <GoogleMapsSection lang={lang} />

        {/* 7. Real Client Proof & Verified Google Reviews */}
        <TestimonialsSection lang={lang} />

        {/* 8. Frequently Asked Questions */}
        <FaqSection lang={lang} />
      </main>

      {/* Quiet Footer */}
      <Footer lang={lang} />

      {/* Mobile-only Sticky Contact Bar (strictly under 15% mobile viewport cap) */}
      <FloatingActionBar lang={lang} />

      {/* Interactive Booking & Callback Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        lang={lang}
        initialService={selectedService}
        initialEstimate={activeEstimate}
      />
    </div>
  );
}
