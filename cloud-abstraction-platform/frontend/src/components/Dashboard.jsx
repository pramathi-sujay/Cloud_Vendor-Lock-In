import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';

const Dashboard = ({ refreshTrigger }) => {
    const [deployments, setDeployments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDeployments = useCallback(async () => {
        try {
            const data = await api.getDeployments();
            setDeployments(data);
        } catch (error) {
            console.error('Error fetching deployments:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDeployments();
        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchDeployments, 5000);
        return () => clearInterval(interval);
    }, [fetchDeployments, refreshTrigger]);

    if (loading && deployments.length === 0) return <div className="loader">Loading Dashboard...</div>;

    return (
        <div className="card">
            <h2 className="title">Cloud Control Plane Dashboard</h2>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Provider</th>
                            <th>Image</th>
                            <th>Region</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No active deployments</td>
                            </tr>
                        ) : (
                            deployments.map((d) => (
                                <tr key={d.id}>
                                    <td className="monospace">{d.id.substring(0, 12)}...</td>
                                    <td>
                                        <span className={`badge provider-${d.provider.toLowerCase()}`}>
                                            {d.provider}
                                        </span>
                                    </td>
                                    <td>{d.container_image}</td>
                                    <td>{d.region}</td>
                                    <td>
                                        <span className={`badge status-${d.status.toLowerCase()}`}>
                                            {d.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
