'use client';

import React, { useState } from 'react';

export default function WorkflowView() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Salary Calculator state
  const [selectedRole, setSelectedRole] = useState('Full Stack Developer (Next.js / MERN)');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (2-4 yrs)');
  const [location, setLocation] = useState('India / Delhi NCR / Remote (INR)');

  const commands = [
    {
      cmd: '/setup',
      name: 'Profile Onboarding',
      desc: 'Parses your documents/ folder (CV, LinkedIn export, diplomas), or runs an interview to populate CLAUDE.md.',
      example: '/setup'
    },
    {
      cmd: '/scrape',
      name: 'Job Portal Scraper',
      desc: 'Orchestrates search skills (LinkedIn, FreeHire, Jobindex, Jobnet) to scrape relevant postings.',
      example: '/scrape'
    },
    {
      cmd: '/rank',
      name: 'Batch Fit Scoring',
      desc: 'Ranks scraped postings across 5 evaluation dimensions, flagging deal-breakers and ranking top matches.',
      example: '/rank'
    },
    {
      cmd: '/apply <url>',
      name: 'Drafter-Reviewer Tailoring',
      desc: 'Evaluates fit, writes targeted LaTeX CV & cover letter, runs reviewer critique, and verifies ATS layout.',
      example: '/apply https://freehire.me/jobs/sample-posting'
    },
    {
      cmd: '/interview',
      name: 'Interview Prep Pack',
      desc: 'Generates roleplay mock interview talking points, STAR answers, company research, and bridge answers for gaps.',
      example: '/interview'
    },
    {
      cmd: '/outcome',
      name: 'Application Outcome Tracking',
      desc: 'Archives final materials into documents/applications/<company>_<role>/ and updates pipeline tracker.',
      example: '/outcome'
    },
    {
      cmd: '/upskill',
      name: 'Skill Gap & Learning Plan',
      desc: 'Analyzes differences between your profile and job market requirements, producing targeted study guides.',
      example: '/upskill'
    },
    {
      cmd: '/html-report',
      name: 'Offline Dashboard Generator',
      desc: 'Generates reports/application-dashboard.html with SVG charts and filterable table.',
      example: '/html-report'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const getSalaryBenchmark = () => {
    if (location.includes('INR') || location.includes('India')) {
      if (selectedRole.includes('AI') || selectedRole.includes('Voice')) {
        if (experienceLevel.startsWith('Junior')) return { base: '₹80,000 - 1,20,000 /mo', annual: '₹10 - 16 LPA', secondary: 'approx. $12k - $19k USD' };
        if (experienceLevel.startsWith('Mid')) return { base: '₹1,50,000 - 2,50,000 /mo', annual: '₹18 - 30 LPA', secondary: 'approx. $22k - $36k USD' };
        return { base: '₹2,60,000 - 4,00,000 /mo', annual: '₹32 - 50 LPA', secondary: 'approx. $38k - $60k USD' };
      }
      if (selectedRole.includes('Full Stack') || selectedRole.includes('Mobile')) {
        if (experienceLevel.startsWith('Junior')) return { base: '₹60,000 - 95,000 /mo', annual: '₹7 - 12 LPA', secondary: 'approx. $9k - $15k USD' };
        if (experienceLevel.startsWith('Mid')) return { base: '₹1,25,000 - 2,10,000 /mo', annual: '₹15 - 26 LPA', secondary: 'approx. $18k - $31k USD' };
        return { base: '₹2,30,000 - 3,50,000 /mo', annual: '₹28 - 42 LPA', secondary: 'approx. $34k - $50k USD' };
      }
      return { base: '₹1,00,000 - 1,80,000 /mo', annual: '₹12 - 22 LPA', secondary: 'approx. $14k - $26k USD' };
    }

    if (location.includes('USD') || location.includes('Global')) {
      if (experienceLevel.startsWith('Junior')) return { base: '$4,000 - $6,000 /mo', annual: '$48,000 - $72,000 USD', secondary: 'approx. ₹40 - 60 LPA' };
      if (experienceLevel.startsWith('Mid')) return { base: '$6,500 - $9,500 /mo', annual: '$78,000 - $115,000 USD', secondary: 'approx. ₹65 - 95 LPA' };
      return { base: '$10,000 - $14,000 /mo', annual: '$120,000 - $170,000 USD', secondary: 'approx. ₹1 - 1.4 Cr' };
    }

    // Default Denmark / EU Tech
    if (experienceLevel.startsWith('Junior')) return { base: '42,000 - 50,000 DKK', annual: '504,000 - 600,000 DKK', secondary: 'approx. €67k - €80k' };
    if (experienceLevel.startsWith('Mid')) return { base: '55,000 - 68,000 DKK', annual: '660,000 - 816,000 DKK', secondary: 'approx. €88k - €109k' };
    return { base: '72,000 - 88,000 DKK', annual: '864,000 - 1,056,000 DKK', secondary: 'approx. €115k - €141k' };
  };

  const benchmark = getSalaryBenchmark();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
          ⚡ Agentic Workflow Commands & Tools
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Every command runs within the agent framework (Claude Code, Google Antigravity, or Codex) using the thin-pointer design in <code>AGENTS.md</code>.
        </p>
      </div>

      {/* Salary Benchmark Calculator */}
      <div className="glass-panel" style={{
        padding: '24px',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span style={{ fontSize: '22px' }}>💰</span>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
              Salary Benchmark Estimator
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Market compensation intelligence across Indian Tech hubs (Delhi NCR / Bengaluru), Global Remote ($ USD), and European markets.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Target Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', fontSize: '13px' }}
            >
              <option value="Full Stack Developer (Next.js / MERN)">Full Stack Developer (Next.js / MERN)</option>
              <option value="AI Voice & LLM Application Engineer">AI Voice & LLM Application Engineer</option>
              <option value="Mobile Engineer (React Native)">Mobile Engineer (React Native)</option>
              <option value="Backend Developer (Node.js / Express)">Backend Developer (Node.js / Express)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Seniority Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', fontSize: '13px' }}
            >
              <option value="Junior (0-2 yrs)">Junior (0-2 yrs)</option>
              <option value="Mid-Level (2-4 yrs)">Mid-Level (2-4 yrs)</option>
              <option value="Senior (5+ yrs)">Senior (5+ yrs)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Market / Geography</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', fontSize: '13px' }}
            >
              <option value="India / Delhi NCR / Remote (INR)">India / Delhi NCR / Remote (INR)</option>
              <option value="Global Remote ($ USD)">Global Remote ($ USD)</option>
              <option value="Denmark / Copenhagen (DKK)">Denmark / Copenhagen (DKK)</option>
            </select>
          </div>
        </div>

        {/* Estimated Compensation Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          background: 'rgba(0,0,0,0.3)',
          padding: '16px',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ESTIMATED MONTHLY BASE</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#34d399', marginTop: '2px' }}>{benchmark.base}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>in-hand take-home & benefits</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ANNUAL TOTAL COMP (CTC / BASE)</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#67e8f9', marginTop: '2px' }}>{benchmark.annual}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{benchmark.secondary}</div>
          </div>
        </div>
      </div>

      {/* Commands Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {commands.map((c) => {
          const isCopied = copiedCmd === c.example;
          return (
            <div key={c.cmd} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <code style={{ fontSize: '14px', fontWeight: 700, color: '#818cf8', background: 'rgba(99, 102, 241, 0.15)', padding: '3px 8px', borderRadius: '6px' }}>
                    {c.cmd}
                  </code>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {c.name}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {c.desc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                  {c.example}
                </span>
                <button
                  onClick={() => handleCopy(c.example)}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isCopied ? '#34d399' : 'var(--accent-indigo)',
                    cursor: 'pointer'
                  }}
                >
                  {isCopied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
