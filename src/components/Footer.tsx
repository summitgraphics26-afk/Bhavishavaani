import React from 'react';
import { MapPin, Phone, Mail, Sparkles, Compass, Shield, ArrowUp } from 'lucide-react';
import { AstrologyServiceType } from '../types/astrology';

interface FooterProps {
  onSelectServiceAndScroll: (service: AstrologyServiceType) => void;
  onNavigateToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectServiceAndScroll,
  onNavigateToForm
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020308] border-t border-[#181d3d] text-slate-400 text-sm overflow-hidden">
      {/* Decorative top gold line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Brand & Astrologer Details (LG: 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#7c3aed] p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#050714] flex items-center justify-center text-[#fef08a] font-cinzel font-bold text-lg">
                  ॐ
                </div>
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-black text-gold-gradient tracking-wider">
                  BHAVISHYA VAANI
                </h3>
                <p className="text-xs text-[#cbd5e1] font-semibold">
                  Astrologer: <span className="text-[#fef08a]">Pt. Pawan Mishra</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to helping individuals discover life's possibilities through classical Vedic astrology, precise Kundli computation, authentic palmistry (Hastarekha), and gemstone alignment.
            </p>

            {/* Address */}
            <div className="p-3.5 rounded-xl bg-[#080b1e] border border-[#1d2247] flex items-start gap-3 max-w-md">
              <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Official Address
                </span>
                <span className="text-xs font-medium text-slate-200">
                  Mahilpur, Hoshiarpur, Punjab – 146105
                </span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (LG: 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#f8fafc] border-b border-slate-800 pb-2">
              Navigation Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="hover:text-[#fef08a] transition-colors flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>3D Cosmic Landing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-[#fef08a] transition-colors flex items-center gap-2"
                >
                  <span>About Pt. Pawan Mishra</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-[#fef08a] transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Astrology Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToForm}
                  className="hover:text-[#fef08a] transition-colors flex items-center gap-2"
                >
                  <span>Book Personal Consultation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Astrology Services Links (LG: 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#f8fafc] border-b border-slate-800 pb-2">
              Astrology Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectServiceAndScroll('Gemstone Consultation')}
                  className="text-left group flex items-start gap-2 hover:text-[#fef08a] transition-colors"
                >
                  <span className="text-[#d4af37] group-hover:translate-x-0.5 transition-transform">✦</span>
                  <div>
                    <span className="font-medium text-slate-200 group-hover:text-[#fef08a]">Gemstone Consultation</span>
                    <p className="text-[11px] text-slate-500">Traditional Ratna Shastra & Navaratna analysis</p>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectServiceAndScroll('Palm Reading')}
                  className="text-left group flex items-start gap-2 hover:text-[#fef08a] transition-colors"
                >
                  <span className="text-[#38bdf8] group-hover:translate-x-0.5 transition-transform">✦</span>
                  <div>
                    <span className="font-medium text-slate-200 group-hover:text-[#38bdf8]">Palm Reading</span>
                    <p className="text-[11px] text-slate-500">Hastarekha line analysis & mount evaluations</p>
                  </div>
                </button>
              </li>

              <li>
                <button
                  onClick={() => onSelectServiceAndScroll('Kundli Reading')}
                  className="text-left group flex items-start gap-2 hover:text-[#fef08a] transition-colors"
                >
                  <span className="text-[#c084fc] group-hover:translate-x-0.5 transition-transform">✦</span>
                  <div>
                    <span className="font-medium text-slate-200 group-hover:text-[#c084fc]">Kundli Reading</span>
                    <p className="text-[11px] text-slate-500">12 Bhavas, Dasha cycles & planetary transitions</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Ethical Disclaimer (As requested: do not claim astrological predictions are guaranteed) */}
        <div className="mt-12 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-[#060817] border border-[#1b2046] flex items-start gap-3 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">Ethical Consultation Notice:</strong> Astrological insights, palm readings, and gemstone guidance are traditional advisory services grounded in classical Vedic literature. Consultations provide perspective and timing evaluations to assist your personal decision-making; they do not replace legal, medical, or financial counsel, and no outcome is guaranteed.
            </p>
          </div>
        </div>

        {/* Bottom bar with copyright and scroll to top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Bhavishya Vaani. All rights reserved.</p>
            <p className="text-[11px] text-slate-600">Pt. Pawan Mishra • Mahilpur, Hoshiarpur, Punjab – 146105</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c1028] border border-slate-800 text-slate-300 hover:text-[#fef08a] hover:border-[#d4af37]/40 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
