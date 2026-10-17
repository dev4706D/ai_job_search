'use client';

import React, { useState, useEffect } from 'react';

export default function TemplateStudioView() {
  const [docType, setDocType] = useState<'cv' | 'cover'>('cv');
  const [templateCode, setTemplateCode] = useState<string>('');
  const [lines, setLines] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/templates?type=${docType}`)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setTemplateCode(data.code);
          setLines(data.lines || data.code.split('\n').length);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [docType]);

  const handleCopy = () => {
    navigator.clipboard.writeText(templateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const filename = docType === 'cv' ? 'main_tailored.tex' : 'cover_tailored.tex';
    const blob = new Blob([templateCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease' }}>
      {/* Studio Banner */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '18px' }}>📄</span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              LaTeX Document Studio & ATS Validator
            </h2>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Inspect standard templates, verify ATS parseability rules, and copy/export tailored source files.
          </p>
        </div>

        {/* Switcher & Actions */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setDocType('cv')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: docType === 'cv' ? 700 : 500,
                background: docType === 'cv' ? 'var(--accent-indigo)' : 'transparent',
                color: '#ffffff'
              }}
            >
              CV (ModernCV / LuaLaTeX)
            </button>
            <button
              onClick={() => setDocType('cover')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: docType === 'cover' ? 700 : 500,
                background: docType === 'cover' ? 'var(--accent-indigo)' : 'transparent',
                color: '#ffffff'
              }}
            >
              Cover Letter (XeLaTeX)
            </button>
          </div>

          <button onClick={handleCopy} className="btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            {copied ? '✓ Copied' : '📋 Copy Code'}
          </button>
          <button onClick={handleDownload} className="btn-primary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            💾 Download .tex
          </button>
        </div>
      </div>

      {/* Rules & ATS Checklist */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #34d399' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>
            ✓ Mandatory Engine Rule
          </div>
          <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
            {docType === 'cv' ? 'Compile CV with lualatex' : 'Compile Cover Letter with xelatex'}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {docType === 'cv'
              ? 'pdflatex fails on modern TeX Live/MiKTeX with fontawesome5 glyph-expansion errors. lualatex compiles font metrics cleanly.'
              : 'cover.cls requires fontspec and OpenFonts/raleway metrics which only compile via xelatex.'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #60a5fa' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', marginBottom: '8px' }}>
            ✓ Page Constraint
          </div>
          <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
            {docType === 'cv' ? 'Exact 2-Page Constraint' : 'Exact 1-Page Constraint'}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {docType === 'cv'
              ? 'Never spill 1-2 orphan lines onto page 3. Use \\needspace{5\\baselineskip} before each \\cventry to prevent awkward breaks.'
              : 'Signature block must sit cleanly with the body text. Adjust vertical padding to ensure no page-2 overflow.'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #c084fc' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', marginBottom: '8px' }}>
            ✓ ATS Parseability
          </div>
          <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
            Literal Contact Layer (verify_pdf.py)
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Ensure email and phone appear as literal selectable text. ATS engines cannot follow icon-only hyperlinks.
          </p>
        </div>
      </div>

      {/* Code Editor / Viewer */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '12px',
          color: 'var(--text-muted)'
        }}>
          <div>
            <span>SOURCE: </span>
            <code style={{ color: '#ffffff', fontWeight: 600 }}>
              {docType === 'cv' ? 'cv/main_example.tex' : 'cover_letters/cover_example.tex'}
            </code>
          </div>
          <div>
            <span>{lines} lines • UTF-8</span>
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: '#040711',
          overflowX: 'auto',
          maxHeight: '560px',
          fontFamily: 'var(--font-mono)',
          fontSize: '12.5px',
          lineHeight: '1.7',
          color: '#cbd5e1',
          whiteSpace: 'pre'
        }}>
          {loading ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
              Loading LaTeX template...
            </div>
          ) : (
            templateCode
          )}
        </div>
      </div>
    </div>
  );
}
