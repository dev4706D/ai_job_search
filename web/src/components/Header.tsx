'use client';

import React from 'react';

export type NavTab = 'dashboard' | 'search' | 'pipeline' | 'profile' | 'templates' | 'workflows';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeCount: number;
  offersCount: number;
}

export default function Header({ currentTab, onSelectTab, activeCount, offersCount }: HeaderProps) {
  const tabs: { id: NavTab; label: string; icon: string; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard & Funnel', icon: '📊' },
    { id: 'search', label: 'Job Search', icon: '🔍' },
    { id: 'pipeline', label: 'Pipeline Tracker', icon: '📁', badge: activeCount },
    { id: 'profile', label: 'Candidate Profile', icon: '👤' },
    { id: 'templates', label: 'CV & Cover Studio', icon: '📄' },
    { id: 'workflows', label: 'Agent Commands', icon: '⚡' },
  ];

  return (
    <header style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '24px 0 16px',
      borderBottom: '1px solid var(--border-subtle)',
      marginBottom: '32px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: 'var(--shadow-glow)',
            animation: 'floatMascot 4s ease-in-out infinite'
          }}>
            🕊️
            <span style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              border: '2px solid var(--bg-dark)'
            }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{
                fontSize: '22px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Pip AI Job Search
              </h1>
              <span style={{
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600
              }}>
                v1.0
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Next.js Frontend for Autonomous Job Hunting & Tailored Applications
            </p>
          </div>
        </div>

        {/* Live Status and Highlights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {offersCount > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#d8b4fe',
              fontSize: '13px',
              fontWeight: 600
            }}>
              🎉 {offersCount} Active Offer Received!
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '12px',
            color: '#34d399',
            fontWeight: 500
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              animation: 'pulseDot 2s infinite ease-in-out'
            }} />
            Agent Workspace Connected
          </div>
        </div>
      </div>

      {/* Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span style={{
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: isActive ? 'var(--accent-indigo)' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
