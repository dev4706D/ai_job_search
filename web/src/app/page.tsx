'use client';

import React, { useState, useEffect } from 'react';
import Header, { NavTab } from '../components/Header';
import DashboardView from '../components/DashboardView';
import JobSearchView from '../components/JobSearchView';
import PipelineView from '../components/PipelineView';
import ProfileView from '../components/ProfileView';
import TemplateStudioView from '../components/TemplateStudioView';
import WorkflowView from '../components/WorkflowView';
import { ApplicationRecord } from './api/tracker/route';
import { SearchJobResult } from './api/jobs/search/route';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const fetchApplications = () => {
    fetch('/api/tracker')
      .then(res => res.json())
      .then(data => {
        if (data.applications) {
          setApplications(data.applications);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddFromSearch = async (job: SearchJobResult) => {
    try {
      const res = await fetch('/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: job.company,
          role: job.title,
          sector: job.category || 'Engineering',
          channel: 'FreeHire Aggregator',
          status: 'drafted',
          fit_rating: `${job.fit_estimate || 90}%`,
          source: job.source_url,
          notes: `Added from Live Job Search. Skills: ${job.skills.join(', ')}`
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✓ Added "${job.title} at ${job.company}" to your pipeline!`);
        fetchApplications();
      }
    } catch (e: any) {
      showToast(`Failed to add: ${e.message}`);
    }
  };

  const handleAddNewApplication = async (newApp: Partial<ApplicationRecord>) => {
    try {
      const res = await fetch('/api/tracker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✓ Tracked application for ${newApp.company}!`);
        fetchApplications();
      }
    } catch (e: any) {
      showToast(`Failed: ${e.message}`);
    }
  };

  const activeCount = applications.filter(a => a.status === 'applied' || a.status === 'interview').length;
  const offersCount = applications.filter(a => a.status === 'offer').length;

  return (
    <div className="app-container">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeCount={activeCount}
        offersCount={offersCount}
      />

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '12px 20px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.95)',
          color: '#ffffff',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease'
        }}>
          {toast}
        </div>
      )}

      {/* Main Tab Content */}
      <main id="main-content">
        {currentTab === 'dashboard' && (
          <DashboardView
            applications={applications}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'search' && (
          <JobSearchView
            onAddToPipeline={handleAddFromSearch}
          />
        )}

        {currentTab === 'pipeline' && (
          <PipelineView
            applications={applications}
            onRefresh={fetchApplications}
            onAddNew={handleAddNewApplication}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView />
        )}

        {currentTab === 'templates' && (
          <TemplateStudioView />
        )}

        {currentTab === 'workflows' && (
          <WorkflowView />
        )}
      </main>
    </div>
  );
}
