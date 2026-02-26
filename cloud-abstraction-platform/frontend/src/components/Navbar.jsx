import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const TABS = ['Dashboard', 'Deployments', 'Clusters', 'Settings', 'Support'];

const CloudIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);
const BellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const Navbar = ({ activePage, onPageChange }) => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="nav-logo" onClick={() => onPageChange('Dashboard')}>
                <div className="nav-logo-icon"><CloudIcon /></div>
                <span className="nav-logo-text">CloudControl <span>Plane</span></span>
                <span className="nav-beta">Beta</span>
            </div>

            {/* Tabs */}
            <div className="nav-tabs">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`nav-tab${activePage === tab ? ' active' : ''}`}
                        onClick={() => onPageChange(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Actions */}
            <div className="nav-actions">
                <ThemeToggle />

                <button className="nav-icon-btn" title="Notifications">
                    <BellIcon />
                    <span className="nav-notif-badge">3</span>
                </button>

                <div className="nav-avatar" title="Account">AD</div>
            </div>
        </nav>
    );
};

export default Navbar;
