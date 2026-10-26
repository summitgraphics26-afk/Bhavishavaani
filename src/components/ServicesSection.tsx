import React, { useState } from 'react';
import { GEMSTONES_DATA, PALM_LINES, KUNDLI_HOUSES } from '../data/astrologyData';
import { AstrologyServiceType } from '../types/astrology';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Hand, Compass, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceAndScroll: (service: AstrologyServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceAndScroll
}) => {
  // Interactive preview state for each card
  const [selectedGemIndex, setSelectedGemIndex] = useState(0);
  const [selectedPalmLineId, setSelectedPalmLineId] = useState('life-line');
  const [selectedHouseIdx, setSelectedHouseIdx] = useState(0);

  const currentGem = GEMSTONES_DATA[selectedGemIndex];
  const currentPalmLine = PALM_LINES.find(l => l.id === selectedPalmLineId) || PALM_LINES[0];
  const currentHouse = KUNDLI_HOUSES[selectedHouseIdx];

  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32 bg-[#03040c] overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/3 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#3b82f6]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#0d122e] border border-[#d4af37]/30 text-[10px] sm:text-xs text-[#d4af37] font-cinzel uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fef08a]" />
            <span>Sacred Consultations</span>
          </div>
          <h2 className="font-cinzel text-2xl min-[360px]:text-3xl sm:text-5xl font-extrabold text-[#f8fafc] mb-3 sm:mb-4">
            Astrology <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] leading-relaxed max-w-xl mx-auto">
            Three classical disciplines guided by Pt. Pawan Mishra to illuminate your cosmic blueprint, personal strengths, and life path.
          </p>
        </div>

        {/* 3 Dedicated Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* ======================================================== */}
          {/* SERVICE CARD 1: Gemstone Consultation                    */}
          {/* ======================================================== */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-[#d4af37]/60 via-[#1f244a] to-[#d4af37]/20 hover:from-[#fef08a] hover:via-[#d4af37]/70 hover:to-[#7c3aed]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/20 flex flex-col">
            <div className="h-full rounded-[15px] bg-[#070a1a] p-4 min-[360px]:p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Visual Header */}
                <div className="relative w-full h-48 sm:h-52 rounded-xl bg-gradient-to-br from-[#0c102a] to-[#040612] border border-[#d4af37]/30 overflow-hidden flex flex-col items-center justify-center p-4 mb-6">
                  {/* Subtle golden lighting behind the gem */}
                  <div className="absolute inset-0 bg-radial from-[#d4af37]/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Realistic Gemstone Graphic */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Outer golden halo */}
                      <div className="absolute inset-0 rounded-full bg-[#d4af37]/15 blur-md" />
                      
                      {/* Faceted Gemstone Shape with dynamic lighting */}
                      <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-xl">
                        {/* Facet gradients */}
                        <defs>
                          <linearGradient id="gemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                            <stop offset="25%" stopColor={currentGem.color} stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#08081a" />
                          </linearGradient>
                          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="100%" stopColor="#b45309" />
                          </linearGradient>
                        </defs>
                        {/* Cut gemstone polygon */}
                        <polygon points="30,10 70,10 90,35 50,90 10,35" fill="url(#gemGradient)" stroke="url(#goldRim)" strokeWidth="2" />
                        {/* Internal facet reflection lines */}
                        <polygon points="30,10 70,10 78,35 22,35" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        <line x1="22" y1="35" x2="50" y2="90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        <line x1="78" y1="35" x2="50" y2="90" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                        <line x1="50" y1="35" x2="50" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
                        <polygon points="10,35 22,35 50,90" fill="rgba(0,0,0,0.3)" />
                        <polygon points="90,35 78,35 50,90" fill="rgba(0,0,0,0.2)" />
                      </svg>
                    </div>

                    <div className="mt-2 text-center">
                      <span className="font-cinzel text-xs font-bold text-[#fef08a] uppercase tracking-wider block">
                        {currentGem.name} • {currentGem.sanskritName}
                      </span>
                      <span className="text-[11px] text-[#d4af37] font-medium">
                        Governing Planet: {currentGem.planet}
                      </span>
                    </div>
                  </div>

                  {/* Gemstone selector pills */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-center gap-1.5 overflow-x-auto py-1">
                    {GEMSTONES_DATA.slice(0, 5).map((gem, idx) => (
                      <button
                        key={gem.id}
                        onClick={() => setSelectedGemIndex(idx)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          selectedGemIndex === idx
                            ? 'scale-125 border-[#fef08a] shadow-sm'
                            : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: gem.color }}
                        title={`${gem.name} (${gem.sanskritName})`}
                      />
                    ))}
                  </div>
                </div>

                {/* Service Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#d4af37]/15 text-[#fef08a]">
                    <Gem className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-[#f8fafc] group-hover:text-[#fef08a] transition-colors">
                    Gemstone Consultation
                  </h3>
                </div>

                {/* EXACT REQUIRED DESCRIPTION */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Explore gemstone recommendations based on your astrological profile and traditional astrological principles.
                </p>

                {/* Additional Insight Details */}
                <div className="p-3 rounded-lg bg-[#0e122b] border border-[#1e2348] text-xs text-slate-400 space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span>Current Focus:</span>
                    <strong className="text-[#fef08a]">{currentGem.name}</strong>
                  </div>
                  <p className="text-[11px] leading-relaxed italic text-slate-300">
                    "{currentGem.significance}"
                  </p>
                  <p className="text-[10px] text-[#94a3b8]">
                    Metal: {currentGem.metal} • Energy: {currentGem.element}
                  </p>
                </div>
              </div>

              {/* Functional Enquire Now Button */}
              <button
                onClick={() => onSelectServiceAndScroll('Gemstone Consultation')}
                className="w-full py-3 rounded-xl bg-[#0e1333] hover:bg-gradient-to-r hover:from-[#d4af37] hover:to-[#b45309] text-[#fef08a] hover:text-[#05060f] font-cinzel font-bold text-xs uppercase tracking-wider border border-[#d4af37]/40 hover:border-transparent transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE CARD 2: Palm Reading                             */}
          {/* ======================================================== */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-[#38bdf8]/50 via-[#1f244a] to-[#d4af37]/30 hover:from-[#38bdf8] hover:via-[#a855f7]/70 hover:to-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#38bdf8]/20 flex flex-col">
            <div className="h-full rounded-[15px] bg-[#070a1a] p-4 min-[360px]:p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Visual Header: Sophisticated Palm Illustration */}
                <div className="relative w-full h-48 sm:h-52 rounded-xl bg-gradient-to-br from-[#0c102a] to-[#040612] border border-[#38bdf8]/30 overflow-hidden flex flex-col items-center justify-center p-3 mb-6">
                  {/* Subtle ethereal glow */}
                  <div className="absolute inset-0 bg-radial from-[#38bdf8]/15 via-transparent to-transparent pointer-events-none" />

                  {/* Sophisticated SVG Palm Diagram */}
                  <div className="relative z-10 w-full max-w-[200px] h-36 flex items-center justify-center">
                    <svg viewBox="0 0 160 140" className="w-full h-full">
                      {/* Palm Outline Hand */}
                      <path
                        d="M 40,130 C 35,100 25,75 25,60 C 25,48 35,46 42,56 C 45,61 48,72 52,78 C 50,60 50,28 58,26 C 65,24 68,36 68,54 C 68,40 70,18 78,16 C 85,14 88,26 88,48 C 90,38 94,22 102,22 C 108,22 110,34 110,56 C 114,64 120,80 120,95 C 120,120 100,135 75,135 Z"
                        fill="#0b0f2a"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                      />

                      {/* Mount of Jupiter, Sun, Saturn, Venus labels / dots */}
                      <circle cx="58" cy="65" r="2.5" fill="#fef08a" />
                      <circle cx="78" cy="60" r="2.5" fill="#60a5fa" />
                      <circle cx="98" cy="65" r="2.5" fill="#f59e0b" />
                      <circle cx="45" cy="105" r="3.5" fill="#ec4899" opacity="0.7" />

                      {/* Heart Line (Hriday Rekha) */}
                      <path
                        d="M 112,68 Q 80,72 58,62"
                        fill="none"
                        stroke={selectedPalmLineId === 'heart-line' ? '#ec4899' : 'rgba(236, 72, 153, 0.4)'}
                        strokeWidth={selectedPalmLineId === 'heart-line' ? '3.5' : '1.5'}
                        strokeLinecap="round"
                      />

                      {/* Head Line (Mastishk Rekha) */}
                      <path
                        d="M 45,78 Q 75,85 110,95"
                        fill="none"
                        stroke={selectedPalmLineId === 'head-line' ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)'}
                        strokeWidth={selectedPalmLineId === 'head-line' ? '3.5' : '1.5'}
                        strokeLinecap="round"
                      />

                      {/* Life Line (Jeevan Rekha) */}
                      <path
                        d="M 45,76 Q 60,95 62,128"
                        fill="none"
                        stroke={selectedPalmLineId === 'life-line' ? '#f59e0b' : 'rgba(245, 158, 11, 0.4)'}
                        strokeWidth={selectedPalmLineId === 'life-line' ? '3.5' : '1.5'}
                        strokeLinecap="round"
                      />

                      {/* Fate Line (Bhagya Rekha) */}
                      <path
                        d="M 75,130 L 78,65"
                        fill="none"
                        stroke={selectedPalmLineId === 'fate-line' ? '#a855f7' : 'rgba(168, 85, 247, 0.4)'}
                        strokeWidth={selectedPalmLineId === 'fate-line' ? '3.5' : '1.5'}
                        strokeLinecap="round"
                        strokeDasharray={selectedPalmLineId === 'fate-line' ? 'none' : '3,3'}
                      />
                    </svg>
                  </div>

                  {/* Line toggle pills */}
                  <div className="relative z-10 flex items-center justify-center gap-1.5 mt-1 overflow-x-auto w-full">
                    {PALM_LINES.map(line => (
                      <button
                        key={line.id}
                        onClick={() => setSelectedPalmLineId(line.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                          selectedPalmLineId === line.id
                            ? 'bg-slate-100 text-[#090d24] font-bold shadow-sm'
                            : 'bg-[#121636] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {line.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8]">
                    <Hand className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-[#f8fafc] group-hover:text-[#38bdf8] transition-colors">
                    Palm Reading
                  </h3>
                </div>

                {/* EXACT REQUIRED DESCRIPTION */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Discover traditional palmistry insights through the lines and features of your palm.
                </p>

                {/* Highlighted Line Vedic Details */}
                <div className="p-3 rounded-lg bg-[#0e122b] border border-[#1e2348] text-xs text-slate-400 space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span className="font-medium text-[#f8fafc]">{currentPalmLine.name}:</span>
                    <span className="text-[11px] text-[#38bdf8] font-cormorant font-semibold">{currentPalmLine.sanskritName}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {currentPalmLine.vedicInsight}
                  </p>
                </div>
              </div>

              {/* Functional Enquire Now Button */}
              <button
                onClick={() => onSelectServiceAndScroll('Palm Reading')}
                className="w-full py-3 rounded-xl bg-[#0e1333] hover:bg-gradient-to-r hover:from-[#38bdf8] hover:to-[#0284c7] text-[#38bdf8] hover:text-[#05060f] font-cinzel font-bold text-xs uppercase tracking-wider border border-[#38bdf8]/40 hover:border-transparent transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SERVICE CARD 3: Kundli Reading                           */}
          {/* ======================================================== */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-[#a855f7]/60 via-[#1f244a] to-[#d4af37]/30 hover:from-[#c084fc] hover:via-[#d4af37]/70 hover:to-[#ec4899]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a855f7]/20 flex flex-col">
            <div className="h-full rounded-[15px] bg-[#070a1a] p-4 min-[360px]:p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Visual Header: Beautiful Vedic Birth-Chart Diamond Kundli Graphic */}
                <div className="relative w-full h-48 sm:h-52 rounded-xl bg-gradient-to-br from-[#0c102a] to-[#040612] border border-[#a855f7]/30 overflow-hidden flex flex-col items-center justify-center p-3 mb-6">
                  {/* Subtle purple celestial glow */}
                  <div className="absolute inset-0 bg-radial from-[#a855f7]/15 via-transparent to-transparent pointer-events-none" />

                  {/* Vedic North Indian Janam Kundli Graphic */}
                  <div className="relative z-10 w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                      {/* Outer Square */}
                      <rect x="2" y="2" width="96" height="96" fill="#090d26" stroke="#d4af37" strokeWidth="1.2" />
                      {/* Inner Diamond (Houses 1, 4, 7, 10 Kendras) */}
                      <polygon points="50,2 98,50 50,98 2,50" fill="#0d1236" stroke="#d4af37" strokeWidth="1.2" />
                      {/* Diagonal Cross Lines */}
                      <line x1="2" y1="2" x2="98" y2="98" stroke="#d4af37" strokeWidth="1" />
                      <line x1="98" y1="2" x2="2" y2="98" stroke="#d4af37" strokeWidth="1" />

                      {/* Astrological Symbols in Bhavas */}
                      {/* 1st House (Lagna - Top Diamond) */}
                      <text x="50" y="26" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">1 (लग्न)</text>
                      <text x="50" y="36" textAnchor="middle" fill="#38bdf8" fontSize="7">☉ ☿</text>

                      {/* 4th House (Sukha - Left Diamond) */}
                      <text x="24" y="52" textAnchor="middle" fill="#fef08a" fontSize="7">4</text>
                      <text x="24" y="60" textAnchor="middle" fill="#f472b6" fontSize="6">☽</text>

                      {/* 7th House (Kalatra - Bottom Diamond) */}
                      <text x="50" y="75" textAnchor="middle" fill="#fef08a" fontSize="7">7</text>
                      <text x="50" y="85" textAnchor="middle" fill="#fde047" fontSize="6">♀ ♃</text>

                      {/* 10th House (Karma - Right Diamond) */}
                      <text x="76" y="52" textAnchor="middle" fill="#fef08a" fontSize="7">10</text>
                      <text x="76" y="60" textAnchor="middle" fill="#60a5fa" fontSize="6">♄</text>

                      {/* Corner Trikona Houses */}
                      <text x="24" y="22" textAnchor="middle" fill="#94a3b8" fontSize="6">2</text>
                      <text x="76" y="22" textAnchor="middle" fill="#94a3b8" fontSize="6">12</text>
                      <text x="24" y="85" textAnchor="middle" fill="#94a3b8" fontSize="6">5</text>
                      <text x="76" y="85" textAnchor="middle" fill="#94a3b8" fontSize="6">9</text>
                    </svg>
                  </div>

                  {/* House selector pills */}
                  <div className="relative z-10 flex items-center justify-center gap-1.5 mt-1 overflow-x-auto w-full">
                    {KUNDLI_HOUSES.map((h, idx) => (
                      <button
                        key={h.houseNumber}
                        onClick={() => setSelectedHouseIdx(idx)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                          selectedHouseIdx === idx
                            ? 'bg-[#a855f7] text-white font-bold shadow-sm'
                            : 'bg-[#121636] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        H-{h.houseNumber}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Title */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-[#a855f7]/15 text-[#c084fc]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-[#f8fafc] group-hover:text-[#c084fc] transition-colors">
                    Kundli Reading
                  </h3>
                </div>

                {/* EXACT REQUIRED DESCRIPTION */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Explore your Kundli and gain traditional astrological insights into important areas of your life.
                </p>

                {/* Highlighted House Vedic Details */}
                <div className="p-3 rounded-lg bg-[#0e122b] border border-[#1e2348] text-xs text-slate-400 space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-[#cbd5e1]">
                    <span className="font-medium text-[#f8fafc]">House {currentHouse.houseNumber}: {currentHouse.sanskritName}</span>
                    <span className="text-[11px] text-[#a855f7] font-semibold">{currentHouse.meaning}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {currentHouse.areasCovered}
                  </p>
                  <p className="text-[10px] text-[#94a3b8]">
                    Karaka: {currentHouse.karakaPlanet}
                  </p>
                </div>
              </div>

              {/* Functional Enquire Now Button */}
              <button
                onClick={() => onSelectServiceAndScroll('Kundli Reading')}
                className="w-full py-3 rounded-xl bg-[#0e1333] hover:bg-gradient-to-r hover:from-[#a855f7] hover:to-[#7c3aed] text-[#c084fc] hover:text-white font-cinzel font-bold text-xs uppercase tracking-wider border border-[#a855f7]/40 hover:border-transparent transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Quality assurance banner */}
        <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0c102c] via-[#101438] to-[#0c102c] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#fef08a] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-cinzel text-sm font-bold text-[#f8fafc]">Personalized Consultation by Pt. Pawan Mishra</p>
              <p className="text-xs text-slate-400">All queries are evaluated individually with Vedic calculations. Privacy is guaranteed.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectServiceAndScroll('Kundli Reading')}
            className="px-5 py-2 rounded-lg bg-[#d4af37] text-[#04050e] font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex-shrink-0"
          >
            Start Enquiry
          </button>
        </div>
      </div>
    </section>
  );
};
