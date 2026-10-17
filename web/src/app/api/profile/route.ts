import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getRepoRoot() {
  // If running in web/, repo root is one level up
  const parent = path.resolve(process.cwd(), '..');
  if (fs.existsSync(path.join(parent, 'CLAUDE.md'))) {
    return parent;
  }
  return process.cwd();
}

export async function GET() {
  try {
    const root = getRepoRoot();
    const claudePath = path.join(root, 'CLAUDE.md');
    
    if (!fs.existsSync(claudePath)) {
      return NextResponse.json({ error: 'CLAUDE.md not found' }, { status: 404 });
    }

    const content = fs.readFileSync(claudePath, 'utf8');

    // Parse candidate profile from CLAUDE.md
    const nameMatch = content.match(/- \*\*Name:\*\*\s*(.+)/);
    const locationMatch = content.match(/- \*\*Location:\*\*\s*(.+)/);
    const headlineMatch = content.match(/- \*\*LinkedIn headline:\*\*\s*"?([^"\n]+)"?/);
    const statusMatch = content.match(/- \*\*Status:\*\*\s*(.+)/);
    const primarySkillsMatch = content.match(/- \*\*Primary:\*\*\s*(.+)/);
    const secondarySkillsMatch = content.match(/- \*\*Secondary:\*\*\s*(.+)/);
    const domainMatch = content.match(/- \*\*Domain:\*\*\s*(.+)/);
    const softwareMatch = content.match(/- \*\*Software:\*\*\s*(.+)/);

    const isPlaceholder = !nameMatch || nameMatch[1].includes('[YOUR_NAME]');

    const profile = {
      isPlaceholder,
      name: isPlaceholder ? 'Devendra Kumar' : nameMatch?.[1].trim(),
      location: isPlaceholder ? 'Indirapuram, Ghaziabad, UP, India' : locationMatch?.[1].trim(),
      headline: isPlaceholder ? 'Full Stack Developer | MERN Stack, Next.js, React Native & AI Voice Agents' : headlineMatch?.[1].trim(),
      status: isPlaceholder ? 'Actively seeking Full Stack Developer & AI Engineer roles' : statusMatch?.[1].trim(),
      languages: [
        { language: 'English', level: 'Professional Working Proficiency' },
        { language: 'Hindi', level: 'Native' }
      ],
      skills: {
        primary: (primarySkillsMatch && !primarySkillsMatch[1].includes('[YOUR_PRIMARY_SKILLS]'))
          ? primarySkillsMatch[1].split(',').map(s => s.trim())
          : ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
        secondary: (secondarySkillsMatch && !secondarySkillsMatch[1].includes('[YOUR_SECONDARY_SKILLS]'))
          ? secondarySkillsMatch[1].split(',').map(s => s.trim())
          : ['React Native', 'Expo', 'Bun', 'Hono', 'Redux', 'Tailwind CSS', 'Shadcn UI', 'Supabase', 'pgvector', 'Drizzle ORM', 'C++', 'Python'],
        domain: (domainMatch && !domainMatch[1].includes('[YOUR_DOMAIN_EXPERTISE]'))
          ? domainMatch[1].split(',').map(s => s.trim())
          : ['Full Stack Web & Mobile Development', 'Real-time AI Voice Agents (Twilio, WebSockets)', 'RESTful API & System Design', 'CRM Systems', 'Payment Gateways (Razorpay)'],
        software: (softwareMatch && !softwareMatch[1].includes('[YOUR_TOOLS_AND_SOFTWARE]'))
          ? softwareMatch[1].split(',').map(s => s.trim())
          : ['Git', 'GitHub Actions', 'Docker', 'AWS (S3, CloudFront)', 'Vercel', 'Railway', 'Render', 'Nginx', 'Postman', 'Embold', 'VS Code']
      },
      experience: [
        {
          role: 'Full Stack Developer',
          company: 'OniT Services',
          period: 'March 2025 - March 2026',
          location: 'Indirapuram, Ghaziabad, UP',
          points: [
            'Engineered and deployed the primary company website with Next.js (SSR/SSG), boosting Lighthouse scores, SEO rankings, and responsiveness.',
            'Developed full-featured CRM platform from scratch, digitising client workflows with JWT, RBAC, password recovery, and lead tools, cutting overhead by 60%.',
            'Implemented intelligent dynamic lead allocation engine that auto-distributes multi-source leads to subscribed clients, reducing response time and boosting productivity by 50%.',
            'Integrated Razorpay payment gateway with wallet recharge and automated refund workflows, improving payment transparency.',
            'Built RESTful APIs using Node.js/Express.js and optimised MongoDB queries, improving API response performance across dashboard modules.'
          ]
        },
        {
          role: 'Frontend Developer',
          company: 'Systaldyn Consultancy Private Limited',
          period: 'Jan 2024 - Feb 2025',
          location: 'Noida, UP',
          points: [
            'Built responsive React.js interfaces for 3 enterprise projects (including Hitachi America AI-EASE and Material Dismantler Org) integrating RESTful APIs.',
            'Integrated Highcharts to visualise complex API datasets as interactive charts and dynamic client-ready dashboards.',
            'Improved code quality across enterprise projects using Embold static analysis, resolving code smells and maintainability issues prior to client delivery.'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Technology - Computer Science and Engineering (AIML)',
          institution: 'Ajay Kumar Garg Engineering College (AKTU), Ghaziabad, UP',
          years: '2020 - 2024',
          thesis: 'Led final year engineering project driving cross-functional collaboration; Coursework: DSA, OOP, Networks, DBMS, OS, Cloud, ML, AI'
        }
      ],
      dealbreakers: [
        'Roles strictly limited to legacy waterfall maintenance with zero modernization roadmap',
        'Toxic work cultures lacking automated testing, CI/CD, or engineering quality standards'
      ],
      targetSectors: [
        'AI / Voice & Agentic Software Startups (Conversational AI, Real-time WebSockets, LLM Tool Calling)',
        'Full Stack SaaS & Modern Web Platforms (Next.js, React, Node.js, TypeScript)',
        'High-growth product companies and international remote teams'
      ]
    };

    return NextResponse.json({ profile, rawMarkdown: content });
  } catch (error: unknown) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const root = getRepoRoot();
    const claudePath = path.join(root, 'CLAUDE.md');
    const body = await req.json();

    if (!fs.existsSync(claudePath)) {
      return NextResponse.json({ error: 'CLAUDE.md not found' }, { status: 404 });
    }

    let content = fs.readFileSync(claudePath, 'utf8');

    if (body.name) {
      content = content.replace(/- \*\*Name:\*\*.*/, `- **Name:** ${body.name}`);
    }
    if (body.location) {
      content = content.replace(/- \*\*Location:\*\*.*/, `- **Location:** ${body.location}`);
    }
    if (body.headline) {
      content = content.replace(/- \*\*LinkedIn headline:\*\*.*/, `- **LinkedIn headline:** "${body.headline}"`);
    }
    if (body.status) {
      content = content.replace(/- \*\*Status:\*\*.*/, `- **Status:** ${body.status}`);
    }
    if (body.skills?.primary) {
      const skillsStr = Array.isArray(body.skills.primary) ? body.skills.primary.join(', ') : body.skills.primary;
      content = content.replace(/- \*\*Primary:\*\*.*/, `- **Primary:** ${skillsStr}`);
    }
    if (body.skills?.secondary) {
      const skillsStr = Array.isArray(body.skills.secondary) ? body.skills.secondary.join(', ') : body.skills.secondary;
      content = content.replace(/- \*\*Secondary:\*\*.*/, `- **Secondary:** ${skillsStr}`);
    }

    fs.writeFileSync(claudePath, content, 'utf8');

    return NextResponse.json({ success: true, message: 'CLAUDE.md profile updated' });
  } catch (error: unknown) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
