import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ZodiacCanvas } from './3d/ZodiacCanvas';
import { Sparkles, MapPin, ArrowDown, ChevronRight, Sun, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onBookConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onBookConsultation
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants with graceful fallback for reduced motion
  const fadeUp = (delay: number) => ({
    initial: shouldReduceMotion 
      ? { opacity: 1, y: 0, filter: 'blur(0px)' } 
      : { opacity: 0, y: 18, filter: 'blur(4px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: shouldReduceMotion ? 0.01 : 0.75, 
        delay: shouldReduceMotion ? 0 : delay, 
        ease: 'easeOut' as const
      } 
    }
  });

  return (
    <section 
      id="hero" 
      className="relative min-h-[100dvh] pt-20 sm:pt-24 md:pt-28 pb-8 flex flex-col justify-between bg-cosmic-grid overflow-hidden"
    >
      {/* 1. Subtle Deep-Navy Ambient Background, Glow & Tiny Celestial Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Golden & Deep Purple Radial Ambient Glow behind Headline */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] min-[390px]:w-[480px] sm:w-[650px] md:w-[850px] h-[280px] sm:h-[400px] bg-gradient-to-tr from-[#7c3aed]/12 via-[#d4af37]/12 to-[#0284c7]/10 blur-[90px] sm:blur-[130px] rounded-full" />
        
        {/* Tiny Glowing Celestial Sparkles */}
        <div className="absolute top-24 left-[12%] w-1.5 h-1.5 rounded-full bg-[#fef08a] opacity-70 blur-[0.5px] animate-pulse" />
        <div className="absolute top-44 right-[15%] w-1 h-1 rounded-full bg-[#93c5fd] opacity-60" />
        <div className="absolute top-64 left-[22%] w-1 h-1 rounded-full bg-[#fef08a] opacity-50" />
        <div className="absolute top-36 right-[28%] w-1.5 h-1.5 rounded-full bg-[#d4af37] opacity-60" />
      </div>

      {/* Main Introduction Content Presentation */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-2 sm:pt-6 md:pt-8 pb-4">
        
        {/* A. Small Gold Eyebrow Text: BHAVISHYA VAANI */}
        <motion.div 
          {...fadeUp(0.15)}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0d122e]/85 border border-[#d4af37]/40 shadow-inner mb-4 sm:mb-6 max-w-full"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fef08a] shrink-0" />
          <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#fef08a] font-bold">
            BHAVISHYA VAANI
          </span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fef08a] shrink-0" />
        </motion.div>

        {/* B. Main Heading: UNLOCK THE SECRETS OF YOUR DESTINY */}
        <h1 className="font-cinzel text-[26px] min-[360px]:text-[30px] min-[390px]:text-[34px] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.12] mb-5 sm:mb-6 max-w-full">
          {/* Line 1: Elegant Ivory White */}
          <motion.span 
            {...fadeUp(0.35)}
            className="text-[#f8fafc] block"
          >
            UNLOCK THE SECRETS OF
          </motion.span>
          
          {/* Line 2: Luxurious Metallic Gold with Shimmer Highlight */}
          <motion.span 
            {...fadeUp(0.6)}
            className="text-gold-shimmer block mt-0.5 sm:mt-1 drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
          >
            YOUR DESTINY
          </motion.span>
        </h1>

        {/* C. Personal Introduction */}
        <motion.div 
          {...fadeUp(0.85)}
          className="max-w-2xl sm:max-w-3xl mx-auto mb-4 sm:mb-5 px-1"
        >
          <p className="font-cormorant text-base min-[360px]:text-lg sm:text-2xl md:text-[26px] text-[#f1f5f9] leading-relaxed sm:leading-relaxed italic">
            “My name is Pt. Pawan Mishra. I am dedicated to helping people explore life's possibilities through the ancient wisdom of astrology, palmistry, and gemstone consultation.”
          </p>
        </motion.div>

        {/* D. Supporting Paragraph */}
        <motion.p 
          {...fadeUp(1.1)}
          className="text-xs min-[360px]:text-sm sm:text-base text-[#94a3b8] max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-7 px-2"
        >
          Discover your cosmic path, explore traditional astrological insights, and find guidance for life's important decisions.
        </motion.p>

        {/* E. Location Card with Soft Gold Border Glow */}
        <motion.div 
          {...fadeUp(1.35)}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#090d26]/90 border border-[#d4af37]/45 shadow-[0_0_20px_rgba(212,175,55,0.18)] mb-7 sm:mb-8 max-w-full text-left"
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
          <span className="text-[11px] min-[360px]:text-xs sm:text-sm font-medium text-slate-200">
            Mahilpur, Hoshiarpur, Punjab – 146105
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          {...fadeUp(1.55)}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-xs min-[390px]:max-w-sm sm:max-w-md mx-auto"
        >
          {/* Button 1: Explore Our Services */}
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#0c102a] hover:bg-[#141b42] border border-[#d4af37]/45 text-[#fef08a] font-cinzel font-semibold text-xs tracking-wider uppercase transition-all hover:border-[#fef08a] shadow-lg hover:shadow-[#d4af37]/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-98 min-h-[44px]"
          >
            <span>Explore Our Services</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: Book a Consultation */}
          <button
            onClick={onBookConsultation}
            className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b45309] text-[#05060f] font-cinzel font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2 group cursor-pointer min-h-[44px]"
          >
            <span>Book a Consultation</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#05060f] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* 3D Realistic Rotating Zodiac Wheel & Planetary Simulation */}
      <div className="relative w-full mt-4 sm:mt-6 overflow-hidden">
        <ZodiacCanvas />
      </div>

      {/* Subtle indicator bar beneath the hero */}
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 w-full border-t border-[#1a1f42]/60 flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
          <span>Vedic Parashari Calculations & Navagraha Alignments</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38bdf8] shrink-0" />
          <span>Traditional Shastric Ethics • No False Promises</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] shrink-0" />
          <span>Mahilpur, Punjab</span>
        </div>
      </div>
    </section>
  );
};
