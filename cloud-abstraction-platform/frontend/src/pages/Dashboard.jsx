import React from 'react';
import MetricCard from '../components/MetricCard';
import DeploymentTable from '../components/DeploymentTable';
import ActivityFeed from '../components/ActivityFeed';
import { useAppState } from '../context/AppStateContext';

const Dashboard = () => {
    const { deployments } = useAppState();

    // Aggregate stats
    const activeCount = deployments.filter(d => d.status === 'running').length;
    const providers = new Set(deployments.map(d => d.provider)).size;
    const regions = new Set(deployments.map(d => d.region)).size;

    const activities = deployments.slice(0, 8).map(d => ({
        id: d.id,
        type: d.status === 'running' ? 'success' : d.status === 'failed' ? 'error' : 'running',
        title: d.status === 'running' ? 'Deployment Success' : d.status === 'failed' ? 'Deployment Failed' : 'Deploying...',
        description: `Container ${d.container_image} → ${d.provider.toUpperCase()} (${d.region})`,
        timestamp: d.timestamp,
    }));

    return (
        <div className="animate-fade-in main-layout">
            {/* 1. Header Metrics */}
            <div className="metrics-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
                <MetricCard
                    type="deployments"
                    title="Active Deployments"
                    value={activeCount}
                    subtitle={`${deployments.length} total across fleet`}
                />
                <MetricCard
                    type="containers"
                    title="Container Instances"
                    value={deployments.length * 3 + 2}
                    subtitle="Scaling factor: 3.2x"
                />
                <MetricCard
                    type="providers"
                    title="Cloud Providers"
                    value={providers}
                    subtitle="AWS, GCP, Azure integration live"
                />
                <MetricCard
                    type="regions"
                    title="Global Regions"
                    value={regions}
                    subtitle="Edge distribution active"
                />
            </div>

            <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 24 }}>
                {/* 2. Main Workload Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div className="glass-card-nohover" style={{ flex: 1 }}>
                        <div className="card-header" style={{ marginBottom: 20 }}>
                            <div className="card-header-icon" style={{ background: 'linear-gradient(135deg,#3b82f6,#2dd4bf)', boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                                </svg>
                            </div>
                            <div>
                                <p className="card-header-title">Container Fleet</p>
                                <p className="card-header-sub">Manage active multi-cloud workloads</p>
                            </div>
                        </div>
                        <DeploymentTable deployments={deployments} />
                    </div>
                </div>

                {/* 3. Side Activity & Logs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <ActivityFeed activities={activities} />

                    <div className="glass-card-nohover" style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed var(--border-accent)', padding: 20 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>SkyPort Intelligence</h4>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            Detected under-utilized instance in <span style={{ color: 'var(--text-accent)' }}>aws-us-east-1</span>. Scaling down policy recommended.
                        </p>
                        <button className="btn-secondary" style={{ marginTop: 12, width: '100%', padding: '6px' }}>View Recommendation</button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 1300px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
        </div>
    );
};

export default Dashboard;
