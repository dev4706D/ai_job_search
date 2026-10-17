import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getRepoRoot() {
  const parent = path.resolve(process.cwd(), '..');
  if (fs.existsSync(path.join(parent, 'CLAUDE.md'))) {
    return parent;
  }
  return process.cwd();
}

export interface ApplicationRecord {
  id: string;
  date: string;
  company: string;
  sector: string;
  role: string;
  role_type: string;
  channel: string;
  status: 'drafted' | 'applied' | 'interview' | 'offer' | 'hired' | 'rejected' | 'no_response';
  contact_person: string;
  fit_rating: string;
  notes: string;
  cv_file: string;
  cover_letter_file: string;
  source: string;
  deadline: string;
}

const DEFAULT_SAMPLE_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-1',
    date: '2026-10-14',
    company: 'Sarvam AI',
    sector: 'Conversational & Voice AI',
    role: 'AI Voice & Full Stack Engineer',
    role_type: 'Full-time',
    channel: 'LinkedIn',
    status: 'interview',
    contact_person: 'Talent Acquisition Team',
    fit_rating: '96%',
    notes: '2nd round technical interview scheduled. Focus on real-time WebSockets audio streaming, low-latency STT/TTS pipelines, and Weeber architecture.',
    cv_file: 'cv/main_sarvam_voice_ai.pdf',
    cover_letter_file: 'cover_letters/cover_sarvam_voice_ai.pdf',
    source: 'https://sarvam.ai/careers',
    deadline: '2026-10-28'
  },
  {
    id: 'app-2',
    date: '2026-10-11',
    company: 'Zomato / Blinkit',
    sector: 'Quick Commerce / High-Scale Web',
    role: 'Full Stack Developer - Next.js & Node.js',
    role_type: 'Hybrid (Gurugram)',
    channel: 'Direct / Portal',
    status: 'interview',
    contact_person: 'Pooja Sharma (Tech Recruiter)',
    fit_rating: '94%',
    notes: 'Technical assessment passed. Discussing CRM lead allocation algorithms and high-throughput order workflows.',
    cv_file: 'cv/main_zomato_fullstack.pdf',
    cover_letter_file: 'cover_letters/cover_zomato_fullstack.pdf',
    source: 'https://zomato.com/careers',
    deadline: '2026-10-24'
  },
  {
    id: 'app-3',
    date: '2026-10-07',
    company: 'Razorpay',
    sector: 'FinTech / Payments Infrastructure',
    role: 'Full Stack Engineer - Merchant Platform',
    role_type: 'Full-time',
    channel: 'Referral',
    status: 'offer',
    contact_person: 'Anil Verma (Engineering Manager)',
    fit_rating: '93%',
    notes: 'Offer letter received! Deep discussion on past Razorpay payment gateway integration, webhook signature verification, and automated refunds.',
    cv_file: 'cv/main_razorpay_dev.pdf',
    cover_letter_file: 'cover_letters/cover_razorpay_dev.pdf',
    source: 'https://razorpay.com/jobs',
    deadline: '2026-10-20'
  },
  {
    id: 'app-4',
    date: '2026-10-04',
    company: 'Urban Company',
    sector: 'On-Demand Services Marketplace',
    role: 'Mobile Engineer - React Native',
    role_type: 'Hybrid (Gurugram)',
    channel: 'Naukri',
    status: 'applied',
    contact_person: 'Engineering Hiring Team',
    fit_rating: '90%',
    notes: 'Submitted tailored application highlighting Shobhnam live Play Store app and slot-hold booking concurrency engine.',
    cv_file: 'cv/main_urbancompany_mobile.pdf',
    cover_letter_file: 'cover_letters/cover_urbancompany_mobile.pdf',
    source: 'https://urbancompany.com/careers',
    deadline: '2026-10-31'
  },
  {
    id: 'app-5',
    date: '2026-09-29',
    company: 'Vercel',
    sector: 'Cloud & Developer Experience',
    role: 'Full Stack AI Developer (Next.js & AI SDK)',
    role_type: 'Remote',
    channel: 'FreeHire',
    status: 'drafted',
    contact_person: 'Global Talent Team',
    fit_rating: '95%',
    notes: 'Tailored CV & Cover Letter prepared highlighting Next.js SSR/SSG, Vercel AI Gateway, and multi-tenant voice SaaS.',
    cv_file: 'cv/main_vercel_fullstack.tex',
    cover_letter_file: 'cover_letters/cover_vercel_fullstack.tex',
    source: 'https://freehire.me/jobs/vercel-ai-dev',
    deadline: '2026-11-05'
  }
];

export async function GET() {
  try {
    const root = getRepoRoot();
    const trackerPath = path.join(root, 'job_search_tracker.csv');

    if (!fs.existsSync(trackerPath)) {
      return NextResponse.json({
        applications: DEFAULT_SAMPLE_APPLICATIONS,
        isDemo: true,
        total: DEFAULT_SAMPLE_APPLICATIONS.length
      });
    }

    const fileContent = fs.readFileSync(trackerPath, 'utf8').trim();
    if (!fileContent) {
      return NextResponse.json({
        applications: DEFAULT_SAMPLE_APPLICATIONS,
        isDemo: true,
        total: DEFAULT_SAMPLE_APPLICATIONS.length
      });
    }

    const lines = fileContent.split('\n').filter(line => line.trim().length > 0);
    // Header check
    const dataLines = lines.slice(1);
    const applications: ApplicationRecord[] = dataLines.map((line, idx) => {
      // Basic CSV parser
      const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      return {
        id: `csv-${idx}`,
        date: parts[0] || '',
        company: parts[1] || 'Unknown Company',
        sector: parts[2] || 'Tech',
        role: parts[3] || 'Role',
        role_type: parts[4] || 'Full-time',
        channel: parts[5] || 'Online',
        status: (parts[6] || 'applied') as ApplicationRecord['status'],
        contact_person: parts[7] || '',
        fit_rating: parts[8] || '85%',
        notes: parts[9] || '',
        cv_file: parts[10] || '',
        cover_letter_file: parts[11] || '',
        source: parts[12] || '',
        deadline: parts[13] || ''
      };
    });

    return NextResponse.json({
      applications: applications.length > 0 ? applications : DEFAULT_SAMPLE_APPLICATIONS,
      isDemo: applications.length === 0,
      total: applications.length > 0 ? applications.length : DEFAULT_SAMPLE_APPLICATIONS.length
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const root = getRepoRoot();
    const trackerPath = path.join(root, 'job_search_tracker.csv');
    const newApp: Partial<ApplicationRecord> = await req.json();

    const date = newApp.date || new Date().toISOString().split('T')[0];
    const company = newApp.company || 'Unknown';
    const sector = newApp.sector || 'General';
    const role = newApp.role || 'Software Engineer';
    const role_type = newApp.role_type || 'Full-time';
    const channel = newApp.channel || 'Direct';
    const status = newApp.status || 'drafted';
    const contact = newApp.contact_person || '';
    const fit = newApp.fit_rating || '85%';
    const notes = (newApp.notes || '').replace(/"/g, '""');
    const cv = newApp.cv_file || '';
    const cover = newApp.cover_letter_file || '';
    const source = newApp.source || '';
    const deadline = newApp.deadline || '';

    const csvRow = `"${date}","${company}","${sector}","${role}","${role_type}","${channel}","${status}","${contact}","${fit}","${notes}","${cv}","${cover}","${source}","${deadline}"\n`;

    if (!fs.existsSync(trackerPath)) {
      const header = '"date","company","sector","role","role_type","channel","status","contact_person","fit_rating","notes","cv_file","cover_letter_file","source","deadline"\n';
      fs.writeFileSync(trackerPath, header + csvRow, 'utf8');
    } else {
      fs.appendFileSync(trackerPath, csvRow, 'utf8');
    }

    return NextResponse.json({ success: true, message: 'Application added to tracker' });
  } catch (error: unknown) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
