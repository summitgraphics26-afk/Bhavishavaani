import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory and local disk persistence for consultation enquiries
interface ConsultationEnquiry {
  id: string;
  referenceId: string;
  fullName: string;
  mobileNumber: string;
  dateOfBirth: string;
  fullAddress: string;
  service: string;
  submittedAt: string;
  status: 'Pending Review' | 'Contacted' | 'Scheduled';
}

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'consultations.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

function loadConsultations(): ConsultationEnquiry[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading consultations file:', err);
  }
  return [];
}

function saveConsultation(enquiry: ConsultationEnquiry): boolean {
  try {
    const list = loadConsultations();
    list.push(enquiry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing consultation file:', err);
    return false;
  }
}

// API Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'Bhavishya Vaani Backend Service',
    astrologer: 'Pt. Pawan Mishra',
    location: 'Mahilpur, Hoshiarpur, Punjab – 146105',
    timestamp: new Date().toISOString()
  });
});

// POST /api/consultations
app.post('/api/consultations', (req, res) => {
  const { fullName, mobileNumber, dateOfBirth, fullAddress, service } = req.body || {};

  const errors: Record<string, string> = {};

  // 1. Full Name validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // 2. Mobile Number validation (Indian 10-digit number)
  // Strips +91, 0, spaces, hyphens
  const cleanPhone = (mobileNumber || '').toString().replace(/[\s\-\(\)\+]/g, '');
  const tenDigitRegex = /^(?:91)?[6-9]\d{9}$/;
  if (!cleanPhone || !tenDigitRegex.test(cleanPhone)) {
    errors.mobileNumber = 'Please provide a valid 10-digit Indian mobile number (+91).';
  }

  // 3. Date of Birth validation
  if (!dateOfBirth || typeof dateOfBirth !== 'string') {
    errors.dateOfBirth = 'Please select your date of birth.';
  } else {
    const parsedDate = new Date(dateOfBirth);
    if (isNaN(parsedDate.getTime()) || parsedDate > new Date()) {
      errors.dateOfBirth = 'Please provide a valid past date of birth.';
    }
  }

  // 4. Full Address validation
  if (!fullAddress || typeof fullAddress !== 'string' || fullAddress.trim().length < 5) {
    errors.fullAddress = 'Please enter your complete address for astrological locality calculation.';
  }

  // 5. Service validation
  const validServices = ['Gemstone Consultation', 'Palm Reading', 'Kundli Reading'];
  if (!service || !validServices.includes(service)) {
    errors.service = 'Please select a valid consultation service (Gemstone, Palm, or Kundli).';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      message: 'Validation failed for one or more fields.',
      errors
    });
    return;
  }

  // Format the sanitized phone with +91
  const sanitizedTenDigit = cleanPhone.slice(-10);
  const formattedPhone = `+91 ${sanitizedTenDigit}`;

  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `BV-${timestamp.toString(36).toUpperCase()}-${randomSuffix}`;

  const enquiry: ConsultationEnquiry = {
    id: `enq_${timestamp}_${randomSuffix}`,
    referenceId,
    fullName: fullName.trim(),
    mobileNumber: formattedPhone,
    dateOfBirth,
    fullAddress: fullAddress.trim(),
    service,
    submittedAt: new Date().toISOString(),
    status: 'Pending Review'
  };

  const saved = saveConsultation(enquiry);

  if (!saved) {
    res.status(500).json({
      success: false,
      message: 'Unable to save consultation enquiry to server storage. Please try again or contact directly.'
    });
    return;
  }

  // Log receipt for backend monitoring (strictly masking sensitive info in logs)
  console.log(`[Bhavishya Vaani] New consultation enquiry received: ${referenceId} for ${service} by ${fullName.trim()[0]}***`);

  // Respond with confirmation details (do NOT return or expose other users' info)
  res.status(201).json({
    success: true,
    message: 'Your consultation request has been successfully received by Pt. Pawan Mishra’s office.',
    enquiry: {
      referenceId,
      fullName: fullName.trim(),
      service,
      submittedAt: enquiry.submittedAt,
      status: 'Pending Review'
    }
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bhavishya Vaani server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
