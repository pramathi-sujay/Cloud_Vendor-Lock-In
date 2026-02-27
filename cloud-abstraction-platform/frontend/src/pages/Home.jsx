import React from 'react';

const FEATURE_CARDS = [
    {
        title: 'Direct Multi-Cloud Deployment',
        desc: 'Launch containers instantly across AWS and GCP from a single unified interface.',
        icon: '🚀'
    },
    {
        title: 'Real-Time Health Monitoring',
        desc: 'Datadog-grade observability with live pulses, uptime tracking, and trace monitoring.',
        icon: '📊'
    },
    {
        title: 'Zero-Downtime Migration',
        desc: 'Seamlessly transition workloads between cloud providers with AI-assisted mapping.',
        icon: '🔄'
    },
    {
        title: 'API Health Validation',
        desc: 'Deep-tissue health checks for backend services, databases, and SDK endpoints.',
        icon: '❤️'
    },
    {
        title: 'Cloud Connectivity Check',
        desc: 'Continuous latency and heartbeat monitoring for all global cloud regions.',
        icon: '🌐'
    },
    {
        title: 'Observability & Logs',
        desc: 'Centralized telemetry and event logs to troubleshoot multi-cloud complexity.',
        icon: '📋'
    }
];

const Home = ({ onPageChange }) => {
    return (
        <div className="animate-fade-in">
            <section className="hero-section">
                {/* Animated Background Mesh */}
                <div className="hero-bg-grid" />
                <div className="hero-bg-orb-1" />
                <div className="hero-bg-orb-2" />

                <div className="hero-content">
                    <div className="hero-eyebrow animate-fade-in-up">
                        <span>✨</span> SkyPort v2.0 Beta — Multi-Cloud Orchestration
                    </div>

                    <h1 className="hero-headline animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Control Your <span className="hero-headline-gradient">Multi-Cloud</span><br />
                        Infrastructure from One SkyPort
                    </h1>

                    <p className="hero-subheading animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Deploy, monitor, migrate, and validate across AWS & GCP in real time.
                        SkyPort abstracts cloud complexity into a single, professional control plane.
                    </p>

                    <div className="hero-ctas animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button className="btn-primary" onClick={() => onPageChange('DirectDeployment')}>
                            Launch Deployment
                        </button>
                        <button className="btn-secondary" onClick={() => onPageChange('Monitoring')}>
                            Open Monitoring
                        </button>
                    </div>

                    <div className="hero-trust-badges animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="trust-badge">
                            <span className="trust-aws">🟠 AWS</span> Amazon Web Services
                        </div>
                        <div className="trust-badge">
                            <span className="trust-gcp">🔵 GCP</span> Google Cloud Platform
                        </div>
                        <div className="trust-badge">
                            <span className="pulse-green" style={{ width: 6, height: 6 }} />
                            All Systems Operational
                        </div>
                    </div>
                </div>

                {/* Stats Preview */}
                <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    {[
                        { label: 'Avg Uptime SLA', value: '99.97%' },
                        { label: 'Cloud Providers', value: '2' },
                        { label: 'Avg Deploy Latency', value: '<120ms' },
                        { label: 'Global Regions', value: '6+' },
                    ].map((s, i) => (
                        <div key={i} className="hero-stat-card">
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{s.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Grid Section */}
            <section className="features-section">
                <div style={{ marginBottom: 40, textAlign: 'center' }}>
                    <h2 className="section-title">Everything you need to orchestrate multi-cloud</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>A complete control plane purpose-built for modern cloud-native teams.</p>
                </div>

                <div className="feature-grid">
                    {FEATURE_CARDS.map((f, i) => (
                        <div key={i} className="glass-card feature-card">
                            <div className="feature-card-icon">{f.icon}</div>
                            <h3 className="card-header-title" style={{ marginTop: 12, marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Beta CTA Section */}
            <section style={{ padding: '60px 48px', textAlign: 'center' }}>
                <div className="glass-card-nohover" style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))',
                    padding: '48px 24px',
                    border: '1px solid var(--border-accent)',
                }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to stop vendor lock-in?</h2>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 600, margin: '0 auto 28px' }}>
                        SkyPort empowers your engineers to move workloads between clouds instantly without rewriting a single line of SDK code.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary" onClick={() => onPageChange('Migration')}>
                            Try Migration Engine
                        </button>
                        <button className="btn-secondary" onClick={() => onPageChange('Dashboard')}>
                            View Active Fleet
                        </button>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hero-stat-card {
          padding: 18px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-accent);
        }
        .hero-stat-card:after {
          display: none;
        }
        .features-section {
          padding: 80px 48px;
          background: rgba(0,0,0,0.1);
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s ease;
        }
        .feature-card-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .section-title {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
      `}} />
        </div>
    );
};

export default Home;
