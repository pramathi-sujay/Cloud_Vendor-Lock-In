import React, { useState } from 'react';

const PROVIDER_BADGE = {
    aws: 'badge badge-aws',
    gcp: 'badge badge-gcp',
    azure: 'badge badge-azure',
};
const STATUS_BADGE = {
    running: 'badge badge-running',
    deploying: 'badge badge-deploying',
    failed: 'badge badge-failed',
    pending: 'badge badge-pending',
};

const RefreshIcon = ({ spin }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={spin ? 'spin' : ''}>
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
);
const ChevLeft = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const BoxIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>;

const PER_PAGE = 6;

const DeploymentTable = ({ deployments, loading, onRefresh }) => {
    const [page, setPage] = useState(1);
    const total = deployments.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));
    const rows = deployments.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="card-header-icon" style={{ background: 'linear-gradient(135deg,#0369a1,#0ea5e9)', boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}>
                        <BoxIcon />
                    </div>
                    <div>
                        <p className="card-header-title">Active Deployments</p>
                        <p className="card-header-sub">{total} total records across all providers</p>
                    </div>
                </div>
                <button className="refresh-btn" onClick={onRefresh} disabled={loading}>
                    <RefreshIcon spin={loading} /> Refresh
                </button>
            </div>

            {/* Table */}
            <div className="table-wrap" style={{ flex: 1 }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Deployment ID</th>
                            <th>Provider</th>
                            <th>Image</th>
                            <th>Region</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan="6">
                                    <div className="empty-state">
                                        <div className="empty-icon"><BoxIcon /></div>
                                        <p>No deployments yet</p>
                                        <span>Launch your first container from the panel on the left</span>
                                    </div>
                                </td>
                            </tr>
                        ) : rows.map((d) => {
                            const provClass = PROVIDER_BADGE[d.provider?.toLowerCase()] || 'badge badge-pending';
                            const statClass = STATUS_BADGE[d.status?.toLowerCase()] || 'badge badge-pending';
                            const idStr = typeof d.id === 'string' ? d.id.substring(0, 13) : String(d.id);
                            const isPulse = d.status?.toLowerCase() === 'deploying';
                            return (
                                <tr key={d.id}>
                                    <td><span className="id-cell">{idStr}…</span></td>
                                    <td>
                                        <span className={provClass}>
                                            <span className="badge-dot" />
                                            {d.provider?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
                                        {d.container_image || d.image}
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{d.region}</td>
                                    <td>
                                        <span className={statClass}>
                                            <span className={`badge-dot${isPulse ? ' badge-dot-pulse' : ''}`} />
                                            {d.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="tbl-action-btn">View Logs</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pages > 1 && (
                <div className="pagination">
                    <span>Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} of {total}</span>
                    <div className="page-btns">
                        <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevLeft /></button>
                        {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                            <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                        ))}
                        <button className="page-btn" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}><ChevRight /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeploymentTable;
