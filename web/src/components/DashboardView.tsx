'use client';

import React from 'react';
import { ApplicationRecord } from '../app/api/tracker/route';

interface DashboardProps {
  applications: ApplicationRecord[];
  onNavigate: (tab: any) => void;
}

export default function DashboardView({ applications, onNavigate }: DashboardProps) {
  const total = applications.length;
  const drafted = applications.filter(a => a.status === 'drafted').length;
  const active = applications.filter(a => a.status === 'applied').length;
  const interviews = applications.filter(a => a.status === 'interview').length;
  const offers = applications.filter(a => a.status === 'offer').length;
  const hired = applications.filter(a => a.status === 'hired').length;
  const rejected = applications.filter(a => a.status === 'rejected' || a.status === 'no_response').length;

  const totalSubmitted = total - drafted;
  const interviewConversion = totalSubmitted > 0 ? Math.round(((interviews + offers + hired) / totalSubmitted) * 100) : 0;
  const offerConversion = (interviews + offers + hired) > 0 ? Math.round(((offers + hired) / (interviews + offers + hired)) * 100) : 0;

  // Sector distribution
  const sectorCounts: Record<string, number> = {};
  applications.forEach(app => {
    const s = app.sector || 'Other';
    sectorCounts[s] = (sectorCounts[s] || 0) + 1;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fadeIn 0.3s ease' }}>
      {/* Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(6, 182, 212, 0.05) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 1, maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>🚀</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Autonomous Application Funnel
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Welcome to your AI Job Hunting Command Center
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            All applications are cross-referenced with your profile in <code>CLAUDE.md</code>. Tailor LaTeX CVs with <code>lualatex</code>, compile cover letters with <code>xelatex</code>, and track interview stages.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
          <button 
            className="btn-primary" 
            onClick={() => onNavigate('search')}
          >
            <span>🔍 Search Live Jobs</span>
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => onNavigate('pipeline')}
          >
            <span>📁 View Pipeline</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {/* Total Applications */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--accent-indigo)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Tracked
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
            {total}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {drafted} in draft, {totalSubmitted} sent
          </div>
        </div>

        {/* Active Submissions */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--status-active)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Active / Under Review
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#60a5fa', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
            {active}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Awaiting response
          </div>
        </div>

        {/* Interviews */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--status-interview)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Interviews
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#fbbf24', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
            {interviews}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {interviewConversion}% conversion from sent
          </div>
        </div>

        {/* Offers & Hired */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--status-offer)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Offers & Hired
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#c084fc', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
            {offers + hired}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {offers} pending, {hired} accepted
          </div>
        </div>

        {/* True Rejection Rate */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--status-rejected)' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Closed / Rejected
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#f87171', margin: '6px 0 2px', fontFamily: 'var(--font-display)' }}>
            {rejected}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {totalSubmitted > 0 ? Math.round((rejected / totalSubmitted) * 100) : 0}% of resolved
          </div>
        </div>
      </div>

      {/* Visual Funnel and Distribution Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Visual Application Funnel (Handcrafted SVG) */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>Application Stage Funnel</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Conversion progression across pipeline stages</p>
            </div>
            <span style={{ fontSize: '12px', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
              {interviewConversion}% Interview Rate
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Stage 1: Applications Sent */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>1. Applications Sent</span>
                <span style={{ color: 'var(--text-secondary)' }}>{totalSubmitted} jobs (100%)</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #6366f1, #818cf8)', borderRadius: '6px' }} />
              </div>
            </div>

            {/* Stage 2: Under Active Review */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>2. Active / In Review</span>
                <span style={{ color: 'var(--text-secondary)' }}>{active + interviews + offers + hired} jobs ({totalSubmitted > 0 ? Math.round(((active + interviews + offers + hired) / totalSubmitted) * 100) : 0}%)</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${totalSubmitted > 0 ? Math.max(12, Math.round(((active + interviews + offers + hired) / totalSubmitted) * 100)) : 0}%`, 
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', 
                  borderRadius: '6px' 
                }} />
              </div>
            </div>

            {/* Stage 3: Technical & Partner Interview */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>3. First / Final Interview</span>
                <span style={{ color: 'var(--text-secondary)' }}>{interviews + offers + hired} jobs ({interviewConversion}%)</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${Math.max(8, interviewConversion)}%`, 
                  background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', 
                  borderRadius: '6px' 
                }} />
              </div>
            </div>

            {/* Stage 4: Formal Offer */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>4. Offer Received</span>
                <span style={{ color: 'var(--text-secondary)' }}>{offers + hired} jobs ({totalSubmitted > 0 ? Math.round(((offers + hired) / totalSubmitted) * 100) : 0}%)</span>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${Math.max(5, totalSubmitted > 0 ? Math.round(((offers + hired) / totalSubmitted) * 100) : 0)}%`, 
                  background: 'linear-gradient(90deg, #a855f7, #c084fc)', 
                  borderRadius: '6px' 
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sectors and Status Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
            Target Industry Sectors
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Distribution of roles applied across technical domains
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {Object.entries(sectorCounts).map(([sector, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={sector}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{sector}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: 'var(--gradient-brand)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: '28px',
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>📄</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>Standalone HTML Report</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Built-in /html-report generator</div>
              </div>
            </div>
            <code style={{ fontSize: '12px', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '4px', color: '#a5b4fc' }}>
              /html-report
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
