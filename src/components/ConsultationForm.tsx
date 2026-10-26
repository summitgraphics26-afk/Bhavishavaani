import React, { useState } from 'react';
import { AstrologyServiceType, ConsultationFormData } from '../types/astrology';
import { 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Loader2, 
  RotateCcw,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ConsultationFormProps {
  selectedService: AstrologyServiceType;
  onServiceChange: (service: AstrologyServiceType) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  selectedService,
  onServiceChange
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    fullAddress: '',
    service: selectedService
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    fullName: string;
    service: string;
    submittedAt: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync prop changes into state
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  // Client-side Validation function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter at least 2 characters for your name.';
    }

    // 2. Mobile Number (Indian +91)
    const rawNumber = formData.mobileNumber.replace(/[\s\-\(\)\+]/g, '');
    const tenDigits = rawNumber.startsWith('91') ? rawNumber.slice(2) : rawNumber;
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!indianPhoneRegex.test(tenDigits)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    // 3. Date of Birth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required.';
    } else {
      const dobDate = new Date(formData.dateOfBirth);
      const today = new Date();
      if (isNaN(dobDate.getTime()) || dobDate >= today) {
        newErrors.dateOfBirth = 'Please select a valid past date of birth.';
      }
    }

    // 4. Full Address
    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Full address is required.';
    } else if (formData.fullAddress.trim().length < 6) {
      newErrors.fullAddress = 'Please provide a complete address (minimum 6 characters).';
    }

    // 5. Select a Service
    const validServices: AstrologyServiceType[] = [
      'Gemstone Consultation',
      'Palm Reading',
      'Kundli Reading'
    ];
    if (!formData.service || !validServices.includes(formData.service)) {
      newErrors.service = 'Please select an astrology service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'service') {
      onServiceChange(value as AstrologyServiceType);
    }

    // Clear specific field error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Prevent duplicate submission if already in progress or already submitted
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to genuine working backend API
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionSuccess(data.enquiry);
        setServerError(null);
      } else {
        // Handle server validation or integration failure
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message || 'The server could not process the consultation request. Please check the fields and try again.'
        );
      }
    } catch (err) {
      console.error('Submission network error:', err);
      setServerError(
        'Unable to reach backend service. Please check your network connection or try again shortly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      dateOfBirth: '',
      fullAddress: '',
      service: 'Kundli Reading'
    });
    setErrors({});
    setSubmissionSuccess(null);
    setServerError(null);
  };

  return (
    <section id="consultation" className="relative py-16 sm:py-24 md:py-32 bg-[#04050d] border-t border-[#181d3d] overflow-hidden">
      {/* Ambient Celestial Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[450px] bg-gradient-to-b from-[#d4af37]/10 via-[#7c3aed]/10 to-transparent blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subtitle (Exact User Prompt Specification) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#0d122e] border border-[#d4af37]/35 text-[10px] sm:text-xs text-[#d4af37] font-cinzel uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fef08a]" />
            <span>Direct Guidance with Pt. Pawan Mishra</span>
          </div>

          {/* Heading */}
          <h2 className="font-cinzel text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] mb-3 sm:mb-4">
            Book Your <span className="text-gold-gradient">Personal Consultation</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-[#cbd5e1] leading-relaxed max-w-xl mx-auto">
            Share your details with Pt. Pawan Mishra to enquire about your preferred astrology service.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#d4af37]/60 via-[#262c5c] to-[#d4af37]/30 shadow-2xl shadow-black/80">
          <div className="rounded-[15px] bg-[#070919] p-4 min-[360px]:p-6 sm:p-10 md:p-12">
            
            {/* SUCCESS STATE */}
            {submissionSuccess ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#10b981]/20 border border-[#10b981]/50 flex items-center justify-center text-[#34d399] shadow-lg shadow-[#10b981]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                    Enquiry Confirmed
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#f8fafc]">
                    Consultation Request Successfully Received
                  </h3>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#fef08a]">{submissionSuccess.fullName}</strong>. Your enquiry for <strong className="text-[#d4af37]">{submissionSuccess.service}</strong> has been registered with Pt. Pawan Mishra’s office in Mahilpur, Punjab.
                  </p>
                </div>

                {/* Reference ID Badge */}
                <div className="max-w-md mx-auto p-4 rounded-xl bg-[#0d1230] border border-[#d4af37]/40 flex flex-col items-center justify-center gap-1 shadow-inner">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">Your Booking Reference ID</span>
                  <span className="font-cinzel font-black text-lg sm:text-xl text-[#fef08a] tracking-widest select-all">
                    {submissionSuccess.referenceId}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#38bdf8] mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Response timeframe: Within 24–48 working hours</span>
                  </div>
                </div>

                {/* Important Next Steps Guidance */}
                <div className="max-w-lg mx-auto text-left p-4 rounded-xl bg-[#090d24] border border-[#1e2348] text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-[#fef08a] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>What Happens Next?</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Pt. Pawan Mishra will review your birth date and planetary alignment requirements.</li>
                    <li>His office will connect directly via your submitted phone number (+91) to schedule the slot.</li>
                    <li>If choosing Kundli Reading, please keep your exact birth time (hours:minutes) and place handy.</li>
                  </ul>
                </div>

                {/* Action button to submit another or reset */}
                <div className="pt-4">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#121738] hover:bg-[#1a214e] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Submit Another Consultation Request</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE FORM INPUTS */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Server Error Alert Banner */}
                {serverError && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-300">Submission Error</p>
                      <p className="mt-0.5 text-red-200/90">{serverError}</p>
                    </div>
                  </div>
                )}

                {/* Field 1: Full Name — required text input */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2 flex items-center gap-1.5 font-cinzel">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>1. Full Name <span className="text-red-400">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Vikramaditya Sharma"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-[#090d24] border text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-500'
                          : 'border-[#262c57] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Mobile Number — required phone input with India (+91) country code */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2 flex items-center gap-1.5 font-cinzel">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>2. Mobile Number (India +91) <span className="text-red-400">*</span></span>
                  </label>
                  <div className="relative flex rounded-xl overflow-hidden border border-[#262c57] focus-within:border-[#d4af37] focus-within:ring-1 focus-within:ring-[#d4af37]">
                    {/* Fixed India Prefix Tag */}
                    <div className="px-2.5 sm:px-3.5 py-3 bg-[#111638] border-r border-[#262c57] text-xs font-bold text-[#fef08a] flex items-center gap-1 sm:gap-1.5 select-none shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength={14}
                      disabled={isSubmitting}
                      className={`w-full min-w-0 px-3 sm:px-4 py-3 bg-[#090d24] text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none ${
                        errors.mobileNumber ? 'border-red-500 bg-red-950/10' : ''
                      }`}
                    />
                  </div>
                  {errors.mobileNumber ? (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.mobileNumber}</span>
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Enter your 10-digit mobile number for appointment confirmation.
                    </p>
                  )}
                </div>

                {/* Field 3: Date of Birth — required date picker */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2 flex items-center gap-1.5 font-cinzel">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>3. Date of Birth <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-[#090d24] border text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none transition-colors [color-scheme:dark] ${
                      errors.dateOfBirth
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#262c57] focus:border-[#d4af37]'
                    }`}
                  />
                  {errors.dateOfBirth ? (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.dateOfBirth}</span>
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Crucial for accurate Janam Kundli and Graha Dasha calculations.
                    </p>
                  )}
                </div>

                {/* Field 4: Full Address — required multiline text area */}
                <div>
                  <label htmlFor="fullAddress" className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2 flex items-center gap-1.5 font-cinzel">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>4. Full Address <span className="text-red-400">*</span></span>
                  </label>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    rows={3}
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    placeholder="House/Street, Locality, City, State, PIN code (e.g. Model Town, Hoshiarpur, Punjab – 146001)"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-[#090d24] border text-sm text-[#f8fafc] placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.fullAddress
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#262c57] focus:border-[#d4af37]'
                    }`}
                  />
                  {errors.fullAddress ? (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.fullAddress}</span>
                    </p>
                  ) : (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Required for geographic latitude/longitude chart rectification and correspondence.
                    </p>
                  )}
                </div>

                {/* Field 5: Select a Service — dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#cbd5e1] mb-2 flex items-center gap-1.5 font-cinzel">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>5. Select a Service <span className="text-red-400">*</span></span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl bg-[#090d24] border border-[#262c57] text-sm text-[#f8fafc] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Gemstone Consultation" className="bg-[#090d24] text-white">
                        Gemstone Consultation
                      </option>
                      <option value="Palm Reading" className="bg-[#090d24] text-white">
                        Palm Reading
                      </option>
                      <option value="Kundli Reading" className="bg-[#090d24] text-white">
                        Kundli Reading
                      </option>
                    </select>
                    {/* Custom Dropdown Chevron */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.service}</span>
                    </p>
                  )}
                </div>

                {/* Prominent Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b45309] text-[#05060f] font-cinzel font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#d4af37]/25 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#05060f]" />
                        <span>Sending Consultation Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#05060f]" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Short Privacy Note (Exact Requirement) */}
                <div className="pt-2 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
                  <Lock className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-slate-300">Privacy Note:</strong> Submitted information will be used exclusively by Pt. Pawan Mishra to respond to your consultation enquiry. Your details remain strictly private and will never be shared or displayed publicly.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
