import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Terminal,
  GitFork,
  Cpu,
  PlayCircle,
  Minimize2,
  Network,
  History,
  BarChart3,
  Activity,
  Layers,
  ShieldAlert,
  ArrowRightLeft,
  Cookie
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard, category: 'Overview' },
  { id: 'security-dashboard', label: 'Security Dashboard', icon: ShieldAlert, category: 'HTTP & Cookie Security' },
  { id: 'http-headers', label: 'HTTP Header Inspector', icon: ArrowRightLeft, category: 'HTTP & Cookie Security' },
  { id: 'cookie-security', label: 'Cookie Security Engine', icon: Cookie, category: 'HTTP & Cookie Security' },
  { id: 'session-dfa', label: 'Session Cookie DFA', icon: GitFork, category: 'HTTP & Cookie Security' },
  { id: 'form', label: 'Web Form Validation', icon: CheckSquare, category: 'Validation Engine' },
  { id: 'playground', label: 'Regex Playground', icon: Terminal, category: 'Validation Engine' },
  { id: 'nfa', label: 'Regex → NFA (Thompson)', icon: GitFork, category: 'FLAT Automata' },
  { id: 'dfa', label: 'NFA → DFA (Subset)', icon: Cpu, category: 'FLAT Automata' },
  { id: 'simulator', label: 'DFA Simulator', icon: PlayCircle, category: 'FLAT Automata' },
  { id: 'minimizer', label: 'DFA Minimization', icon: Minimize2, category: 'FLAT Automata' },
  { id: 'visualizer', label: 'DFA Visualizer', icon: Network, category: 'FLAT Automata' },
  { id: 'history', label: 'Validation History', icon: History, category: 'Persistence & Analytics' },
  { id: 'analytics', label: 'Performance Analytics', icon: BarChart3, category: 'Persistence & Analytics' },
  { id: 'network', label: 'Network Monitoring', icon: Activity, category: 'Computer Networks' },
];

export default function Sidebar({ activeTab, setActiveTab }) {  
  // Group navigation items by category
  const categories = [
    'Overview',
    'HTTP & Cookie Security',
    'Validation Engine',
    'FLAT Automata',
    'Persistence & Analytics',
    'Computer Networks'
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--color-bg-sidebar)',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      borderRight: '1px solid rgba(255,255,255,0.08)'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          background: 'var(--color-primary)',
          color: 'white',
          padding: '0.45rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Layers size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '0.95rem', fontWeight: '700', letterSpacing: '-0.01em', color: '#ffffff' }}>
            Validation Engine
          </h2>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Regex &bull; DFA &bull; Networks
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto' }}>
        {categories.map((category) => {
          const items = NAV_ITEMS.filter(item => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '1.25rem' }}>
              <div style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                color: '#64748b',
                fontWeight: '700',
                letterSpacing: '0.06em',
                padding: '0.25rem 0.75rem 0.5rem'
              }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.55rem 0.85rem',
                        width: '100%',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: isActive ? '600' : '400',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        background: isActive ? 'rgba(79, 70, 229, 0.25)' : 'transparent',
                        borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                        transition: 'all 0.15s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.color = '#e2e8f0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#94a3b8';
                        }
                      }}
                    >
                      <Icon size={16} color={isActive ? '#818cf8' : '#94a3b8'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        fontSize: '0.75rem',
        color: '#64748b',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Stack</span>
          <span style={{ color: '#94a3b8' }}>MERN + FLAT</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Version</span>
          <span style={{ color: '#94a3b8' }}>1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
