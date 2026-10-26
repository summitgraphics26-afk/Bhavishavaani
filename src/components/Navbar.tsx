import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, MapPin, Compass, Calendar } from 'lucide-react';

interface NavbarProps {
  onNavigateToForm: () => void;
  onNavigateToServices: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateToForm,
  onNavigateToServices
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-[#040612]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-xl shadow-black/50 py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#03040a]/90 via-[#03040a]/60 to-transparent py-3 sm:py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
          
          {/* Brand Logo & Name Area */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1"
          >
            {/* Circular Om Logo (Left-aligned, non-shrinking) */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#a855f7] to-[#0f172a] p-[1.5px] shadow-lg shadow-[#d4af37]/20 group-hover:shadow-[#d4af37]/40 transition-shadow shrink-0">
              <div className="w-full h-full rounded-full bg-[#070919] flex items-center justify-center">
                <span className="text-[#fef08a] font-cinzel font-black text-sm sm:text-base md:text-lg select-none">
                  ॐ
                </span>
              </div>
            </div>

            {/* Brand Titles Hierarchy (Responsive & Never Overlapping) */}
            <div className="min-w-0 flex flex-col justify-center">
              {/* Primary Brand Name */}
              <span className="font-cinzel text-sm min-[360px]:text-base sm:text-xl lg:text-2xl font-black tracking-wider sm:tracking-widest text-gold-gradient truncate leading-tight block">
                BHAVISHYA VAANI
              </span>

              {/* Mobile Sub-Row: VEDIC ASTROLOGY beside logo below brand, PT. PAWAN MISHRA below or neatly aligned */}
              <div className="flex flex-col min-[390px]:flex-row min-[390px]:items-center gap-x-2 text-[9px] min-[360px]:text-[10px] sm:text-xs leading-tight mt-0.5 min-w-0">
                <span className="text-[#d4af37] tracking-widest uppercase font-semibold truncate">
                  VEDIC ASTROLOGY
                </span>
                <span className="hidden min-[390px]:inline text-[#d4af37]/60">•</span>
                <span className="text-slate-300 font-medium tracking-wide truncate">
                  Pt. Pawan Mishra
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium text-slate-300 hover:text-[#fef08a] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Cosmic Wheel</span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-slate-300 hover:text-[#fef08a] transition-colors cursor-pointer"
            >
              About Pt. Pawan Mishra
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-slate-300 hover:text-[#fef08a] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Astrology Services</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 border-l border-slate-700/80 pl-4">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Mahilpur, Punjab</span>
            </div>
          </div>

          {/* Desktop Header CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToForm}
              className="px-4 lg:px-5 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b45309] text-[#05060f] font-semibold text-xs tracking-wider uppercase font-cinzel hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#d4af37]/20 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger (Strictly Right Aligned, Never Overlapping) */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 min-[360px]:p-2 rounded-lg bg-[#0e122b] border border-slate-800 text-slate-300 hover:text-[#fef08a] focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 text-[#fef08a]" />
              ) : (
                <Menu className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 text-[#d4af37]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2.5 p-3.5 min-[360px]:p-4 rounded-xl bg-[#080b1e]/98 border border-[#d4af37]/35 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-[#121636] hover:text-[#fef08a] font-medium text-xs min-[360px]:text-sm flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>3D Cosmic Zodiac Wheel</span>
              </button>

              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-[#121636] hover:text-[#fef08a] font-medium text-xs min-[360px]:text-sm transition-colors cursor-pointer"
              >
                About Pt. Pawan Mishra
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-[#121636] hover:text-[#fef08a] font-medium text-xs min-[360px]:text-sm flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Astrology Services</span>
              </button>

              <div className="py-2 px-3 rounded-lg bg-[#0c1028] border border-slate-800/80 text-[11px] min-[360px]:text-xs text-slate-300 flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Mahilpur, Hoshiarpur, Punjab – 146105</span>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToForm();
                }}
                className="w-full mt-1.5 py-2.5 min-[360px]:py-3 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b45309] text-[#05060f] font-bold text-xs uppercase font-cinzel tracking-wider shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Your Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
