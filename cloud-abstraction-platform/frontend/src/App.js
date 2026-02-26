import React, { useState } from 'react';
import './App.css';
import DeploymentForm from './components/DeploymentForm';
import Dashboard from './components/Dashboard';

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleDeploymentSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>CloudControl Plane <span className="badge-demo">Beta</span></h1>
                <p className="subtitle">Unified Interface for Multi-Cloud Container Orchestration</p>
            </header>

            <main className="main-content">
                <div className="grid">
                    <section className="section">
                        <DeploymentForm onDeploymentSuccess={handleDeploymentSuccess} />
                    </section>

                    <section className="section full-width">
                        <Dashboard refreshTrigger={refreshTrigger} />
                    </section>
                </div>
            </main>

            <footer className="footer">
                <p>&copy; 2026 Cloud Abstraction Platform. Architected for Portability.</p>
                <div className="status-indicator">
                    <span className="dot pulse"></span> API Connected
                </div>
            </footer>
        </div>
    );
}

export default App;
