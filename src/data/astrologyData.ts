import { ZodiacSign, NavagrahaPlanet, GemstoneInfo, PalmLinesInfo, KundliHouseInfo } from '../types/astrology';

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    sanskritName: 'Mesha (मेष)',
    symbol: '♈',
    element: 'Fire (Agni)',
    rulingPlanet: 'Mangala (Mars)',
    dates: 'Apr 14 – May 14',
    vedicTrait: 'Dynamic courage, pioneering energy, leadership and vitality',
    gemstone: 'Red Coral (Moonga)',
    angle: 0
  },
  {
    id: 'taurus',
    name: 'Taurus',
    sanskritName: 'Vrishabha (वृषभ)',
    symbol: '♉',
    element: 'Earth (Prithvi)',
    rulingPlanet: 'Shukra (Venus)',
    dates: 'May 15 – Jun 14',
    vedicTrait: 'Steadfast perseverance, aesthetic grace, material stability',
    gemstone: 'Diamond (Heera) / White Zircon',
    angle: 30
  },
  {
    id: 'gemini',
    name: 'Gemini',
    sanskritName: 'Mithuna (मिथुन)',
    symbol: '♊',
    element: 'Air (Vayu)',
    rulingPlanet: 'Budha (Mercury)',
    dates: 'Jun 15 – Jul 15',
    vedicTrait: 'Eloquent intellect, analytical versatility, swift communication',
    gemstone: 'Emerald (Panna)',
    angle: 60
  },
  {
    id: 'cancer',
    name: 'Cancer',
    sanskritName: 'Karka (कर्क)',
    symbol: '♋',
    element: 'Water (Jala)',
    rulingPlanet: 'Chandra (Moon)',
    dates: 'Jul 16 – Aug 16',
    vedicTrait: 'Nurturing intuition, emotional depth, protective wisdom',
    gemstone: 'Pearl (Moti)',
    angle: 90
  },
  {
    id: 'leo',
    name: 'Leo',
    sanskritName: 'Simha (सिंह)',
    symbol: '♌',
    element: 'Fire (Agni)',
    rulingPlanet: 'Surya (Sun)',
    dates: 'Aug 17 – Sep 16',
    vedicTrait: 'Sovereign charisma, generosity, righteous determination',
    gemstone: 'Ruby (Manikya)',
    angle: 120
  },
  {
    id: 'virgo',
    name: 'Virgo',
    sanskritName: 'Kanya (कन्या)',
    symbol: '♍',
    element: 'Earth (Prithvi)',
    rulingPlanet: 'Budha (Mercury)',
    dates: 'Sep 17 – Oct 16',
    vedicTrait: 'Discriminating precision, healing service, practical foresight',
    gemstone: 'Emerald (Panna)',
    angle: 150
  },
  {
    id: 'libra',
    name: 'Libra',
    sanskritName: 'Tula (तुला)',
    symbol: '♎',
    element: 'Air (Vayu)',
    rulingPlanet: 'Shukra (Venus)',
    dates: 'Oct 17 – Nov 15',
    vedicTrait: 'Harmonious diplomacy, justice, refinement, balanced judgment',
    gemstone: 'White Sapphire / Opal',
    angle: 180
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    sanskritName: 'Vrischika (वृश्चिक)',
    symbol: '♏',
    element: 'Water (Jala)',
    rulingPlanet: 'Mangala (Mars)',
    dates: 'Nov 16 – Dec 15',
    vedicTrait: 'Transformational depth, intense resilience, spiritual mysteries',
    gemstone: 'Red Coral (Moonga)',
    angle: 210
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    sanskritName: 'Dhanu (धनु)',
    symbol: '♐',
    element: 'Fire (Agni)',
    rulingPlanet: 'Guru (Jupiter)',
    dates: 'Dec 16 – Jan 13',
    vedicTrait: 'Higher philosophical truth, righteousness (Dharma), optimism',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    angle: 240
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    sanskritName: 'Makara (मकर)',
    symbol: '♑',
    element: 'Earth (Prithvi)',
    rulingPlanet: 'Shani (Saturn)',
    dates: 'Jan 14 – Feb 12',
    vedicTrait: 'Disciplined mastery, enduring patience, structural mastery',
    gemstone: 'Blue Sapphire (Neelam)',
    angle: 270
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    sanskritName: 'Kumbha (कुम्भ)',
    symbol: '♒',
    element: 'Air (Vayu)',
    rulingPlanet: 'Shani (Saturn)',
    dates: 'Feb 13 – Mar 13',
    vedicTrait: 'Visionary humanitarianism, collective evolution, detachment',
    gemstone: 'Blue Sapphire (Neelam)',
    angle: 300
  },
  {
    id: 'pisces',
    name: 'Pisces',
    sanskritName: 'Meena (मीन)',
    symbol: '♓',
    element: 'Water (Jala)',
    rulingPlanet: 'Guru (Jupiter)',
    dates: 'Mar 14 – Apr 13',
    vedicTrait: 'Compassionate transcendence, spiritual devotion, timeless wisdom',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    angle: 330
  }
];

export const NAVAGRAHAS: NavagrahaPlanet[] = [
  {
    id: 'sun',
    name: 'Sun',
    sanskritName: 'Surya (सूर्य)',
    symbol: '☉',
    color: '#ffaa33',
    gemstone: 'Ruby (Manik)',
    significance: 'Soul (Atman), vitality, father, government, self-illumination',
    orbitRadius: 0,
    orbitSpeed: 0,
    size: 1.4
  },
  {
    id: 'mercury',
    name: 'Mercury',
    sanskritName: 'Budha (बुध)',
    symbol: '☿',
    color: '#34d399',
    gemstone: 'Emerald (Panna)',
    significance: 'Intellect (Buddhi), trade, speech, logic, analytical discernment',
    orbitRadius: 3.2,
    orbitSpeed: 0.8,
    size: 0.35
  },
  {
    id: 'venus',
    name: 'Venus',
    sanskritName: 'Shukra (शुक्र)',
    symbol: '♀',
    color: '#fef08a',
    gemstone: 'Diamond (Heera)',
    significance: 'Refinement, relationships, creativity, luxury, sensual harmony',
    orbitRadius: 4.8,
    orbitSpeed: 0.55,
    size: 0.5
  },
  {
    id: 'moon',
    name: 'Moon',
    sanskritName: 'Chandra (चन्द्र)',
    symbol: '☽',
    color: '#e2e8f0',
    gemstone: 'Natural Pearl (Moti)',
    significance: 'Mind (Manas), emotions, mother, mental serenity, intuitive flow',
    orbitRadius: 6.4,
    orbitSpeed: 0.45,
    size: 0.42
  },
  {
    id: 'mars',
    name: 'Mars',
    sanskritName: 'Mangala (मंगल)',
    symbol: '♂',
    color: '#ef4444',
    gemstone: 'Red Coral (Moonga)',
    significance: 'Willpower, vitality, property, brothers, courageous action',
    orbitRadius: 8.0,
    orbitSpeed: 0.35,
    size: 0.45
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    sanskritName: 'Guru / Brihaspati (गुरु)',
    symbol: '♃',
    color: '#fbbf24',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    significance: 'Wisdom (Jnana), divine grace, progeny, dharma, prosperity',
    orbitRadius: 10.2,
    orbitSpeed: 0.22,
    size: 0.95
  },
  {
    id: 'saturn',
    name: 'Saturn',
    sanskritName: 'Shani (शनि)',
    symbol: '♄',
    color: '#60a5fa',
    gemstone: 'Blue Sapphire (Neelam)',
    significance: 'Karma, discipline, longevity, patience, justice, detachment',
    orbitRadius: 12.8,
    orbitSpeed: 0.15,
    size: 0.8
  }
];

export const GEMSTONES_DATA: GemstoneInfo[] = [
  {
    id: 'ruby',
    name: 'Ruby',
    sanskritName: 'Manikya (माणिक्य)',
    planet: 'Surya (Sun)',
    color: '#dc2626',
    gradient: 'from-rose-500 via-red-600 to-amber-700',
    element: 'Fire',
    significance: 'Invigorates leadership, cosmic vitality, confidence and administrative respect.',
    metal: 'Gold or Copper'
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire',
    sanskritName: 'Pukhraj (पुखराज)',
    planet: 'Brihaspati / Guru (Jupiter)',
    color: '#eab308',
    gradient: 'from-amber-200 via-yellow-400 to-amber-600',
    element: 'Ether (Akasha)',
    significance: 'Channels divine grace, higher learning, auspicious fortune and spiritual clarity.',
    metal: 'Pure Gold'
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire',
    sanskritName: 'Neelam (नीलम)',
    planet: 'Shani (Saturn)',
    color: '#2563eb',
    gradient: 'from-sky-400 via-blue-700 to-indigo-950',
    element: 'Air / Space',
    significance: 'Potent gemstone for karmic discipline, immense focus, focus and rapid elevation.',
    metal: 'White Gold, Silver, or Ashtadhatu'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    sanskritName: 'Panna (पन्ना)',
    planet: 'Budha (Mercury)',
    color: '#10b981',
    gradient: 'from-emerald-300 via-emerald-600 to-teal-900',
    element: 'Earth',
    significance: 'Enhances communication, commerce acumen, memory recall and intellectual speed.',
    metal: 'Gold or Bronze'
  },
  {
    id: 'pearl',
    name: 'Natural Pearl',
    sanskritName: 'Moti (मोती)',
    planet: 'Chandra (Moon)',
    color: '#f8fafc',
    gradient: 'from-slate-100 via-zinc-200 to-slate-400',
    element: 'Water',
    significance: 'Bestows deep mental calmness, emotional harmony, and soothing psychological peace.',
    metal: 'Pure Silver'
  },
  {
    id: 'red-coral',
    name: 'Red Coral',
    sanskritName: 'Moonga (मूँगा)',
    planet: 'Mangala (Mars)',
    color: '#ea580c',
    gradient: 'from-orange-400 via-red-500 to-rose-800',
    element: 'Fire / Earth',
    significance: 'Fortifies physical endurance, decisive courage, and protection against lethargy.',
    metal: 'Copper or Gold'
  }
];

export const PALM_LINES: PalmLinesInfo[] = [
  {
    id: 'life-line',
    name: 'Life Line',
    sanskritName: 'Jeevan Rekha (जीवन रेखा)',
    description: 'Curves around the base of the thumb (Mount of Venus).',
    vedicInsight: 'Indicates fundamental vitality, constitution strength, key life transitions, and physical endurance rather than mere calendar lifespan.',
    color: '#f59e0b'
  },
  {
    id: 'head-line',
    name: 'Head Line',
    sanskritName: 'Mastishk Rekha (मस्तिष्क रेखा)',
    description: 'Traverses horizontally across the center of the palm.',
    vedicInsight: 'Reflects mental aptitude, intellectual philosophy, analytical clarity, decision-making style, and concentration depth.',
    color: '#38bdf8'
  },
  {
    id: 'heart-line',
    name: 'Heart Line',
    sanskritName: 'Hriday Rekha (हृदय रेखा)',
    description: 'Runs horizontally across the upper palm just beneath the fingers.',
    vedicInsight: 'Reveals emotional maturity, relational devotion, empathy, heart health, and how one experiences spiritual affection.',
    color: '#ec4899'
  },
  {
    id: 'fate-line',
    name: 'Fate / Destiny Line',
    sanskritName: 'Bhagya Rekha (भाग्य रेखा)',
    description: 'Ascends vertically from the wrist or palm base towards the Mount of Saturn.',
    vedicInsight: 'Governs karmic vocation, career momentum, financial epochs, and the timing of self-directed destiny vs external circumstances.',
    color: '#a855f7'
  }
];

export const KUNDLI_HOUSES: KundliHouseInfo[] = [
  {
    houseNumber: 1,
    sanskritName: 'Lagna Bhava (Tanu)',
    meaning: 'House of Self & Ascendant',
    areasCovered: 'Physical body, personality, general vitality, constitution and life orientation.',
    karakaPlanet: 'Surya (Sun)'
  },
  {
    houseNumber: 2,
    sanskritName: 'Dhana Bhava',
    meaning: 'House of Wealth & Family',
    areasCovered: 'Accumulated wealth, family lineage, speech, nutrition and traditional values.',
    karakaPlanet: 'Guru (Jupiter)'
  },
  {
    houseNumber: 4,
    sanskritName: 'Sukha / Matru Bhava',
    meaning: 'House of Comforts & Mother',
    areasCovered: 'Inner peace, property, vehicles, education foundations, and maternal bonds.',
    karakaPlanet: 'Chandra (Moon)'
  },
  {
    houseNumber: 7,
    sanskritName: 'Kalatra / Yuvati Bhava',
    meaning: 'House of Partnerships',
    areasCovered: 'Spouse, marriage compatibility, business alliances and public interactions.',
    karakaPlanet: 'Shukra (Venus)'
  },
  {
    houseNumber: 9,
    sanskritName: 'Dharma / Bhagya Bhava',
    meaning: 'House of Fortune & Higher Wisdom',
    areasCovered: 'Destiny, spiritual preceptor (Guru), pilgrimage, righteousness and higher philosophy.',
    karakaPlanet: 'Guru & Surya'
  },
  {
    houseNumber: 10,
    sanskritName: 'Karma Bhava',
    meaning: 'House of Profession & Legacy',
    areasCovered: 'Career accomplishments, authority, reputation, actions in the world and social prestige.',
    karakaPlanet: 'Budha, Surya, Shani'
  }
];
