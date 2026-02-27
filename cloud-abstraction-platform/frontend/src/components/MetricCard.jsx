import React from 'react';

const CONFIGS = {
    deployments: {
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        glow: 'rgba(99,102,241,0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    containers: {
        gradient: 'linear-gradient(135deg, #059669, #10b981)',
        glow: 'rgba(5,150,105,0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="17" /><line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
            </svg>
        ),
    },
    providers: {
        gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
        glow: 'rgba(217,119,6,0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
        ),
    },
    regions: {
        gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)',
        glow: 'rgba(14,165,233,0.25)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
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
                className="metric-icon-wrap"
                style={{ background: cfg.gradient, boxShadow: `0 4px 16px ${cfg.glow}` }}
            >
                {cfg.icon}
            </div>
            <div className="metric-value">{value}</div>
            <div className="metric-title">{title}</div>
            <div className="metric-sub">{subtitle}</div>
        </div>
    );
};

export default MetricCard;
