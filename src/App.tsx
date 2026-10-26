/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAstrologer } from './components/AboutAstrologer';
import { ServicesSection } from './components/ServicesSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { AstrologyServiceType } from './types/astrology';

export default function App() {
  const [selectedService, setSelectedService] = useState<AstrologyServiceType>('Kundli Reading');

  // Handle smooth scrolling to consultation form with pre-selected service
  const handleSelectServiceAndScroll = (service: AstrologyServiceType) => {
    setSelectedService(service);
    const formElement = document.getElementById('consultation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToForm = () => {
    const formElement = document.getElementById('consultation');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#03040a] text-slate-100 flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Navigation Bar */}
      <Navbar
        onNavigateToForm={handleNavigateToForm}
        onNavigateToServices={handleNavigateToServices}
      />

      {/* Main Page Flow (Strictly as ordered in prompt: 
          3D Hero Landing Page → Introduction to Pt. Pawan Mishra → Astrology Services → Consultation Form → Footer) */}
      <main className="flex-grow">
        {/* 1. 3D Hero Landing Page */}
        <Hero
          onExploreServices={handleNavigateToServices}
          onBookConsultation={handleNavigateToForm}
        />

        {/* 2. Introduction to Pt. Pawan Mishra */}
        <AboutAstrologer />

        {/* 3. Astrology Services (Gemstone, Palm Reading, Kundli Reading) */}
        <ServicesSection
          onSelectServiceAndScroll={handleSelectServiceAndScroll}
        />

        {/* 4. Consultation Enquiry Form at the very bottom before footer */}
        <ConsultationForm
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      {/* 5. Footer */}
      <Footer
        onSelectServiceAndScroll={handleSelectServiceAndScroll}
        onNavigateToForm={handleNavigateToForm}
      />
    </div>
  );
}
