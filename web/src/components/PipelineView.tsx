'use client';

import React, { useState } from 'react';
import { ApplicationRecord } from '../app/api/tracker/route';

interface PipelineProps {
  applications: ApplicationRecord[];
  onRefresh: () => void;
  onAddNew: (app: Partial<ApplicationRecord>) => void;
}

export default function PipelineView({ applications, onAddNew }: PipelineProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for adding new application
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [sector, setSector] = useState('Tech / AI');
  const [status, setStatus] = useState<ApplicationRecord['status']>('applied');
  const [channel, setChannel] = useState('LinkedIn');
  const [fitRating, setFitRating] = useState('90%');
  const [source, setSource] = useState('');
  const [notes, setNotes] = useState('');
  const [deadline, setDeadline] = useState('');

  const filtered = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch = !search ||
      app.company.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q) ||
      app.sector.toLowerCase().includes(q) ||
      app.notes.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'drafted':
        return <span className="badge badge-drafted">Drafted</span>;
      case 'applied':
        return <span className="badge badge-active">Applied</span>;
      case 'interview':
        return <span className="badge badge-interview">Interview</span>;
      case 'offer':
        return <span className="badge badge-offer">Offer</span>;
      case 'hired':
        return <span className="badge badge-hired">Hired</span>;
      case 'rejected':
      case 'no_response':
      default:
        return <span className="badge badge-rejected">Closed</span>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    onAddNew({
      company,
      role,
      sector,
      status,
      channel,
      fit_rating: fitRating,
      source,
      notes,
      deadline
    });

    setIsModalOpen(false);
    // reset form
    setCompany('');
    setRole('');
    setNotes('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Top Filter and Actions Bar */}
      <div className="glass-panel" style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by company, role, sector, or notes..."
            style={{
              width: '100%',
              maxWidth: '380px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#ffffff',
              outline: 'none'
            }}
          />
        </div>

        {/* Status Filter Chips */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', alignItems: 'center' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'drafted', label: 'Drafted' },
            { id: 'applied', label: 'Active' },
            { id: 'interview', label: 'Interview' },
            { id: 'offer', label: 'Offer' },
            { id: 'hired', label: 'Hired' },
            { id: 'rejected', label: 'Closed' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: filterStatus === f.id ? 600 : 500,
                background: filterStatus === f.id ? 'var(--accent-indigo)' : 'rgba(255,255,255,0.04)',
                color: filterStatus === f.id ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: filterStatus === f.id ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '9px 18px', fontSize: '13px' }}
        >
          + Track New Application
        </button>
      </div>

      {/* Applications Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Company & Role</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Sector</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Fit Score</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Channel</th>
                <th style={{ padding: '14px 16px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '14px 20px', color: 'var(--text-muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Notes & Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No applications matching current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '15px' }}>{app.company}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>{app.role}</div>
                      {app.source && (
                        <a
                          href={app.source}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: '11px', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}
                        >
                          View Posting ↗
                        </a>
                      )}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {app.sector}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {getStatusBadge(app.status)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        fontWeight: 700,
                        color: parseInt(app.fit_rating) >= 90 ? '#34d399' : '#fbbf24',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}>
                        {app.fit_rating}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                      {app.channel}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {app.date}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.4' }}>
                        {app.notes || 'No recent notes.'}
                      </div>
                      {app.deadline && (
                        <div style={{ fontSize: '11px', color: '#f87171', marginTop: '4px' }}>
                          ⏰ Deadline: {app.deadline}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Application */}
      {isModalOpen && (
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
            maxWidth: '540px',
            width: '100%',
            padding: '28px',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                Track New Job Application
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)', fontSize: '18px' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Company Name *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Novo Nordisk, Microsoft, Startup"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Target Role *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior AI Engineer, Full Stack Developer"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Sector</label>
                  <input
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Initial Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ApplicationRecord['status'])}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                  >
                    <option value="drafted">Drafted</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Source / Channel</label>
                  <input
                    type="text"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="e.g. LinkedIn, FreeHire, Referral"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Estimated Fit Score</label>
                  <input
                    type="text"
                    value={fitRating}
                    onChange={(e) => setFitRating(e.target.value)}
                    placeholder="e.g. 92%"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Posting URL</label>
                <input
                  type="url"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="https://..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Initial Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Recruiter contact, interview dates, key requirements..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#ffffff', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
