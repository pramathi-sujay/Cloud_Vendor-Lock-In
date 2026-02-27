import React, { useState, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';

const icons = {
    home: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    dashboard: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
    rocket: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
    ),
    layers: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    cluster: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" /><circle cx="19" cy="19" r="3" /><circle cx="5" cy="19" r="3" />
            <path d="M12 8v4M8.5 17.5L12 12M15.5 17.5L12 12" />
        </svg>
    ),
    arrowLeftRight: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3L4 7l4 4" /><path d="M4 7h16" /><path d="M16 21l4-4-4-4" /><path d="M20 17H4" />
        </svg>
    ),
    history: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" />
        </svg>
    ),
    activity: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    fileText: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
    ),
    heartPulse: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
        </svg>
    ),
    settings: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    plug: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" />
        </svg>
    ),
    helpCircle: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    logOut: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    skyport: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#skyGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <defs><linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
    ),
};

const NAV = [
    {
        section: 'Overview',
        items: [
            { key: 'Home', label: 'Home', icon: 'home' },
            { key: 'Dashboard', label: 'Dashboard', icon: 'dashboard' },
        ],
    },
    {
        section: 'Deployment',
        items: [
            { key: 'DirectDeployment', label: 'Direct Deployment', icon: 'rocket' },
            { key: 'ActiveDeployments', label: 'Active Deployments', icon: 'layers' },
            { key: 'Clusters', label: 'Clusters', icon: 'cluster' },
        ],
    },
    {
        section: 'Migration',
        items: [
            { key: 'Migration', label: 'Migration', icon: 'arrowLeftRight' },
            { key: 'MigrationHistory', label: 'Migration History', icon: 'history' },
        ],
    },
    {
        section: 'Monitoring',
        items: [
            { key: 'Monitoring', label: 'Testing & Monitoring', icon: 'activity' },
            { key: 'Logs', label: 'Logs', icon: 'fileText' },
            { key: 'ApiHealth', label: 'API Health', icon: 'heartPulse' },
        ],
    },
    {
        section: 'System',
        items: [
            { key: 'Settings', label: 'Settings', icon: 'settings' },
            { key: 'Integrations', label: 'Integrations', icon: 'plug' },
            { key: 'Support', label: 'Support', icon: 'helpCircle' },
        ],
    },
];

const Sidebar = ({ activePage, onPageChange }) => {
    const { sidebarCollapsed, toggleSidebar, expandSidebar } = useAppState();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const closeMobile = () => setMobileOpen(false);
    const handleNav = (key) => {
        onPageChange(key);
        if (isMobile) closeMobile();
    };

    // Mobile hamburger
    if (isMobile) {
        return (
            <>
                {/* Hamburger FAB */}
                <button className="mobile-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </button>
                {/* Overlay */}
                {mobileOpen && <div className="sidebar-overlay" onClick={closeMobile} />}
                {/* Drawer */}
                <aside className={`sidebar sidebar-mobile${mobileOpen ? ' open' : ''}`}>
                    {renderSidebarContent(false, handleNav, activePage, closeMobile)}
                </aside>
            </>
        );
    }

    return (
        <>
            <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
                {renderSidebarContent(sidebarCollapsed, handleNav, activePage, null, toggleSidebar)}
            </aside>
        </>
    );
};

function renderSidebarContent(collapsed, handleNav, activePage, closeMobile, toggleSidebar) {
    return (
        <>
            <div className="sidebar-logo" onClick={() => handleNav('Home')}>
                {toggleSidebar && (
                    <button className="sidebar-toggle" onClick={e => { e.stopPropagation(); toggleSidebar(); }} title={collapsed ? 'Expand' : 'Collapse'}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}
                {!collapsed && <div className="sidebar-logo-icon">{icons.skyport}</div>}
                {!collapsed && (
                    <div className="sidebar-logo-text">
                        <span className="sidebar-logo-name">SkyPort</span>
                        <span className="sidebar-logo-sub">Multi-Cloud Control Plane</span>
                    </div>
                )}
                {closeMobile && (
                    <button className="sidebar-toggle" onClick={closeMobile} title="Close">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="sidebar-nav">
                {NAV.map(group => (
                    <div key={group.section}>
                        <div className="sidebar-section-label">{group.section}</div>
                        {group.items.map(item => {
                            const isActive = activePage === item.key;
                            return (
                                <div key={item.key} className={`sidebar-item${isActive ? ' active' : ''}`}
                                    onClick={() => handleNav(item.key)} title={collapsed ? item.label : ''}>
                                    <span className="sidebar-item-icon">{icons[item.icon]}</span>
                                    <span className="sidebar-item-label">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Bottom */}
            <div className="sidebar-bottom">
                <div className="sidebar-user" onClick={() => handleNav('Settings')}>
                    <div className="sidebar-user-avatar">SP</div>
                    {!collapsed && (
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">Admin User</div>
                            <div className="sidebar-user-role">Platform Engineer</div>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <div className="sidebar-item" style={{ marginTop: 4, color: 'var(--accent-red)' }}
                        onClick={() => { }}>
                        <span className="sidebar-item-icon">{icons.logOut}</span>
                        <span className="sidebar-item-label">Logout</span>
                    </div>
                )}
            </div>
        </>
    );
}

export default Sidebar;
