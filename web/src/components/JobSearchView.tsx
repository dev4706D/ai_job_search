'use client';

import React, { useState, useEffect } from 'react';
import { SearchJobResult } from '../app/api/jobs/search/route';

interface JobSearchProps {
  onAddToPipeline: (job: SearchJobResult) => void;
}

export default function JobSearchView({ onAddToPipeline }: JobSearchProps) {
  const [query, setQuery] = useState('AI Engineer');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<SearchJobResult[]>([]);
  const [source, setSource] = useState<string>('curated');
  const [selectedJob, setSelectedJob] = useState<SearchJobResult | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const searchJobs = async (searchQuery: string, remote: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs/search?q=${encodeURIComponent(searchQuery)}&remote=${remote}`);
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
        setSource(data.source);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchJobs(query, remoteOnly);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchJobs(query, remoteOnly);
  };

  const handleAdd = (job: SearchJobResult) => {
    onAddToPipeline(job);
    setAddedIds(prev => ({ ...prev, [job.id]: true }));
  };

  const quickPills = ['AI Engineer', 'Python Machine Learning', 'Next.js Full Stack', 'FastAPI Backend', 'Data Scientist'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Search Header */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '6px', fontFamily: 'var(--font-display)' }}>
          🔍 Real-Time Job Discovery & Fit Assessment
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
          Searches ~50 ATS platforms aggregated via FreeHire, LinkedIn, and Danish portals. Roles are scored against your candidate profile.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '280px', position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, skill, or keyword (e.g. PyTorch, AI Engineer, Next.js)..."
              style={{
                width: '100%',
                padding: '12px 16px 12px 42px',
                borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              🔎
            </span>
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.04)',
            padding: '0 16px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            fontSize: '13px',
            color: 'var(--text-secondary)'
          }}>
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => {
                setRemoteOnly(e.target.checked);
                searchJobs(query, e.target.checked);
              }}
            />
            <span>Remote Only</span>
          </label>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search Portals'}
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Suggestions:</span>
          {quickPills.map(pill => (
            <button
              key={pill}
              onClick={() => {
                setQuery(pill);
                searchJobs(pill, remoteOnly);
              }}
              style={{
                background: query === pill ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: query === pill ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-subtle)',
                color: query === pill ? '#ffffff' : 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff' }}>
            {jobs.length} Matching Opportunities
          </span>
          <span style={{
            fontSize: '11px',
            padding: '2px 8px',
            borderRadius: '12px',
            background: source === 'freehire-live' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            color: source === 'freehire-live' ? '#34d399' : '#a5b4fc',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {source === 'freehire-live' ? '⚡ Live ATS Aggregator' : '📦 Verified Skill Cache'}
          </span>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Tip: Click &quot;Add to Pipeline&quot; to track or generate a tailored CV
        </div>
      </div>

      {/* Jobs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '18px'
      }}>
        {jobs.map((job) => {
          const isAdded = addedIds[job.id];
          return (
            <div
              key={job.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                position: 'relative'
              }}
            >
              <div>
                {/* Header row: Company & Fit Score */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {job.company}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', lineHeight: '1.3', marginTop: '2px' }}>
                      {job.title}
                    </h3>
                  </div>

                  {job.fit_estimate && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: job.fit_estimate >= 90 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      border: job.fit_estimate >= 90 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                      color: job.fit_estimate >= 90 ? '#34d399' : '#fbbf24',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      minWidth: '54px'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{job.fit_estimate}%</span>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fit</span>
                    </div>
                  )}
                </div>

                {/* Metadata Pills: Location, Work mode, Seniority */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    📍 {job.location}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: job.work_mode === 'remote' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    color: job.work_mode === 'remote' ? '#67e8f9' : 'var(--text-secondary)'
                  }}>
                    {job.work_mode.toUpperCase()}
                  </span>
                  {job.salary_range && (
                    <span style={{ fontSize: '12px', color: '#a7f3d0', fontWeight: 600 }}>
                      💰 {job.salary_range}
                    </span>
                  )}
                </div>

                {/* Description snippet */}
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {job.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.skills.map(s => (
                    <span key={s} style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1'
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                >
                  Inspect Fit Details
                </button>
                <button
                  onClick={() => handleAdd(job)}
                  className={isAdded ? 'btn-secondary' : 'btn-primary'}
                  style={{
                    padding: '8px 14px',
                    fontSize: '12px',
                    background: isAdded ? 'rgba(16, 185, 129, 0.2)' : undefined,
                    color: isAdded ? '#34d399' : undefined
                  }}
                  disabled={isAdded}
                >
                  {isAdded ? '✓ Tracked' : '+ Add to Pipeline'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Fit Inspection & Details */}
      {selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {selectedJob.company} • {selectedJob.location}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  {selectedJob.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                style={{ fontSize: '20px', color: 'var(--text-muted)', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ESTIMATED FIT</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#34d399' }}>{selectedJob.fit_estimate}% Match</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WORK MODE</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{selectedJob.work_mode.toUpperCase()}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SALARY GUIDE</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{selectedJob.salary_range || 'Market standard'}</div>
              </div>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Full Description & Scope
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
              {selectedJob.description}
            </p>

            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              CLI Command for Claude / Agent
            </h4>
            <div style={{
              background: '#040711',
              padding: '12px',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#38bdf8',
              marginBottom: '20px',
              wordBreak: 'break-all'
            }}>
              /apply {selectedJob.source_url}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <a
                href={selectedJob.source_url}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ fontSize: '13px' }}
              >
                Open Original Posting ↗
              </a>
              <button
                className="btn-primary"
                style={{ fontSize: '13px' }}
                onClick={() => {
                  handleAdd(selectedJob);
                  setSelectedJob(null);
                }}
              >
                Track in Pipeline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
