import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAppState } from '../context/AppStateContext';
import ThemeToggle from './ThemeToggle';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PAGE_LABELS = {
  Home: { title: 'Overview', subtitle: 'Platform dashboard & quick actions', icon: '🏠', keywords: ['home', 'start', 'welcome'] },
  Dashboard: { title: 'Cloud Fleet Dashboard', subtitle: 'Real-time multi-cloud orchestration', icon: '📊', keywords: ['fleet', 'status', 'overview'] },
  DirectDeployment: { title: 'Direct Deployment', subtitle: 'Deploy containers to AWS / GCP / Azure', icon: '🚀', keywords: ['aws', 'gcp', 'azure', 'cloud', 'container', 'docker', 'deploy'] },
  ActiveDeployments: { title: 'Active Deployments', subtitle: 'Manage running fleet instances', icon: '📦', keywords: ['running', 'manage', 'instances', 'active'] },
  Clusters: { title: 'Clusters', subtitle: 'Kubernetes & Resource groups', icon: '☸️', keywords: ['k8s', 'kubernetes', 'nodes', 'resource'] },
  Migration: { title: 'Migration Engine', subtitle: 'AI-assisted cloud workload mapping', icon: '🔄', keywords: ['move', 'transfer', 'mapping', 'aws', 'gcp', 'azure', 'cloud'] },
  MigrationHistory: { title: 'Migration History', subtitle: 'Archive of past transfers', icon: '📜', keywords: ['logs', 'archive', 'past', 'history'] },
  Monitoring: { title: 'Testing & Monitoring', subtitle: 'Full observability & health validation', icon: '📈', keywords: ['health', 'stats', 'metrics', 'monitoring'] },
  Logs: { title: 'System Logs', subtitle: 'Real-time infrastructure events', icon: '📄', keywords: ['events', 'error', 'debug', 'history'] },
  ApiHealth: { title: 'API Health', subtitle: 'Gateway & Service status', icon: '❤️', keywords: ['uptime', 'latency', 'api', 'gateway'] },
  Settings: { title: 'System Settings', subtitle: 'Manage account & team preferences', icon: '⚙️', keywords: ['account', 'profile', 'theme', 'config'] },
  Integrations: { title: 'External Integrations', subtitle: 'Connect to 3rd party services', icon: '🔌', keywords: ['connect', 'api', 'tools', 'plugins'] },
  Support: { title: 'Help & Support', subtitle: 'Documentation & feedback', icon: '❓', keywords: ['docs', 'help', 'contact', 'feedback'] },
};

const Navbar = ({ activePage, onPageChange }) => {
  const { deployments, migrations } = useAppState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  const meta = PAGE_LABELS[activePage] || { title: activePage, subtitle: '' };

  // Filter results
  const getFilteredResults = () => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results = [];

    // Local function to calculate relevance score
    const calculateScore = (title, subtitle, key = '', keywords = []) => {
      let score = 0;
      const t = title.toLowerCase();
      const s = subtitle.toLowerCase();
      const k = key.toLowerCase();

      // Priority 1: Exact match (High Priority)
      if (t === q || k === q) {
        score += 2000;
      }
      // Priority 2: Title or Key starts with query (Critical for "A" -> "Active")
      else if (t.startsWith(q) || k.startsWith(q)) {
        score += 1500;
      }
      // Priority 3: A word in the title starts with the query (e.g., "AWS" in "GCP → AWS")
      else if (t.split(/[\s→·]+/).some(word => word.startsWith(q))) {
        score += 1200;
      }
      // Priority 4: Keywords contain the query prefix
      else if (keywords.some(kw => kw.startsWith(q))) {
        score += 1000;
      }
      // Priority 5: Title or Key contains query
      else if (t.includes(q) || k.includes(q)) {
        score += 500;
      }
      // Priority 6: Subtitle starts with query
      else if (s.startsWith(q)) {
        score += 200;
      }
      // Priority 7: Subtitle/Description contains query
      else if (s.includes(q)) {
        score += 100;
      }

      return score;
    };

    // Pages
    Object.entries(PAGE_LABELS).forEach(([key, val]) => {
      const score = calculateScore(val.title, val.subtitle, key, val.keywords || []);
      if (score > 400) { // Higher threshold to filter noise
        results.push({ type: 'page', key, ...val, score });
      }
    });

    // Deployments
    deployments.forEach(d => {
      const score = calculateScore(d.container_image, `${d.provider.toUpperCase()} · ${d.region} · ${d.status}`, d.id);
      if (score > 400) {
        results.push({
          type: 'deployment',
          key: d.id,
          title: d.container_image,
          subtitle: `${d.provider.toUpperCase()} · ${d.region} · ${d.status}`,
          score
        });
      }
    });

    // Migrations
    migrations.forEach(m => {
      const score = calculateScore(`${m.source} → ${m.target} Migration`, `${m.status} · ${m.date}`, m.id);
      if (score > 400) {
        results.push({
          type: 'migration',
          key: m.id,
          title: `${m.source} → ${m.target} Migration`,
          subtitle: `${m.status} · ${m.date}`,
          score
        });
      }
    });

    // Sort by score (descending) and then return top 8
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  };

  const results = getFilteredResults();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    if (item.type === 'page') {
      onPageChange(item.key);
    } else if (item.type === 'deployment' || item.type === 'migration') {
      onPageChange(item.type === 'deployment' ? 'Dashboard' : 'MigrationHistory');
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsSearchOpen(true);
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title-group">
        <div className="navbar-title">{meta.title}</div>
        <div className="navbar-subtitle">{meta.subtitle}</div>
      </div>

      <div className="navbar-spacer" />

      {/* In-Place Search Container */}
      <div className="navbar-search-container" ref={containerRef}>
        <div className="navbar-search" onClick={() => searchRef.current?.focus()}>
          <SearchIcon />
          <input
            ref={searchRef}
            type="text"
            className="navbar-search-input"
            placeholder="Search deployments, migrations..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={handleKeyDown}
          />
          {!searchQuery && <span className="navbar-search-shortcut">⌘K</span>}
        </div>

        {/* Inline Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div className="search-dropdown">
            <div className="dropdown-results">
              {results.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No results found for "{searchQuery}"
                </div>
              ) : (
                results.map((item, idx) => (
                  <div
                    key={item.key + idx}
                    className={`dropdown-item ${idx === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="dropdown-item-icon">
                      {item.type === 'page' ? item.icon : item.type === 'deployment' ? '📦' : '🔄'}
                    </div>
                    <div className="dropdown-item-info">
                      <div className="dropdown-item-label">{item.title}</div>
                      <div className="dropdown-item-desc">{item.subtitle}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className="navbar-actions">
        <ThemeToggle />
        <button className="navbar-icon-btn" title="Global Notifications">
          <BellIcon />
          <span className="notif-badge">2</span>
        </button>
        <div className="navbar-avatar" onClick={() => onPageChange('Settings')}>
          SP
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .navbar-title-group {
          display: flex;
          flex-direction: column;
        }
        .navbar-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          padding: 6px 14px;
          border-radius: 10px;
          width: 320px;
          color: var(--text-muted);
          cursor: text;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .navbar-search:hover {
          border-color: var(--border-accent);
          background: var(--bg-glass-hover);
        }
        .navbar-search-placeholder {
          font-size: 11.5px;
          flex: 1;
        }
        .navbar-search-shortcut {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 4px;
          background: var(--bg-glass);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .navbar-search { display: none; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
