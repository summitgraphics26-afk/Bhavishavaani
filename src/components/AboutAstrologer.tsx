import React from 'react';
import { MapPin, BookOpen, Sparkles, Compass, Shield, Award, CheckCircle2 } from 'lucide-react';

export const AboutAstrologer: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-28 bg-[#04050f] border-t border-[#161a38] overflow-hidden">
      {/* Background Sacred Geometry Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#7c3aed]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#0d122e] border border-[#d4af37]/30 text-[10px] sm:text-xs text-[#d4af37] font-cinzel uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fef08a]" />
            <span>Traditional Vedic Scholar</span>
          </div>
          <h2 className="font-cinzel text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] mb-3 sm:mb-4">
            Introduction to <span className="text-gold-gradient">Pt. Pawan Mishra</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] leading-relaxed max-w-xl mx-auto">
            Preserving classical Vedic Jyotish and authentic traditional consultations from Mahilpur, Punjab.
          </p>
        </div>

        {/* Profile & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Traditional Spiritual Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Ornate Gold Border Frame */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#d4af37] via-[#7c3aed]/40 to-[#d4af37]/60 shadow-2xl shadow-[#d4af37]/10">
                <div className="rounded-[15px] bg-[#080b1c] p-4 min-[360px]:p-6 sm:p-8 flex flex-col items-center text-center">
                  {/* Sacred Yantra Emblem */}
                  <div className="relative w-20 h-20 min-[360px]:w-24 min-[360px]:h-24 sm:w-28 sm:h-28 mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-[#d4af37]/20 via-[#1e1b4b] to-[#0b0f2a] border border-[#d4af37]/60 flex items-center justify-center shadow-inner shrink-0">
                    <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-dashed border-[#d4af37]/40 animate-[spin_60s_linear_infinite]" />
                    <span className="font-cinzel text-2xl min-[360px]:text-3xl sm:text-4xl text-[#fef08a] font-bold">卐</span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f8fafc] mb-1">
                    Pt. Pawan Mishra
                  </h3>
                  <p className="text-[10px] min-[360px]:text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-4">
                    Vedic Astrologer & Gemstone Consultant
                  </p>

                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-4 sm:mb-5" />

                  <p className="font-cormorant text-sm min-[360px]:text-base sm:text-lg text-slate-300 italic mb-5 sm:mb-6 leading-relaxed">
                    “Astrology is neither fate nor superstition—it is the timeless science of understanding cosmic rhythms and aligning human intention with universal harmony.”
                  </p>

                  {/* Location card */}
                  <div className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-[#0e1333] border border-[#23295c] flex items-center gap-2.5 sm:gap-3 text-left">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Consultation Center</p>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#f8fafc] truncate">
                        Mahilpur, Hoshiarpur, Punjab – 146105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Background & Authentic Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-[#090d24]/80 border border-[#1e2554] shadow-lg">
              <h3 className="font-cinzel text-xl font-bold text-[#fef08a] mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#d4af37]" />
                <span>The Ancient Shastric Tradition</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Pt. Pawan Mishra has dedicated his life to the deep study of classical Vedic texts—including the <strong className="text-slate-100">Brihat Parashara Hora Shastra</strong>, <strong className="text-slate-100">Jaimini Upadesha Sutras</strong>, and traditional Indian Palmistry (<strong className="text-slate-100">Hastarekha Shastra</strong>).
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than offering generic horoscope forecasts, consultations are conducted with rigorous mathematical calculation of planetary longitudes, Vimshottari Dasha periods, and individual planetary strengths (<strong className="text-slate-100">Shadbala</strong>).
              </p>
            </div>

            {/* Core Values / Ethics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#090d24]/60 border border-[#1e2554] hover:border-[#d4af37]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <Shield className="w-4 h-4 text-[#d4af37]" />
                  <h4 className="font-cinzel font-semibold text-sm text-[#f8fafc]">Authentic Guidance</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Honest and practical counsel without exploiting anxieties. Traditional insights designed to give clarity and inner composure.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#090d24]/60 border border-[#1e2554] hover:border-[#d4af37]/40 transition-colors">
                <div className="flex items-center gap-2.5 mb-2">
                  <Award className="w-4 h-4 text-[#38bdf8]" />
                  <h4 className="font-cinzel font-semibold text-sm text-[#f8fafc]">Precise Jyotish Math</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Exact degrees, divisional charts (D-1 to D-9 Navamsha), and transit timing (Gochar) examined with comprehensive care.
                </p>
              </div>
            </div>

            {/* Ethical Stance Note */}
            <div className="p-4 rounded-xl bg-[#0c102a] border-l-2 border-[#d4af37] text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Our Consultation Ethos:</p>
              <p>
                We do not claim magical shortcuts or guaranteed fortunes. Vedic astrology acts as a celestial lighthouse to understand timing, natural temperament, and karmic predispositions, supporting your conscious discernment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
