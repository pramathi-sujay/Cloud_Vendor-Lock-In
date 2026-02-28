import React, { useState } from 'react';
import api from '../services/api';

const AWS_REGIONS = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
const GCP_REGIONS = ['us-central1', 'us-east1', 'europe-west1', 'asia-east1'];
const AZURE_REGIONS = ['eastus', 'westus2', 'westeurope', 'southeastasia'];
const IMAGES = ['nginx:latest', 'node:18-alpine', 'python:3.11-slim', 'redis:7-alpine', 'ubuntu:22.04'];

const RocketIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const DeploymentForm = ({ onDeploymentSuccess }) => {
    const [deploymentMode, setDeploymentMode] = useState('image');
    const [form, setForm] = useState({
        provider: 'aws',
        image: 'nginx:latest',
        region: 'us-east-1',
        githubUrl: '',
        branch: 'main',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const regions = form.provider === 'gcp' ? GCP_REGIONS : form.provider === 'azure' ? AZURE_REGIONS : AWS_REGIONS;

    const setProvider = (p) => {
        const r = p === 'gcp' ? GCP_REGIONS[0] : p === 'azure' ? AZURE_REGIONS[0] : AWS_REGIONS[0];
        setForm(f => ({ ...f, provider: p, region: r }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (deploymentMode === 'image' && !form.image?.trim()) return;
        if (deploymentMode === 'github' && !form.githubUrl?.trim()) return;
        setLoading(true);
        setSuccess(false);
        const imageValue = deploymentMode === 'image' ? form.image : form.githubUrl;
        const submitForm = { ...form, image: imageValue };
        try {
            const result = await api.deploy(form.provider, imageValue, form.region);
            if (onDeploymentSuccess) onDeploymentSuccess(result, submitForm, null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            if (onDeploymentSuccess) onDeploymentSuccess(null, submitForm, err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-body" onSubmit={handleSubmit} style={{ padding: 0, border: 'none', background: 'none' }}>
            {/* Provider */}
            <div>
                <label className="form-label">Cloud Provider</label>
                <div className="select-wrap">
                    <select
                        className="form-control"
                        value={form.provider}
                        onChange={e => setProvider(e.target.value)}
                    >
                        <option value="aws">Amazon Web Services (AWS)</option>
                        <option value="gcp">Google Cloud Platform (GCP)</option>
                        <option value="azure">Microsoft Azure</option>
                    </select>
                </div>
                <div className="provider-chips">
                    <button type="button" className={`provider-chip chip-aws${form.provider === 'aws' ? ' active' : ''}`} onClick={() => setProvider('aws')}>AWS</button>
                    <button type="button" className={`provider-chip chip-gcp${form.provider === 'gcp' ? ' active' : ''}`} onClick={() => setProvider('gcp')}>GCP</button>
                    <button type="button" className={`provider-chip chip-azure${form.provider === 'azure' ? ' active' : ''}`} onClick={() => setProvider('azure')}>Azure</button>
                </div>
            </div>

            {/* Deployment Source toggle */}
            <div>
                <label className="form-label">Deployment Source</label>
                <div className="deployment-source-toggle">
                    <button
                        type="button"
                        className={`deployment-source-pill${deploymentMode === 'image' ? ' active' : ''}`}
                        onClick={() => setDeploymentMode('image')}
                    >
                        Use Container Image
                    </button>
                    <button
                        type="button"
                        className={`deployment-source-pill${deploymentMode === 'github' ? ' active' : ''}`}
                        onClick={() => setDeploymentMode('github')}
                    >
                        Deploy from GitHub Repository
                    </button>
                </div>
            </div>

            {deploymentMode === 'image' && (
            <>
            {/* Image */}
            <div>
                <label className="form-label">Container Image</label>
                <input
                    type="text"
                    className="form-control"
                    value={form.image}
                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="e.g. nginx:latest"
                    required={deploymentMode === 'image'}
                    style={{ cursor: 'text' }}
                />
                <div className="quick-picks">
                    {IMAGES.map(img => (
                        <button type="button" key={img} className="quick-pick" onClick={() => setForm(f => ({ ...f, image: img }))}>
                            {img}
                        </button>
                    ))}
                </div>
            </div>
            </>
            )}

            {deploymentMode === 'github' && (
            <>
            <div>
                <label className="form-label">GitHub Repository URL</label>
                <input
                    type="url"
                    className="form-control"
                    value={form.githubUrl}
                    onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                    placeholder="https://github.com/owner/repo"
                    required={deploymentMode === 'github'}
                    style={{ cursor: 'text' }}
                />
            </div>
            <div>
                <label className="form-label">Branch (optional)</label>
                <input
                    type="text"
                    className="form-control"
                    value={form.branch}
                    onChange={e => setForm(f => ({ ...f, branch: e.target.value }))}
                    placeholder="main"
                    style={{ cursor: 'text' }}
                />
            </div>
            </>
            )}

            {/* Region */}
            <div>
                <label className="form-label">Region</label>
                <div className="select-wrap">
                    <select
                        className="form-control"
                        value={form.region}
                        onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                    >
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`deploy-btn ${success ? 'success-btn' : ''}`}
            >
                {loading ? (
                    <><div className="btn-spinner" /> Deploying...</>
                ) : success ? (
                    <><CheckIcon /> Deployed Successfully!</>
                ) : (
                    <><RocketIcon /> Deploy Container</>
                )}
            </button>
        </form>
    );
};

export default DeploymentForm;
