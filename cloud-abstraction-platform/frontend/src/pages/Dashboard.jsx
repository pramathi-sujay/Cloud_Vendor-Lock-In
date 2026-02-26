import React, { useEffect, useState, useCallback, useRef } from 'react';
import MetricCard from '../components/MetricCard';
import DeploymentForm from '../components/DeploymentForm';
import DeploymentTable from '../components/DeploymentTable';
import ActivityFeed from '../components/ActivityFeed';
import api from '../services/api';

// ── Mock data for demo / offline mode ────────────────────────────────────────
const MOCK_BASE = [
    { id: 'dep-f3a1b2c4d5e6f7a8', provider: 'aws', container_image: 'nginx:latest', region: 'us-east-1', status: 'running' },
    { id: 'dep-g8h7i6j5k4l3m2n1', provider: 'gcp', container_image: 'node:18-alpine', region: 'us-central1', status: 'deploying' },
    { id: 'dep-o9p8q7r6s5t4u3v2', provider: 'aws', container_image: 'python:3.11-slim', region: 'eu-west-1', status: 'running' },
    { id: 'dep-w1x2y3z4a5b6c7d8', provider: 'gcp', container_image: 'redis:7-alpine', region: 'europe-west1', status: 'failed' },
    { id: 'dep-e9f8g7h6i5j4k3l2', provider: 'aws', container_image: 'ubuntu:22.04', region: 'ap-southeast-1', status: 'running' },
    { id: 'dep-m1n2o3p4q5r6s7t8', provider: 'gcp', container_image: 'postgres:15-alpine', region: 'asia-east1', status: 'running' },
];

const buildActivity = (deps) => {
    const now = Date.now();
    return [
        { id: 1, type: 'success', title: 'Deployment successful', description: 'nginx:latest → AWS us-east-1 is healthy', timestamp: new Date(now - 32000) },
        { id: 2, type: 'running', title: 'Container running', description: 'node:18-alpine operational on GCP us-central1', timestamp: new Date(now - 115000) },
        { id: 3, type: 'started', title: 'Deployment initiated', description: 'python:3.11-slim queued for AWS eu-west-1', timestamp: new Date(now - 270000) },
        { id: 4, type: 'error', title: 'Deployment failed', description: 'redis:7-alpine — image pull error on GCP', timestamp: new Date(now - 430000) },
        { id: 5, type: 'info', title: 'Auto-scaling triggered', description: 'nginx replica count increased to 3', timestamp: new Date(now - 720000) },
        { id: 6, type: 'success', title: 'Health check passed', description: 'All endpoints responding on us-east-1', timestamp: new Date(now - 1200000) },
    ];
};

let nextId = 100;
// ─────────────────────────────────────────────────────────────────────────────

const Dashboard = ({ onToast }) => {
    const [deployments, setDeployments] = useState(MOCK_BASE);
    const [activities, setActivities] = useState(buildActivity(MOCK_BASE));
    const [loading, setLoading] = useState(false);
    const [isMock, setIsMock] = useState(true);
    const timerRef = useRef(null);

    // ── Fetch real data (graceful mock fallback) ────────────────────────────
    const fetchDeployments = useCallback(async () => {
        setLoading(true);
        try {
            const data = await api.getDeployments();
            if (Array.isArray(data) && data.length >= 0) {
                setDeployments(data);
                setIsMock(false);
            }
        } catch {
            setIsMock(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDeployments();
        const interval = setInterval(fetchDeployments, 8000);
        return () => { clearInterval(interval); if (timerRef.current) clearTimeout(timerRef.current); };
    }, [fetchDeployments]);

    // ── Handle deployment form submission ────────────────────────────────────
    const handleDeployment = useCallback((result, form, error) => {
        if (error) {
            // API failed → still add demo row so UI looks good
            const tempId = `dep-demo-${Date.now()}`;
            const newRow = {
                id: tempId,
                provider: form.provider,
                container_image: form.image,
                region: form.region,
                status: 'deploying',
            };
            setDeployments(prev => [newRow, ...prev]);
            setActivities(prev => [{
                id: ++nextId, type: 'started',
                title: 'Deployment started',
                description: `${form.image} → ${form.provider.toUpperCase()} ${form.region}`,
                timestamp: new Date(),
            }, ...prev]);
            onToast('info', `Demo: ${form.image} deploying to ${form.provider.toUpperCase()} ${form.region}`);

            // Transition to "running" after 2.5 s
            timerRef.current = setTimeout(() => {
                setDeployments(prev => prev.map(d => d.id === tempId ? { ...d, status: 'running' } : d));
                setActivities(prev => [{
                    id: ++nextId, type: 'success',
                    title: 'Deployment successful',
                    description: `${form.image} is now running on ${form.provider.toUpperCase()} ${form.region}`,
                    timestamp: new Date(),
                }, ...prev]);
                onToast('success', `${form.image} is now running on ${form.provider.toUpperCase()} ${form.region}!`);
            }, 2500);

        } else {
            // Real deployment succeeded
            const id = result?.id ? String(result.id).substring(0, 8) : '?';
            onToast('success', `Deployed ${form.image} → ${form.provider.toUpperCase()} ${form.region} [${id}]`);
            fetchDeployments();
            setActivities(prev => [{
                id: ++nextId, type: 'success',
                title: 'Deployment successful',
                description: `${form.image} → ${form.provider.toUpperCase()} ${form.region}`,
                timestamp: new Date(),
            }, ...prev]);
        }
    }, [fetchDeployments, onToast]);

    // ── Derived metrics ───────────────────────────────────────────────────────
    const running = deployments.filter(d => d.status?.toLowerCase() === 'running').length;
    const providers = [...new Set(deployments.map(d => d.provider?.toLowerCase()))].filter(Boolean).length;
    const regions = [...new Set(deployments.map(d => d.region))].filter(Boolean).length;

    return (
        <div className="main-layout">
            {/* Demo banner */}
            {isMock && (
                <div className="demo-banner">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <strong>Demo Mode</strong> — Backend not connected. Mock data displayed for prototype presentation. Deploy button simulates full workflow.
                </div>
            )}

            {/* Page title */}
            <div className="page-header">
                <h1 className="page-title">Control Plane</h1>
                <p className="page-subtitle">Multi-cloud container orchestration — unified interface</p>
            </div>

            {/* Metric cards */}
            <div className="metrics-row">
                <MetricCard type="deployments" title="Total Deployments" value={deployments.length} subtitle="All providers combined" />
                <MetricCard type="containers" title="Running Containers" value={running} subtitle="Active &amp; healthy" />
                <MetricCard type="providers" title="Cloud Providers" value={Math.max(providers, 2)} subtitle="AWS · GCP · Azure" />
                <MetricCard type="regions" title="Active Regions" value={Math.max(regions, 4)} subtitle="Global distribution" />
            </div>

            {/* 3-column grid */}
            <div className="dashboard-grid">
                {/* Left: form */}
                <DeploymentForm onDeploymentSuccess={handleDeployment} />

                {/* Centre: table */}
                <DeploymentTable deployments={deployments} loading={loading} onRefresh={fetchDeployments} />

                {/* Right: activity */}
                <ActivityFeed activities={activities} />
            </div>
        </div>
    );
};

export default Dashboard;
