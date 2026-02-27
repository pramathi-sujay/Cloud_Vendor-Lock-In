import React from 'react';

const MockPreview = ({ type, details, onClose }) => {
    const isDeployment = type === 'deployment';
    const id = details?.id || `skyport-${Date.now().toString(36)}`;
    const provider = details?.provider?.toUpperCase() || 'AWS';
    const region = details?.region || 'us-east-1';
    const image = details?.image || details?.container_image || 'nginx:latest';
    const url = isDeployment
        ? `https://yourapp.skyport.cloud/${id}`
        : `https://migrated-app.skyport.cloud/${id}`;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.3s ease',
            padding: 20,
        }}>
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-accent)',
                borderRadius: 24,
                padding: '40px 48px',
                maxWidth: 520,
                width: '100%',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.15)',
                position: 'relative',
                animation: 'fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}>
                {/* Close */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: 16, right: 16,
                    width: 32, height: 32, borderRadius: 8,
                    border: '1px solid var(--border)',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* SkyPort badge */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 20,
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    fontSize: 11, fontWeight: 700, color: 'var(--text-accent)',
                    letterSpacing: '0.06em', marginBottom: 20,
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                    </svg>
                    SKYPORT
                </div>

                {/* Status icon */}
                <div style={{
                    width: 64, height: 64, borderRadius: 20, margin: '0 0 20px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(34,197,94,0.15)',
                }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--status-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: 8 }}>
                    Your Application is Live
                </h2>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
                    {isDeployment
                        ? 'Your container has been successfully deployed and is serving traffic.'
                        : 'Your application has been migrated and is now running on the target cloud.'}
                </p>

                {/* Details grid */}
                <div style={{
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border)',
                    borderRadius: 14, padding: 16,
                    marginBottom: 20,
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px',
                }}>
                    {[
                        { label: isDeployment ? 'Image' : 'Application', value: image },
                        { label: 'Cloud Provider', value: provider },
                        { label: 'Region', value: region },
                        { label: 'Status', value: '✅ Running' },
                    ].map(r => (
                        <div key={r.label}>
                            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 3 }}>{r.value}</div>
                        </div>
                    ))}
                </div>

                {/* URL */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Application URL</div>
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 14px', borderRadius: 10,
                            background: 'rgba(99,102,241,0.08)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            fontSize: 12.5, fontFamily: 'monospace', fontWeight: 600,
                            color: 'var(--text-accent)',
                            textDecoration: 'none',
                            wordBreak: 'break-all',
                            cursor: 'pointer',
                            transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.15)'; e.target.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                        onMouseLeave={e => { e.target.style.background = 'rgba(99,102,241,0.08)'; e.target.style.borderColor = 'rgba(99,102,241,0.2)'; }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        {url}
                    </a>
                </div>

                <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Close Preview
                </button>
            </div>
        </div>
    );
};

export default MockPreview;
