import React, { useState, useCallback } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import { Toast } from './components/Toast';
import MigrationEngine from './pages/MigrationEngine';

let _tid = 0;

function App() {
    const [activePage, setActivePage] = useState('Dashboard');
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message) => {
        const id = ++_tid;
        setToasts(p => [...p, { id, type, message }]);
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000);
    }, []);

    const dismissToast = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), []);

    const renderPage = () => {
        if (activePage === 'Dashboard') return <Dashboard onToast={addToast} />;
        if (activePage === 'Migration') return <MigrationEngine />;
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minHeight: '60vh', gap: 12,
            }}>
                <div style={{
                    width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                    boxShadow: '0 0 28px rgba(99,102,241,0.4)',
                }}>
                    {activePage === 'Deployments' ? '🚀' : activePage === 'Clusters' ? '⚙️' : activePage === 'Settings' ? '🔧' : '💬'}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{activePage}</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>This section is coming soon.</p>
            </div>
        );
    };

    return (
        <ThemeProvider>
            <div className="app-shell">
                <Navbar activePage={activePage} onPageChange={setActivePage} />
                <main style={{ flex: 1 }}>{renderPage()}</main>
                <footer className="app-footer">
                    <span>© 2026 CloudControl Plane — Architected for Portability</span>
                    <span className="footer-status">
                        <span className="status-dot" />
                        System Operational
                    </span>
                </footer>
                <Toast toasts={toasts} onDismiss={dismissToast} />
            </div>
        </ThemeProvider>
    );
}

export default App;
