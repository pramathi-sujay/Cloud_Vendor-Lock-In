import React, { useState, useEffect, useRef } from 'react';
import StatusBadge from '../components/StatusBadge';
import MockPreview from '../components/MockPreview';
import { useAppState } from '../context/AppStateContext';

const MIGRATION_STEPS = [
  { id: 1, label: 'Upload', desc: 'Analyzing source configs' },
  { id: 2, label: 'Analysis', desc: 'Mapping cloud services' },
  { id: 3, label: 'Plan', desc: 'Generating AWS/Azure template' },
  { id: 4, label: 'Transform', desc: 'Applying AI code patches' },
  { id: 5, label: 'Execute', desc: 'Provisioning & Cutover' }
];

const CLOUD_OPTIONS = ['GCP', 'AWS', 'Azure'];

const CLOUD_STYLES = {
  GCP:   { bg: '#FF9900', shadow: 'rgba(255,153,0,0.3)' },
  AWS:   { bg: '#4285F4', shadow: 'rgba(66,133,244,0.3)' },
  Azure: { bg: '#22c55e', shadow: 'rgba(34,197,94,0.3)' },
};

const LOG_MESSAGES = [
  '[info] Initializing Migration Engine v4.2...',
  '[info] Connecting to GCP Project ID: infra-prod-431...',
  '[info] Fetching active Cloud Run services...',
  '[info] Found 12 containers in asia-east1.',
  '✓ Source discovery complete.',
  '[info] Analyzing IAM permissions...',
  '[warn] High similarity detected with AWS IAM Policy template.',
  '[info] Mapping Cloud Run → AWS App Runner (Native abstraction)...',
  '✓ Service mapping finalized.',
  '[info] Generating Terraform state for target environment...',
  '[info] Provisioning S3 State bucket in us-east-1...',
  '✓ AWS Infrastructure ready.',
  '[info] Deploying migration sidecar proxy...',
  '[info] Synchronizing persistent volumes (GCS → S3)...',
  '✓ Data integrity check passed (3.2 TB verified).',
  '[info] Initiating DNS cutover (Simulated)...',
  '[info] Route53 health checks passing on new nodes.',
  '✓ Migration cutover successful.',
  '[success] Migration of "CustomerPortal" from GCP to AWS complete.',
];

const MigrationEngine = () => {
  const { addMigration } = useAppState();
  const [cloudSelectionComplete, setCloudSelectionComplete] = useState(false);
  const [sourceCloud, setSourceCloud] = useState('');
  const [targetCloud, setTargetCloud] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [githubUrl, setGithubUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollTop = logEndRef.current.scrollHeight;
  }, [logs]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));

  const handleSourceChange = (e) => {
    const next = e.target.value;
    if (next && next === targetCloud) setTargetCloud(sourceCloud || CLOUD_OPTIONS.find(c => c !== next));
    setSourceCloud(next);
  };

  const handleTargetChange = (e) => {
    const next = e.target.value;
    if (next && next === sourceCloud) setSourceCloud(targetCloud || CLOUD_OPTIONS.find(c => c !== next));
    setTargetCloud(next);
  };

  const canStartMapping = sourceCloud && targetCloud && sourceCloud !== targetCloud;

  const handleStartMapping = () => {
    if (!canStartMapping) return;
    setCloudSelectionComplete(true);
  };

  const handleChangePath = () => {
    setCloudSelectionComplete(false);
    setSourceCloud('');
    setTargetCloud('');
  };

  const runMigration = () => {
    setIsExecuting(true);
    setLogs([]);
    let currentLog = 0;

    const interval = setInterval(() => {
      if (currentLog < LOG_MESSAGES.length) {
        setLogs(prev => [...prev, LOG_MESSAGES[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        setIsFinished(true);
        setShowSuccessPopup(true);
        addMigration({
          id: `mig-${Date.now().toString(36)}`,
          source: sourceCloud,
          target: targetCloud,
          status: 'completed',
          date: new Date().toISOString().split('T')[0],
          services: ['Cloud Storage', 'Cloud Run'],
          linesChanged: 42
        });
      }
    }, 600);
  };

  return (
    <div className="page-content animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">AI Cloud Migration Engine</h1>
        <p className="page-subtitle">Automated, zero-downtime cloud workload migration</p>
      </div>

      <div className="migration-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 24 }}>

        {/* ── Left Column: Config & Stepper ────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Migration Path Card: selection panel OR diagram */}
          <div className="glass-card-nohover migration-path-card" style={{ position: 'relative', overflow: 'hidden', minHeight: 160 }}>
            {!cloudSelectionComplete ? (
              <div className="migration-selection-panel animate-fade-in" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Select Migration Path</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 280 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Source Cloud</label>
                    <select
                      className="migration-cloud-select"
                      value={sourceCloud}
                      onChange={handleSourceChange}
                      aria-label="Source cloud"
                      style={{ width: '100%' }}
                    >
                      <option value="">Select source...</option>
                      {CLOUD_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Target Cloud</label>
                    <select
                      className="migration-cloud-select"
                      value={targetCloud}
                      onChange={handleTargetChange}
                      aria-label="Target cloud"
                      style={{ width: '100%' }}
                    >
                      <option value="">Select target...</option>
                      {CLOUD_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ padding: '10px 24px', opacity: canStartMapping ? 1 : 0.6, cursor: canStartMapping ? 'pointer' : 'not-allowed' }}
                  disabled={!canStartMapping}
                  onClick={handleStartMapping}
                >
                  Start Migration Mapping
                </button>
              </div>
            ) : (
              <div className="migration-diagram-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 0, minHeight: 160 }}>
                <div className="migration-diagram-panel animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 140, gap: 40, position: 'relative' }}>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: sourceCloud ? (CLOUD_STYLES[sourceCloud]?.bg ?? '#4285F4') : 'var(--bg-card)',
                        boxShadow: sourceCloud ? `0 0 20px ${CLOUD_STYLES[sourceCloud]?.shadow}` : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <span style={{ fontWeight: 800, color: 'white', fontSize: 14 }}>{sourceCloud || '—'}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>SOURCE</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>asia-east1</div>
                  </div>

                  <div style={{ position: 'relative', width: 100 }}>
                    <div style={{ height: 2, background: 'var(--border)', width: '100%' }} />
                    <div className={`migration-travel-dot ${currentStep === 5 && isExecuting ? 'moving' : ''}`} />
                  </div>

                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: targetCloud ? (CLOUD_STYLES[targetCloud]?.bg ?? '#FF9900') : 'var(--bg-card)',
                        boxShadow: targetCloud ? `0 0 20px ${CLOUD_STYLES[targetCloud]?.shadow}` : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <span style={{ fontWeight: 800, color: 'white', fontSize: 14 }}>{targetCloud || '—'}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>TARGET</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>us-east-1</div>
                  </div>
                </div>
                <div style={{ padding: '0 20px 16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="migration-change-path-btn"
                    onClick={handleChangePath}
                  >
                    Change Migration Path
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Card */}
          <div className="glass-card-nohover">
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Migration Workflow</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 10px' }}>
              <div style={{ position: 'absolute', top: 15, left: 30, right: 30, height: 2, background: 'var(--border)', zIndex: 0 }} />
              {MIGRATION_STEPS.map((s, i) => (
                <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 1, width: 60 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: currentStep > i ? 'var(--accent)' : 'var(--bg-card)',
                    border: `2px solid ${currentStep > i ? 'var(--accent)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                    color: currentStep > i ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.3s'
                  }}>
                    {currentStep > i + 1 ? '✓' : s.id}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: currentStep > i ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Interactive Steps ──────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* STEP 1: UPLOAD */}
          {currentStep === 1 && (
            <div className="glass-card-nohover animate-fade-in-up">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Upload Project for Analysis</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 20 }}>Provide a GitHub repository URL or upload a ZIP file to begin cloud dependency analysis.</p>

              <div style={{ position: 'relative', marginBottom: 20 }}>
                <input
                  type="text"
                  placeholder="Enter GitHub repository URL..."
                  className="search-input"
                  style={{ width: '100%', height: 44, paddingLeft: 16, background: 'rgba(255,255,255,0.03)', color: '#ffffff' }}
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              <button
                className="btn-primary"
                style={{ width: 'fit-content', padding: '10px 24px' }}
                onClick={nextStep}
              >
                Analyze Cloud Dependencies
              </button>
            </div>
          )}

          {/* STEP 2: ANALYSIS */}
          {currentStep === 2 && (
            <div className="glass-card-nohover animate-fade-in-up">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 10 }}>
                Cloud Dependency Report
                <span className="live-badge" style={{ fontSize: 9 }}>Detected</span>
              </h3>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Detected Provider:</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#4285F4' }}>Google Cloud Platform (GCP)</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Targets: AWS, Azure</div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Services</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>• Cloud Storage (3 references) → S3 / Blob Storage</div>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>• Firestore (2 references) → DynamoDB / Cosmos DB</div>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>• Pub/Sub (1 reference) → SNS/SQS / Service Bus</div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Configuration Risks</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 12, color: 'var(--status-red)' }}>• Hardcoded bucket name detected</div>
                  <div style={{ fontSize: 12, color: 'var(--status-red)' }}>• Service account JSON found</div>
                </div>
              </div>

              <div style={{ padding: '12px 16px', background: 'rgba(244,63,94,0.05)', borderRadius: 8, border: '1px solid rgba(244,63,94,0.1)', marginBottom: 24 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Vendor Lock-In Score: </span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#f43f5e' }}>78%</span>
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={nextStep}>
                Generate Migration Plan
              </button>
            </div>
          )}

          {/* STEP 3: PLAN */}
          {currentStep === 3 && (
            <div className="glass-card-nohover animate-fade-in-up">
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Migration Plan</h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 20 }}>Target Cloud: Amazon Web Services (AWS) / Microsoft Azure</p>

              <div className="table-wrap" style={{ marginBottom: 24 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>GCP Service</th>
                      <th>AWS Equivalent</th>
                      <th>Azure Equivalent</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: 12 }}>Cloud Storage</td>
                      <td style={{ fontSize: 12 }}>S3</td>
                      <td style={{ fontSize: 12 }}>Blob Storage</td>
                      <td><span style={{ color: 'var(--status-green)', fontSize: 11, fontWeight: 700 }}>Low</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: 12 }}>Firestore</td>
                      <td style={{ fontSize: 12 }}>DynamoDB</td>
                      <td style={{ fontSize: 12 }}>Cosmos DB</td>
                      <td><span style={{ color: 'var(--status-yellow)', fontSize: 11, fontWeight: 700 }}>Medium</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: 12 }}>Pub/Sub</td>
                      <td style={{ fontSize: 12 }}>SNS/SQS</td>
                      <td style={{ fontSize: 12 }}>Service Bus</td>
                      <td><span style={{ color: 'var(--status-yellow)', fontSize: 11, fontWeight: 700 }}>Medium</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Estimated Code Changes</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>14 lines</div>
                </div>
                <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>IAM Policy Updates</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Required</div>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={nextStep}>
                Generate Transformation Patch
              </button>
            </div>
          )}

          {/* STEP 4: TRANSFORM */}
          {currentStep === 4 && (
            <div className="glass-card-nohover animate-fade-in-up" style={{ width: '100%' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Code Transformation Preview</h3>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 20 }}>AI-generated AWS/Azure equivalent based on detected GCP services.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#f43f5e', marginBottom: 8 }}>Before (GCP)</div>
                  <div style={{ background: '#0a0f1e', padding: 12, borderRadius: 8, fontSize: 10, fontFamily: 'monospace', color: '#e2e8f0', minHeight: 180, border: '1px solid rgba(244,63,94,0.1)' }}>
                    {`const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

async function uploadFile() {
  await storage.bucket('my-bucket').upload('file.txt');
}`}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--status-green)', marginBottom: 8 }}>After (AWS)</div>
                  <div style={{ background: '#0a0f1e', padding: 12, borderRadius: 8, fontSize: 10, fontFamily: 'monospace', color: '#e2e8f0', minHeight: 180, border: '1px solid rgba(74,222,128,0.1)' }}>
                    {`const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function uploadFile() {
  await s3.upload({
    Bucket: 'my-bucket',
    Key: 'file.txt',
    Body: fs.readFileSync('file.txt')
  }).promise();
}`}
                  </div>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%' }} onClick={() => { nextStep(); runMigration(); }}>
                Execute Migration
              </button>
            </div>
          )}

          {/* STEP 5: EXECUTE (Terminal & Success) */}
          {currentStep === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Execution Log */}
              <div className="glass-card-nohover animate-fade-in-up" style={{ flex: 1, minHeight: 320, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: isExecuting ? 'var(--status-green)' : '#94a3b8', boxShadow: isExecuting ? '0 0 8px var(--status-green)' : 'none' }} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Migration Log Terminal</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>pts-001/skyport</span>
                </div>

                <div
                  ref={logEndRef}
                  style={{
                    background: '#0a0f1e', borderRadius: 8, padding: 16, border: '1px solid var(--border)',
                    flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: 12, color: '#e2e8f0',
                    lineHeight: 1.6, scrollBehavior: 'smooth'
                  }}
                >
                  {logs.length === 0 && <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Awaiting transmission...</div>}
                  {logs.map((log, i) => (
                    <div key={i} style={{
                      color: log?.startsWith('[success]') || log?.startsWith('✓') ? 'var(--status-green)' :
                        log?.startsWith('[warn]') ? 'var(--status-yellow)' : '#e2e8f0',
                      marginBottom: 4
                    }}>
                      <span style={{ opacity: 0.3, marginRight: 8 }}>{`0${i + 1}`.slice(-2)}</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Banner */}
              {isFinished && (
                <div className="glass-card-nohover animate-fade-in-up" style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(99,102,241,0.05))',
                  border: '1px solid rgba(34,197,94,0.3)',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16, letterSpacing: '0.06em' }}>
                    Access Your Migrated Application
                  </div>

                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 20 }}>🎉</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--status-green)' }}>Migration Complete: CustomerPortal</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>Target: {targetCloud} us-east-1 · Data: 3.2TB · Downtime: 0ms</div>
                    </div>
                    <StatusBadge status="running" pulse />
                  </div>

                  <div style={{ borderTop: '1px solid rgba(34,197,94,0.2)', paddingTop: 16 }}>
                    <button
                      onClick={() => setShowPreview(true)}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', background: 'var(--gradient-green)', boxShadow: '0 4px 14px rgba(34,197,94,0.25)' }}
                    >
                      🚀 Open Migrated Application URL
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showSuccessPopup && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <div className="success-modal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="success-modal-title">Migration Successful!</h2>
            <p className="success-modal-desc">
              Your application <strong>"CustomerPortal"</strong> has been successfully migrated from <strong>{sourceCloud} (asia-east1)</strong> to <strong>{targetCloud} (us-east-1)</strong> with zero downtime.
            </p>
            <div className="success-modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowSuccessPopup(false);
                  setShowPreview(true);
                }}
              >
                🚀 Open Migrated Application
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowSuccessPopup(false)}
              >
                Back to Engine
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <MockPreview
          type="migration"
          details={{
            image: 'CustomerPortal',
            provider: targetCloud,
            region: 'us-east-1',
            id: 'mig-live-42'
          }}
          onClose={() => setShowPreview(false)}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .search-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .migration-cloud-select {
          appearance: none;
          -webkit-appearance: none;
          background: rgba(15,23,42,0.6);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 40px 12px 16px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .migration-cloud-select:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .migration-cloud-select option {
          background: var(--bg-base);
          color: var(--text-primary);
        }
        .migration-change-path-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: #ffffff;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .migration-change-path-btn:hover {
          background: rgba(255,255,255,0.05);
        }
        .migration-selection-panel,
        .migration-diagram-panel,
        .migration-diagram-wrap {
          animation: migration-panel-fade 0.35s ease-out;
        }
        @keyframes migration-panel-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .migration-travel-dot {
          position: absolute;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--accent);
          top: -4px;
          left: 0;
          box-shadow: 0 0 10px var(--accent);
          opacity: 0;
        }
        .migration-travel-dot.moving {
          opacity: 1;
          animation: migrationTravel 2s infinite linear;
        }
        @keyframes migrationTravel {
          from { left: 0; }
          to { left: 100%; }
        }
      `}} />
    </div>
  );
};

export default MigrationEngine;