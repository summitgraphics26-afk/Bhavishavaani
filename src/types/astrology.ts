export type AstrologyServiceType = 
  | 'Gemstone Consultation' 
  | 'Palm Reading' 
  | 'Kundli Reading';

export interface ZodiacSign {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  element: 'Fire (Agni)' | 'Earth (Prithvi)' | 'Air (Vayu)' | 'Water (Jala)';
  rulingPlanet: string;
  dates: string;
  vedicTrait: string;
  gemstone: string;
  angle: number; // in degrees around the 360 circle
}

export interface NavagrahaPlanet {
  id: string;
  name: string;
  sanskritName: string;
  symbol: string;
  color: string;
  gemstone: string;
  significance: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
}

export interface GemstoneInfo {
  id: string;
  name: string;
  sanskritName: string;
  planet: string;
  color: string;
  gradient: string;
  element: string;
  significance: string;
  metal: string;
}

export interface PalmLinesInfo {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  vedicInsight: string;
  color: string;
}

export interface KundliHouseInfo {
  houseNumber: number;
  sanskritName: string;
  meaning: string;
  areasCovered: string;
  karakaPlanet: string;
}

export interface ConsultationFormData {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  fullAddress: string;
  service: AstrologyServiceType;
}

export interface ConsultationSubmissionResponse {
  success: boolean;
  message: string;
  enquiry?: {
    referenceId: string;
    fullName: string;
    service: string;
    submittedAt: string;
    status: string;
  };
  errors?: Record<string, string>;
}
