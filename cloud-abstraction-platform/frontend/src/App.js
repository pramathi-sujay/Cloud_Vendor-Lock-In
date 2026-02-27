import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { AppStateProvider } from './context/AppStateContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Toast } from './components/Toast';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DirectDeployment from './pages/DirectDeployment';
import MigrationEngine from './pages/MigrationEngine';
import Monitoring from './pages/Monitoring';

let _tid = 0;

// Placeholder page for "coming soon" sections
const PlaceholderPage = ({ name, icon }) => (
    <div className="page-content animate-fade-in">
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '50vh', gap: 16, textAlign: 'center',
        }}>
            <div style={{
                width: 80, height: 80, borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
                border: '1px solid rgba(99,102,241,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
                boxShadow: '0 0 32px rgba(99,102,241,0.15)',
            }}>
                {icon}
            </div>
            <div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>
                    {name}
                </h2>
                <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                    This section is available in the next release.
                </p>
            </div>
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 20, fontSize: 12, color: 'var(--text-accent)', fontWeight: 600,
            }}>
                🚧 Coming Soon
            </div>
        </div>
    </div>
);

function AppContent() {
    const [activePage, setActivePage] = useState('Home');
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message) => {
        const id = ++_tid;
        setToasts(p => [...p, { id, type, message }]);
        setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 5000);
    };

    const dismissToast = (id) => setToasts(p => p.filter(t => t.id !== id));

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <Home onPageChange={setActivePage} />;
            case 'Dashboard': return <Dashboard onToast={addToast} />;
            case 'DirectDeployment': return <DirectDeployment />;
            case 'Migration': return <MigrationEngine />;
            case 'Monitoring': return <Monitoring onToast={addToast} />;
            case 'Logs': return <PlaceholderPage name="Deployment Logs" icon="📋" />;
            case 'ApiHealth': return <PlaceholderPage name="API Health Monitor" icon="❤️" />;
            case 'Clusters': return <PlaceholderPage name="Cluster Management" icon="⚙️" />;
            case 'MigrationHistory': return <PlaceholderPage name="Migration History" icon="🔄" />;
            case 'Settings': return <PlaceholderPage name="Settings" icon="🔧" />;
            case 'Integrations': return <PlaceholderPage name="Integrations" icon="🔌" />;
            case 'Support': return <PlaceholderPage name="Support" icon="💬" />;
            default: return <PlaceholderPage name={activePage} icon="🌐" />;
        }
    };

    return (
        <div className="app-shell">
            {/* Sidebar */}
            <Sidebar activePage={activePage} onPageChange={setActivePage} />

            {/* Content area */}
            <div className="app-content">
                <Navbar activePage={activePage} onPageChange={setActivePage} />
                <main className="app-main">
                    {renderPage()}
                </main>
                <footer className="app-footer">
                    <span>© 2026 SkyPort — Multi-Cloud Orchestration Reimagined</span>
                    <span className="footer-status">
                        <span className="status-dot" />
                        System Operational
                    </span>
                </footer>
            </div>

            <Toast toasts={toasts} onDismiss={dismissToast} />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppStateProvider>
                <AppContent />
            </AppStateProvider>
        </ThemeProvider>
    );
}

export default App;
