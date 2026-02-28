import React from 'react';

/**
 * Symmetrical cross layout (viewBox 0 0 100 100):
 *        AWS (50, 18)
 * Azure (18,50)  SkyPort (50,50)  GCP (82,50)
 */
const MultiCloudDiagram = () => {
  const cx = 50;
  const cy = 50;
  const rx = 2.2;

  const aws  = { x: 40, y: 13, w: 20, h: 10, cx: 50, cy: 18 };
  const azure = { x: 8, y: 45, w: 20, h: 10, cx: 18, cy: 50 };
  const gcp  = { x: 72, y: 45, w: 20, h: 10, cx: 82, cy: 50 };
  const skyport = { x: 38, y: 44, w: 24, h: 12, cx: 50, cy: 50 };

  const lineAws   = { x1: 50, y1: 23, x2: 50, y2: 44 };
  const lineAzure = { x1: 28, y1: 50, x2: 38, y2: 50 };
  const lineGcp  = { x1: 72, y1: 50, x2: 62, y2: 50 };

  return (
    <div className="multi-cloud-diagram">
      <svg
        viewBox="0 0 100 100"
        className="multi-cloud-diagram-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="skyport-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5DF6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="line-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="60%" stopColor="rgba(109,93,246,0.2)" />
            <stop offset="100%" stopColor="rgba(109,93,246,0.08)" />
          </linearGradient>
          <filter id="skyport-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Thin connection lines (2px) — base stroke */}
        <line x1={lineAws.x1} y1={lineAws.y1} x2={lineAws.x2} y2={lineAws.y2} className="diagram-line" />
        <line x1={lineAzure.x1} y1={lineAzure.y1} x2={lineAzure.x2} y2={lineAzure.y2} className="diagram-line" />
        <line x1={lineGcp.x1} y1={lineGcp.y1} x2={lineGcp.x2} y2={lineGcp.y2} className="diagram-line" />

        {/* Subtle animated gradient flow toward SkyPort */}
        <line x1={lineAws.x1} y1={lineAws.y1} x2={lineAws.x2} y2={lineAws.y2} className="diagram-line-flow" />
        <line x1={lineAzure.x1} y1={lineAzure.y1} x2={lineAzure.x2} y2={lineAzure.y2} className="diagram-line-flow diagram-line-flow-2" />
        <line x1={lineGcp.x1} y1={lineGcp.y1} x2={lineGcp.x2} y2={lineGcp.y2} className="diagram-line-flow diagram-line-flow-3" />

        {/* Small red data pulse moving along each line */}
        <path d={`M ${lineAws.x1} ${lineAws.y1} L ${lineAws.x2} ${lineAws.y2}`} pathLength="100" className="diagram-pulse" />
        <path d={`M ${lineAzure.x1} ${lineAzure.y1} L ${lineAzure.x2} ${lineAzure.y2}`} pathLength="100" className="diagram-pulse diagram-pulse-2" />
        <path d={`M ${lineGcp.x1} ${lineGcp.y1} L ${lineGcp.x2} ${lineGcp.y2}`} pathLength="100" className="diagram-pulse diagram-pulse-3" />

        {/* Nodes: rounded rectangles */}
        <rect x={aws.x} y={aws.y} width={aws.w} height={aws.h} rx={rx} ry={rx} className="diagram-node diagram-node-aws" />
        <text x={aws.cx} y={aws.cy + 0.9} className="diagram-node-label diagram-node-label-aws" textAnchor="middle">AWS</text>

        <rect x={azure.x} y={azure.y} width={azure.w} height={azure.h} rx={rx} ry={rx} className="diagram-node diagram-node-azure" />
        <text x={azure.cx} y={azure.cy + 0.9} className="diagram-node-label" textAnchor="middle">Azure</text>

        <rect x={gcp.x} y={gcp.y} width={gcp.w} height={gcp.h} rx={rx} ry={rx} className="diagram-node diagram-node-gcp" />
        <text x={gcp.cx} y={gcp.cy + 0.9} className="diagram-node-label" textAnchor="middle">GCP</text>

        <rect x={skyport.x} y={skyport.y} width={skyport.w} height={skyport.h} rx={rx} ry={rx} className="diagram-node diagram-node-skyport" filter="url(#skyport-shadow)" />
        <text x={skyport.cx} y={skyport.cy - 0.8} className="diagram-node-label diagram-node-label-skyport" textAnchor="middle">SkyPort</text>
        <text x={skyport.cx} y={skyport.cy + 1.8} className="diagram-node-label diagram-node-label-skyport-sm" textAnchor="middle">Engine</text>
      </svg>
      <style dangerouslySetInnerHTML={{
        __html: `
          .multi-cloud-diagram {
            width: 100%;
            max-width: 380px;
            margin: 0 auto;
            padding: 24px;
            background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 100% 100%, 20px 20px, 20px 20px;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.12);
          }
          .multi-cloud-diagram-svg {
            width: 100%;
            height: auto;
            display: block;
          }
          .diagram-line {
            stroke: rgba(255,255,255,0.06);
            stroke-width: 0.5;
            fill: none;
          }
          .diagram-line-flow {
            stroke: url(#line-flow-grad);
            stroke-width: 0.5;
            stroke-dasharray: 3 8;
            fill: none;
            animation: diagram-flow 4.5s ease-in-out infinite;
          }
          .diagram-line-flow-2 { animation-delay: 0.6s; }
          .diagram-line-flow-3 { animation-delay: 1.2s; }
          @keyframes diagram-flow {
            0%, 100% { stroke-dashoffset: 0; opacity: 0.5; }
            50% { stroke-dashoffset: 11; opacity: 0.85; }
          }
          .diagram-pulse {
            fill: none;
            stroke: #dc2626;
            stroke-width: 1.4;
            stroke-linecap: round;
            stroke-dasharray: 2 98;
            animation: diagram-pulse-move 4.5s ease-in-out infinite;
          }
          .diagram-pulse-2 { animation-delay: 0.6s; }
          .diagram-pulse-3 { animation-delay: 1.2s; }
          @keyframes diagram-pulse-move {
            0% { stroke-dashoffset: 0; opacity: 0.85; }
            100% { stroke-dashoffset: 100; opacity: 0.85; }
          }
          .diagram-node {
            stroke-width: 0.6;
            fill: var(--bg-card);
          }
          .diagram-node-aws {
            fill: rgba(255,153,0,0.08);
            stroke: #FF9900;
          }
          .diagram-node-gcp {
            fill: rgba(66,133,244,0.08);
            stroke: #4285F4;
          }
          .diagram-node-azure {
            fill: rgba(0,120,212,0.08);
            stroke: #0078D4;
          }
          .diagram-node-skyport {
            fill: url(#skyport-fill);
            stroke: rgba(139,92,246,0.25);
          }
          .diagram-node-label {
            font-size: 3px;
            font-weight: 600;
            fill: var(--text-primary);
            font-family: 'Inter', -apple-system, sans-serif;
          }
          .diagram-node-label-aws { fill: #ffffff; }
          .diagram-node-label-skyport,
          .diagram-node-label-skyport-sm { fill: #ffffff; font-size: 2.6px; }
          .diagram-node-label-skyport-sm { font-size: 2px; opacity: 0.95; }
        `
      }} />
    </div>
  );
};

export default MultiCloudDiagram;
