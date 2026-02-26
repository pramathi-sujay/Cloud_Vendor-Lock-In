import React, { useRef, useEffect } from 'react';

const ICONS = {
    success: {
        bg: 'rgba(5,150,105,0.15)', border: 'rgba(16,185,129,0.35)', color: '#10b981',
        svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    },
    started: {
        bg: 'rgba(202,138,4,0.12)', border: 'rgba(245,158,11,0.35)', color: '#f59e0b',
        svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    },
    running: {
        bg: 'rgba(14,165,233,0.12)', border: 'rgba(56,189,248,0.35)', color: '#38bdf8',
        svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
    },
    error: {
        bg: 'rgba(185,28,28,0.12)', border: 'rgba(239,68,68,0.35)', color: '#f87171',
        svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    },
    info: {
        bg: 'rgba(99,102,241,0.12)', border: 'rgba(129,140,248,0.35)', color: '#818cf8',
        svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    },
};

const ActivityIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const timeAgo = (d) => {
    const s = Math.floor((Date.now() - new Date(d)) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    return `${Math.floor(s / 3600)}h ago`;
};

const ActivityFeed = ({ activities }) => {
    const scrollRef = useRef(null);
    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activities.length]);

    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="card-header-icon" style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 4px 14px rgba(124,58,237,0.35)' }}>
                        <ActivityIcon />
                    </div>
                    <div>
                        <p className="card-header-title">Activity Feed</p>
                        <p className="card-header-sub">Live deployment events</p>
                    </div>
                </div>
                <span className="live-badge"><span className="live-dot" />LIVE</span>
            </div>

            <div ref={scrollRef} className="feed-body" style={{ flex: 1 }}>
                {activities.length === 0 ? (
                    <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 12 }}>
                        No events yet. Deploy a container to see activity.
                    </div>
                ) : activities.map((item, i) => {
                    const ic = ICONS[item.type] || ICONS.info;
                    return (
                        <div key={item.id || i} className="feed-item">
                            <div className="feed-icon" style={{ background: ic.bg, borderColor: ic.border, color: ic.color }}>
                                {ic.svg}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p className="feed-title">{item.title}</p>
                                <p className="feed-desc">{item.description}</p>
                            </div>
                            <span className="feed-time">{timeAgo(item.timestamp)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActivityFeed;
