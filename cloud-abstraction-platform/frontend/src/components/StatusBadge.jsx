import React from 'react';

const COLOR_MAP = {
    green: { cls: 'green', dot: '#22c55e' },
    yellow: { cls: 'yellow', dot: '#eab308' },
    red: { cls: 'red', dot: '#ef4444' },
    blue: { cls: 'blue', dot: '#3b82f6' },
    // aliases
    success: { cls: 'green', dot: '#22c55e' },
    warning: { cls: 'yellow', dot: '#eab308' },
    error: { cls: 'red', dot: '#ef4444' },
    info: { cls: 'blue', dot: '#3b82f6' },
    running: { cls: 'green', dot: '#22c55e' },
    deploying: { cls: 'blue', dot: '#3b82f6' },
    failed: { cls: 'red', dot: '#ef4444' },
    stopped: { cls: 'yellow', dot: '#eab308' },
    operational: { cls: 'green', dot: '#22c55e' },
    degraded: { cls: 'yellow', dot: '#eab308' },
    down: { cls: 'red', dot: '#ef4444' },
};

const StatusBadge = ({ status = 'green', label, pulse = false }) => {
    const mapping = COLOR_MAP[status?.toLowerCase()] || COLOR_MAP.blue;
    const displayLabel = label ?? status;

    return (
        <span className={`status-badge ${mapping.cls}`}>
            {pulse ? (
                <span
                    style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: mapping.dot,
                        display: 'inline-block',
                        boxShadow: `0 0 0 0 ${mapping.dot}66`,
                        animation: 'pulse-ring 1.5s infinite',
                    }}
                />
            ) : (
                <span className="status-dot" style={{ background: mapping.dot }} />
            )}
            {displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1)}
        </span>
    );
};

export default StatusBadge;
