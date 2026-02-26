import React from 'react';

const CONFIGS = {
    deployments: {
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        glow: '#6366f1',
        bar: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
        icon: (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    containers: {
        gradient: 'linear-gradient(135deg, #059669, #10b981)',
        glow: '#059669',
        bar: 'linear-gradient(90deg, #059669, #10b981)',
        icon: (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="17" /><line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
            </svg>
        ),
    },
    providers: {
        gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
        glow: '#d97706',
        bar: 'linear-gradient(90deg, #d97706, #ea580c)',
        icon: (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
        ),
    },
    regions: {
        gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
        glow: '#0ea5e9',
        bar: 'linear-gradient(90deg, #0369a1, #0ea5e9)',
        icon: (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
};

const MetricCard = ({ type, title, value, subtitle }) => {
    const cfg = CONFIGS[type] || CONFIGS.deployments;
    return (
        <div className="metric-card">
            <div
                className="metric-card-glow"
                style={{ background: cfg.glow }}
            />
            <div
                className="metric-card-icon"
                style={{ background: cfg.gradient, boxShadow: `0 4px 18px ${cfg.glow}55` }}
            >
                {cfg.icon}
            </div>
            <p className="metric-card-label">{title}</p>
            <p className="metric-card-value">{value}</p>
            <p className="metric-card-sub">{subtitle}</p>
            <div className="metric-card-bar" style={{ background: cfg.bar }} />
        </div>
    );
};

export default MetricCard;
