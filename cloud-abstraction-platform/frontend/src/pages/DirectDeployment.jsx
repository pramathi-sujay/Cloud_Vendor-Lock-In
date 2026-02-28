import React, { useState } from 'react';
import DeploymentForm from '../components/DeploymentForm';
import StatusBadge from '../components/StatusBadge';
import MockPreview from '../components/MockPreview';
import { useAppState } from '../context/AppStateContext';

const STEPS = [
    { id: 1, title: 'Initializing Container', desc: 'Pulling image from registry...' },
    { id: 2, title: 'Allocating Cloud Resources', desc: 'Provisioning compute & networking...' },
    { id: 3, title: 'Configuring Environment', desc: 'Injecting secrets and environment variables...' },
    { id: 4, title: 'Deploying Image', desc: 'Pushing image to cloud environment...' },
    { id: 5, title: 'Verifying Health', desc: 'Running health checks on endpoints...' },
];

const CheckIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const DirectDeployment = () => {
    const { addDeployment, updateDeploymentStatus } = useAppState();
    const [activeStep, setActiveStep] = useState(0);
    const [deploying, setDeploying] = useState(false);
    const [deployMeta, setDeployMeta] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [newDeployId, setNewDeployId] = useState(null);

    const handleDeployment = (result, form) => {
        setDeployMeta(form);
        setDeploying(true);
        setActiveStep(1);

        // Add to global state
        const id = addDeployment({
            provider: form.provider,
            container_image: form.image,
            region: form.region,
            instanceType: form.instanceType || 't3.small',
            envVars: form.envVars || '',
        });
        setNewDeployId(id);

        let step = 1;
        const timer = setInterval(() => {
            step += 1;
            setActiveStep(step);
            if (step >= STEPS.length) {
                clearInterval(timer);
                setTimeout(() => {
                    setActiveStep(STEPS.length + 1); // Mark all as done
                    setDeploying(false);
                    updateDeploymentStatus(id, 'running');
                }, 800);
            }
        }, 1200);
    };

    const reset = () => {
        setActiveStep(0);
        setDeploying(false);
        setDeployMeta(null);
        setShowPreview(false);
        setNewDeployId(null);
    };

    return (
        <div className="page-content animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">Direct Deployment</h1>
                <p className="page-subtitle">Configure and launch containers to any cloud provider instantly</p>
            </div>

            <div className="deployment-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 24 }}>
                {/* ── Left: Form ────────────────────────────────────────────────── */}
                <div>
                    <div className="glass-card-nohover" style={{ marginBottom: 20 }}>
                        <div className="card-header">
                            <div className="card-header-icon" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="card-header-title">Launch Deployment</div>
                                <div className="card-header-sub">Deploy containers to any cloud provider</div>
                            </div>
                        </div>
                        <DeploymentForm onDeploymentSuccess={handleDeployment} />
                    </div>

                    {/* Quick Info */}
                    <div className="glass-card-nohover" style={{ background: 'rgba(99,102,241,0.04)', border: '1px dashed var(--border-accent)' }}>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            <strong>Pro Tip:</strong> SkyPort automatically abstracts IAM roles and security groups based on your region selection. Zero-config multi-cloud networking enabled by default.
                        </p>
                    </div>
                </div>

                {/* ── Right: Stepper Panel ───────────────────────────────────────── */}
                <div>
                    <div className="glass-card-nohover" style={{ height: '100%', minHeight: 460, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Live Deployment Preview</div>
                                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>Real-time provisioning feed</div>
                            </div>
                            {activeStep > 0 && !deploying && (
                                <button className="btn-secondary" onClick={reset} style={{ padding: '6px 14px', fontSize: 12 }}>↺ Reset Form</button>
                            )}
                        </div>

                        {/* Idle state */}
                        {activeStep === 0 && (
                            <div style={{ textAlign: 'center', padding: '80px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: 20, margin: '0 auto 20px',
                                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                                }}>🚀</div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Ready to Deploy</div>
                                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', maxWidth: 260, margin: '0 auto' }}>
                                    Configure your container on the left and click "Deploy Container" to begin.
                                </div>
                            </div>
                        )}

                        {/* Deploying stepper */}
                        {activeStep > 0 && (
                            <div style={{ flex: 1 }}>
                                {/* Deploy meta banner */}
                                {deployMeta && (
                                    <div style={{
                                        background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                                        borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontSize: 12.5,
                                        display: 'flex', alignItems: 'center', gap: 10,
                                    }}>
                                        <span>📦</span>
                                        <span style={{ color: 'var(--text-secondary)' }}>
                                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>{deployMeta.image}</span>
                                            {' → '}<span style={{ fontWeight: 700, color: 'var(--text-accent)' }}>{deployMeta.provider?.toUpperCase()}</span>
                                            {' '}{deployMeta.region}
                                        </span>
                                    </div>
                                )}

                                {/* Stepper */}
                                <div className="stepper-container">
                                    {STEPS.map((step, i) => {
                                        const stepNum = i + 1;
                                        const isDone = activeStep > stepNum;
                                        const isActive = activeStep === stepNum;
                                        const isPending = activeStep < stepNum;

                                        return (
                                            <div
                                                key={step.id}
                                                className={`stepper-step${isDone ? ' done' : isActive ? ' active' : ''}`}
                                            >
                                                <div className="stepper-dot-wrap">
                                                    <div className={`stepper-dot${isDone ? ' done' : isActive ? ' active' : ''}`}>
                                                        {isDone ? (
                                                            <CheckIcon size={14} />
                                                        ) : isActive ? (
                                                            <span className="step-spinner" style={{
                                                                width: 16, height: 16,
                                                                border: '2px solid rgba(99,102,241,0.3)',
                                                                borderTopColor: 'var(--accent)',
                                                                borderRadius: '50%',
                                                                animation: 'spin 0.7s linear infinite',
                                                                display: 'block',
                                                            }} />
                                                        ) : stepNum}
                                                    </div>
                                                </div>
                                                <div className="stepper-content">
                                                    <div className="stepper-title" style={{ color: isPending ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                                                        {step.title}
                                                    </div>
                                                    <div className="stepper-desc">{step.desc}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Final Status */}
                                {activeStep >= STEPS.length && !deploying && (
                                    <div style={{
                                        marginTop: 24, padding: '16px 20px',
                                        background: 'rgba(34,197,94,0.08)',
                                        border: '1px solid rgba(34,197,94,0.3)',
                                        borderRadius: 12,
                                        animation: 'fadeInUp 0.3s ease',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                            <span style={{ fontSize: 24 }}>🎉</span>
                                            <div>
                                                <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--status-green)' }}>Deployment Successful!</div>
                                                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>Container is live and serving traffic.</div>
                                            </div>
                                            <StatusBadge status="running" label="Live" pulse style={{ marginLeft: 'auto' }} />
                                        </div>

                                        <div style={{ borderTop: '1px solid rgba(34,197,94,0.2)', paddingTop: 12 }}>
                                            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Access Your Application</div>
                                            <button
                                                onClick={() => setShowPreview(true)}
                                                className="btn-primary"
                                                style={{ width: '100%', fontSize: 12.5, padding: '10px', boxShadow: '0 4px 12px rgba(34,197,94,0.25)', background: 'var(--gradient-green)' }}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6 }}>
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                                Open Application URL
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showPreview && (
                <MockPreview
                    type="deployment"
                    details={{ ...deployMeta, id: newDeployId }}
                    onClose={() => setShowPreview(false)}
                />
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 1100px) {
          .deployment-layout { grid-template-columns: 1fr !important; }
        }
      `}} />
        </div>
    );
};

export default DirectDeployment;
