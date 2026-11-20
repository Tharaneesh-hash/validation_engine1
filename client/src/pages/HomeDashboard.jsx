import React from 'react';
import { 
  ArrowRight, 
  GitFork, 
  Cpu, 
  Minimize2, 
  CheckSquare, 
  Terminal, 
  Network, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Zap,
  BookOpen,
  ShieldAlert,
  ArrowRightLeft,
  Cookie
} from 'lucide-react';


  const quickModules = [
    {
      id: 'security-dashboard',
      title: 'Security Monitoring Dashboard',
      desc: 'Real-time telemetry of HTTP requests, response headers, cookie compliance, and DFA state transitions.',
      icon: ShieldAlert,
      color: '#dc2626',
      badge: 'Security Module'
    },
    {
      id: 'http-headers',
      title: 'HTTP Header Inspector',
      desc: 'Inspect, validate RFC 7230/7231 request and response headers, audit security policies (HSTS, CSP, XFO).',
      icon: ArrowRightLeft,
      color: '#0284c7',
      badge: 'RFC 7230/7231'
    },
    {
      id: 'cookie-security',
      title: 'Cookie Security Engine',
      desc: 'Validate RFC 6265 Cookie and Set-Cookie attributes, flags (HttpOnly, Secure, SameSite) and expiry.',
      icon: Cookie,
      color: '#f59e0b',
      badge: 'RFC 6265'
    },
    {
      id: 'session-dfa',
      title: 'Session Cookie DFA State Machine',
      desc: 'Formal FSM tracking session lifecycles across ISSUED, ACTIVE, EXPIRED, and REVOKED with strict invariants.',
      icon: GitFork,
      color: '#10b981',
      badge: 'FLAT Session DFA'
    },
    {
      id: 'form',
      title: 'Web Form Validation',
      desc: 'Real-time 9-field registration form with character-by-character syntax checking and invalid index detection.',
      icon: CheckSquare,
      color: '#4f46e5',
      badge: 'Module 2'
    },
    {
      id: 'playground',
      title: 'Regex Playground',
      desc: 'Test custom & preset regular expressions against sample inputs with execution timing and catastrophic backtracking safeguards.',
      icon: Terminal,
      color: '#0284c7',
      badge: 'Module 3'
    },
    {
      id: 'nfa',
      title: 'Thompson\'s Construction',
      desc: 'Convert parsed regular expressions into Non-Deterministic Finite Automata (NFA) with ε-transitions.',
      icon: GitFork,
      color: '#8b5cf6',
      badge: 'Module 4'
    },
    {
      id: 'dfa',
      title: 'Subset Construction',
      desc: 'Transform NFAs into Deterministic Finite Automata (DFA) through iterative ε-closure computation.',
      icon: Cpu,
      color: '#10b981',
      badge: 'Module 5'
    },
    {
      id: 'simulator',
      title: 'DFA Simulator',
      desc: 'Simulate character-by-character transitions δ(q, a) = q\' in O(n) linear execution time with complete step trace.',
      icon: Zap,
      color: '#f59e0b',
      badge: 'Module 6'
    },
    {
      id: 'minimizer',
      title: 'Hopcroft\'s Minimization',
      desc: 'Partition DFA states into equivalence classes to yield the unique, minimal state automaton.',
      icon: Minimize2,
      color: '#ec4899',
      badge: 'Module 7'
    },
    {
      id: 'visualizer',
      title: 'DFA Visualizer',
      desc: 'Interactive step-through animation highlighting active states, input tokens, and accept/reject criteria.',
      icon: Network,
      color: '#6366f1',
      badge: 'Module 8'
    },
    {
      id: 'network',
      title: 'Network Monitoring',
      desc: 'Analyze live HTTP request latency, client-server RTT, response status codes, and network topology.',
      icon: Activity,
      color: '#0ea5e9',
      badge: 'Module 11'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '600',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Sparkles size={14} color="#a5b4fc" />
            <span>Academic Triad &bull; FLAT + Networks + Full-Stack</span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem' }}>
            Web Form Input Validation Engine <br />
            <span style={{ color: '#93c5fd' }}>Using Regular Expressions & DFA</span>
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '1.75rem', maxWidth: '780px' }}>
            An intelligent, multi-layer verification platform bridging <strong>Formal Languages & Automata Theory</strong>, 
            <strong> Computer Networks</strong>, and <strong>Full-Stack Web Engineering</strong>. Validate inputs via high-speed 
            deterministic automata, inspect state graphs, measure client-server round-trip latency, and safeguard web applications.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('form')}
              className="btn btn-primary"
              style={{
                background: '#4f46e5',
                padding: '0.75rem 1.4rem',
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.4)'
              }}
            >
              <span>Test Registration Form</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className="btn btn-outline"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.75rem 1.4rem',
                fontSize: '0.95rem'
              }}
            >
              <Terminal size={16} />
              <span>Regex Playground</span>
            </button>
          </div>
        </div>
      </div>

      {/* Triad Integration Cards */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>
          Interdisciplinary Engineering Pillars
        </h3>
        <div className="grid-cols-3">
          <div className="card" style={{ borderTop: '4px solid #4f46e5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Cpu size={22} color="#4f46e5" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b' }}>
                1. Formal Languages & Automata
              </h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Transforms regular grammars into NFAs using <strong>Thompson's Construction</strong>, converts to DFAs via 
              <strong> Subset Construction</strong>, achieves canonical state representation with <strong>Hopcroft's Minimization</strong>, 
              and executes simulation in linear \(O(n)\) time.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4f46e5' }}>
              &delta;(q, a) &rarr; q' &bull; &epsilon;-Closure &bull; Equivalence Classes
            </div>
          </div>

          <div className="card" style={{ borderTop: '4px solid #0284c7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Activity size={22} color="#0284c7" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0c4a6e' }}>
                2. Computer Networks
              </h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Demonstrates <strong>Client-Server HTTP/REST</strong> protocols over TCP/IP, analyzes packet round-trip time (RTT), 
              enforces HTTP status semantics (200, 400, 422, 500), and records telemetry without capturing sensitive credentials.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#0284c7' }}>
              TCP Latency &bull; REST API &bull; CORS &bull; TLS/HTTPS Ready
            </div>
          </div>

          <div className="card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Layers size={22} color="#10b981" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#064e3b' }}>
                3. Full-Stack Web Development
              </h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              Built using the production <strong>MERN stack</strong> (MongoDB, Express, React, Node.js). Features dual-layer 
              client and server validation, responsive typography, state management, and real-time interactive diagrams.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#10b981' }}>
              React 18 &bull; Express ES Modules &bull; Mongoose &bull; Vite
            </div>
          </div>
        </div>
      </div>

      {/* FLAT Pipeline Flowchart */}
      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '1rem' }}>
          <BookOpen size={20} color="var(--color-primary)" />
          Automata Theory Pipeline (FLAT Execution Model)
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Every input validation rule traverses this deterministic formal pipeline. From high-level regex grammar down to an 
          optimal minimal state machine executed against incoming byte streams:
        </p>

        {/* Pipeline Diagram (SVG Visual Flow) */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowX: 'auto',
          gap: '1rem'
        }}>
          {/* Step 1 */}
          <div style={{
            background: 'white',
            border: '2px solid #818cf8',
            borderRadius: '8px',
            padding: '1rem',
            minWidth: '150px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#4f46e5', textTransform: 'uppercase' }}>Step 1</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', margin: '0.25rem 0' }}>Regex Pattern</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Lexical Parsing & AST</div>
          </div>

          <div style={{ color: '#818cf8', fontWeight: 'bold' }}>&rarr;</div>

          {/* Step 2 */}
          <div style={{
            background: 'white',
            border: '2px solid #8b5cf6',
            borderRadius: '8px',
            padding: '1rem',
            minWidth: '150px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#8b5cf6', textTransform: 'uppercase' }}>Step 2</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', margin: '0.25rem 0' }}>Thompson NFA</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>&epsilon;-transitions inductive base</div>
          </div>

          <div style={{ color: '#8b5cf6', fontWeight: 'bold' }}>&rarr;</div>

          {/* Step 3 */}
          <div style={{
            background: 'white',
            border: '2px solid #0284c7',
            borderRadius: '8px',
            padding: '1rem',
            minWidth: '150px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#0284c7', textTransform: 'uppercase' }}>Step 3</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', margin: '0.25rem 0' }}>Subset DFA</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Powerset &epsilon;-closure reduction</div>
          </div>

          <div style={{ color: '#0284c7', fontWeight: 'bold' }}>&rarr;</div>

          {/* Step 4 */}
          <div style={{
            background: 'white',
            border: '2px solid #ec4899',
            borderRadius: '8px',
            padding: '1rem',
            minWidth: '150px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#ec4899', textTransform: 'uppercase' }}>Step 4</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', margin: '0.25rem 0' }}>Hopcroft Minimization</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Partition refinement \(O(k \cdot n \log n)\)</div>
          </div>

          <div style={{ color: '#ec4899', fontWeight: 'bold' }}>&rarr;</div>

          {/* Step 5 */}
          <div style={{
            background: '#ecfdf5',
            border: '2px solid #10b981',
            borderRadius: '8px',
            padding: '1rem',
            minWidth: '150px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>Step 5</div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#064e3b', margin: '0.25rem 0' }}>DFA Execution</div>
            <div style={{ fontSize: '0.75rem', color: '#047857' }}>Linear \(O(n)\) validation trace</div>
          </div>
        </div>
      </div>

      {/* Modules Quick Access Grid */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: '#0f172a' }}>
          Application Modules & Quick Access
        </h3>
        <div className="grid-cols-4">
          {quickModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div 
                key={mod.id} 
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  borderTop: `3px solid ${mod.color}`
                }}
                onClick={() => setActiveTab(mod.id)}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{
                      background: `${mod.color}15`,
                      color: mod.color,
                      padding: '0.45rem',
                      borderRadius: '8px',
                      display: 'inline-flex'
                    }}>
                      <Icon size={20} />
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      color: mod.color,
                      background: `${mod.color}15`,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px'
                    }}>
                      {mod.badge}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.4rem' }}>
                    {mod.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {mod.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: mod.color,
                  marginTop: '1.25rem'
                }}>
                  <span>Launch Module</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
