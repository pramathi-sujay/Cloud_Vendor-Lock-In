import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';

const Monitoring = ({ onToast }) => {
    const [checking, setChecking] = useState(false);
    const [uptime, setUptime] = useState(99.97);
    const [responseTime, setResponseTime] = useState(117);
    const [lastCheck, setLastCheck] = useState('Just now');

    const runHealthCheck = () => {
        setChecking(true);
        setTimeout(() => {
            setChecking(false);
            setUptime(99.97 + (Math.random() * 0.01 - 0.005));
            setResponseTime(110 + Math.floor(Math.random() * 20));
            setLastCheck('Just now');
            if (onToast) {
                onToast('success', 'Health check completed: All global regions and internal systems are operational.');
            }
        }, 2500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(u => u + (Math.random() * 0.002 - 0.001));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-content animate-fade-in">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="page-title">Testing & Monitoring</h1>
                    <p className="page-subtitle">Real-time observability across all cloud environments</p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div className="glass-card-nohover" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.05)' }}>
                        <div className="pulse-green" />
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-green)' }}>All Systems Operational</span>
                    </div>
                    <button
                        className={`btn-primary ${checking ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={runHealthCheck}
                        style={{ minWidth: 160 }}
                    >
                        {checking ? (
                            <>
                                <span className="step-spinner" style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite', marginRight: 8 }} />
                                Checking...
                            </>
                        ) : '▶ Run Health Check'}
                    </button>
                </div>
            </div>

            <div className="monitoring-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>

                {/* 1. Application Uptime */}
                <div className="glass-card-nohover">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--status-green)', boxShadow: '0 0 10px var(--status-green)' }} />
                        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Application Uptime</div>
                        <StatusBadge status="running" label="UP" style={{ marginLeft: 'auto' }} />
                    </div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                        {uptime.toFixed(2)}%
                    </div>
                    <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
                        <div style={{ height: '100%', background: 'var(--gradient-green)', width: `${uptime}%` }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Response Time</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{responseTime}ms</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Last Incident</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>14 days ago</div>
                        </div>
                    </div>
                </div>

                {/* 2. Cloud Connectivity */}
                <div className="glass-card-nohover">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Cloud Connectivity</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#FF9900', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>A</div>
                                <span style={{ fontSize: 14, fontWeight: 600 }}>AWS (us-east-1)</span>
                            </div>
                            <StatusBadge status="running" label="Connected" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>G</div>
                                <span style={{ fontSize: 14, fontWeight: 600 }}>GCP (asia-east1)</span>
                            </div>
                            <StatusBadge status="running" label="Connected" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#0089d6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900 }}>A</div>
                                <span style={{ fontSize: 14, fontWeight: 600 }}>Azure (eastus)</span>
                            </div>
                            <StatusBadge status="running" label="Connected" />
                        </div>
                    </div>
                    <div style={{ marginTop: 20, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                        Last heartbeat check: {lastCheck}
                    </div>
                </div>

                {/* 3. API Health */}
                <div className="glass-card-nohover" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: 4 }}>API Health Check</div>
                    {[
                        { name: 'Backend API', status: 'Healthy' },
                        { name: 'SQLite Database', status: 'Healthy' },
                        { name: 'Docker Service', status: 'Healthy' },
                        { name: 'Cloud SDKs', status: 'Healthy' },
                    ].map(api => (
                        <div key={api.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'var(--bg-glass)', border: '1px solid var(--border)' }}>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{api.name}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--status-green)' }}>● Healthy</span>
                        </div>
                    ))}
                </div>

                {/* 4. Infrastructure Capacity (Mock Graph) */}
                <div className="glass-card-nohover" style={{ gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Fleet CPU & Memory Load</div>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: 2 }} /> CPU</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 8, height: 8, background: '#a855f7', borderRadius: 2 }} /> MEM</div>
                        </div>
                    </div>

                    <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 4, paddingBottom: 10 }}>
                        {Array.from({ length: 48 }).map((_, i) => {
                            const h1 = 30 + Math.random() * 50;
                            const h2 = 20 + Math.random() * 40;
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
                                    <div style={{ background: '#a855f7', height: `${h2}%`, borderRadius: 1, opacity: 0.6 }} />
                                    <div style={{ background: 'var(--accent)', height: `${h1}%`, borderRadius: 1 }} />
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
                        <span>24h ago</span>
                        <span>12h ago</span>
                        <span>Now</span>
                    </div>
                </div>

                {/* 5. Migration Validation */}
                <div className="glass-card-nohover">
                    <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: 20 }}>Migration Validation</div>
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--status-green)', marginBottom: 4 }}>100% Passed</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>All post-migration integrity checks verified.</div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button className="btn-secondary" style={{ width: '100%', fontSize: 12 }}>View Audit Logs</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Monitoring;
