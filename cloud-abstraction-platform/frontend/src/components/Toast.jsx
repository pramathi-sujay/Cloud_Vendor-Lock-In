import React, { useEffect, useRef } from 'react';

const STYLES = {
    success: { cls: 'toast toast-success', color: '#4ade80', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> },
    error: { cls: 'toast toast-error', color: '#f87171', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
    info: { cls: 'toast toast-info', color: '#818cf8', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> },
};

export const Toast = ({ toasts, onDismiss }) => (
    <div className="toast-container">
        {toasts.map(t => {
            const s = STYLES[t.type] || STYLES.info;
            return (
                <div key={t.id} className={s.cls}>
                    <span className="toast-icon">{s.icon}</span>
                    <span className="toast-msg">{t.message}</span>
                    <button className="toast-close" onClick={() => onDismiss(t.id)}>×</button>
                </div>
            );
        })}
    </div>
);

export default Toast;
