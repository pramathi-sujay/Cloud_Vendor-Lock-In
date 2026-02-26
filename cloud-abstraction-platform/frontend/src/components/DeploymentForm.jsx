import React, { useState } from 'react';
import api from '../services/api';

const DeploymentForm = ({ onDeploymentSuccess }) => {
    const [formData, setFormData] = useState({
        provider: 'aws',
        image: 'nginx:latest',
        region: 'us-east-1'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const result = await api.deploy(formData.provider, formData.image, formData.region);
            setMessage({ type: 'success', text: `Successfully deployed to ${formData.provider.toUpperCase()}! ID: ${result.id}` });
            if (onDeploymentSuccess) onDeploymentSuccess();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.detail || 'Deployment failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="title">Launch New Deployment</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Cloud Provider</label>
                    <select
                        value={formData.provider}
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                        className="input"
                    >
                        <option value="aws">AWS (Amazon Web Services)</option>
                        <option value="gcp">GCP (Google Cloud Platform)</option>
                        <option value="azure">Azure (Coming Soon)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Container Image</label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="e.g. nginx:latest"
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Region</label>
                    <input
                        type="text"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        placeholder="e.g. us-east-1"
                        className="input"
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="button primary">
                    {loading ? 'Processing...' : 'Deploy Container'}
                </button>
            </form>

            {message && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default DeploymentForm;
