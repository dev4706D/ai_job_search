'use client';

import React, { useState, useEffect } from 'react';

export default function ProfileView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [headline, setHeadline] = useState('');
  const [status, setStatus] = useState('');
  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [newPrimary, setNewPrimary] = useState('');
  const [newSecondary, setNewSecondary] = useState('');
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data.profile) {
          setProfileData(data.profile);
          setName(data.profile.name || '');
          setLocation(data.profile.location || '');
          setHeadline(data.profile.headline || '');
          setStatus(data.profile.status || '');
          setPrimarySkills(data.profile.skills?.primary || []);
          setSecondarySkills(data.profile.skills?.secondary || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          headline,
          status,
          skills: {
            primary: primarySkills,
            secondary: secondarySkills
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✓ Successfully synchronized changes to CLAUDE.md!');
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setMessage(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const addPrimarySkill = () => {
    if (newPrimary.trim() && !primarySkills.includes(newPrimary.trim())) {
      setPrimarySkills([...primarySkills, newPrimary.trim()]);
      setNewPrimary('');
    }
  };

  const removePrimarySkill = (s: string) => {
    setPrimarySkills(primarySkills.filter(item => item !== s));
  };

  const addSecondarySkill = () => {
    if (newSecondary.trim() && !secondarySkills.includes(newSecondary.trim())) {
      setSecondarySkills([...secondarySkills, newSecondary.trim()]);
      setNewSecondary('');
    }
  };

  const removeSecondarySkill = (s: string) => {
    setSecondarySkills(secondarySkills.filter(item => item !== s));
  };

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading candidate profile from CLAUDE.md...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '18px' }}>👤</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              Candidate Profile & AI Rules
            </h2>
            {profileData?.isPlaceholder && (
              <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                Initial Template State
              </span>
            )}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Single source of truth in <code>CLAUDE.md</code>. Agentic workflows score job postings, reframe experience, and generate cover letters using this data.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-primary"
          disabled={saving}
          style={{ padding: '10px 22px' }}
        >
          {saving ? 'Syncing...' : '💾 Save & Sync to CLAUDE.md'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '8px',
          background: message.startsWith('✓') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: `1px solid ${message.startsWith('✓') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: message.startsWith('✓') ? '#34d399' : '#f87171',
          fontSize: '14px',
          fontWeight: 600
        }}>
          {message}
        </div>
      )}

      {/* Profile Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Core Identity */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Identity & Headline</h3>
          
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Location (City, Country & Commute Constraints)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>LinkedIn Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Current Status</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>Technical Skills Matcher</h3>

          {/* Primary Skills */}
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Primary Technical Skills (Core Strengths)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {primarySkills.map(s => (
                <span key={s} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  color: '#c7d2fe',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  {s}
                  <button onClick={() => removePrimarySkill(s)} style={{ color: '#818cf8', fontSize: '14px', lineHeight: '1' }}>✕</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newPrimary}
                onChange={(e) => setNewPrimary(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPrimarySkill(); }}}
                placeholder="Add primary skill..."
                style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', fontSize: '13px' }}
              />
              <button type="button" onClick={addPrimarySkill} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Add
              </button>
            </div>
          </div>

          {/* Secondary Skills */}
          <div>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Secondary / Supporting Technologies
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
              {secondarySkills.map(s => (
                <span key={s} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: '#67e8f9',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  {s}
                  <button onClick={() => removeSecondarySkill(s)} style={{ color: '#22d3ee', fontSize: '14px', lineHeight: '1' }}>✕</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newSecondary}
                onChange={(e) => setNewSecondary(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSecondarySkill(); }}}
                placeholder="Add secondary tech..."
                style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', fontSize: '13px' }}
              />
              <button type="button" onClick={addSecondarySkill} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Experience and Dealbreakers preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Experience Timeline */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
            Work Experience Timeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {profileData?.experience?.map((exp: any, i: number) => (
              <div key={i} style={{ borderLeft: '2px solid rgba(99, 102, 241, 0.4)', paddingLeft: '14px' }}>
                <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>{exp.role}</div>
                <div style={{ fontSize: '12px', color: 'var(--accent-cyan)' }}>{exp.company} • {exp.period}</div>
                <ul style={{ marginTop: '6px', paddingLeft: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {exp.points?.map((pt: string, j: number) => (
                    <li key={j} style={{ marginBottom: '4px' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Target Sectors & Dealbreakers */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
              Target Sectors & Goals
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {profileData?.targetSectors?.map((sector: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span style={{ color: '#34d399' }}>✓</span> {sector}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
              Hard Deal-breakers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {profileData?.dealbreakers?.map((db: string, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#f87171' }}>
                  <span>🚫</span> {db}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
