import React from 'react';
import { RefreshCw, Server, Database, Wifi } from 'lucide-react';
import { NAV_ITEMS } from './Sidebar';

export default function Navbar({ activeTab, healthData, loading, onRefresh, clientLatency }) {
  const currentItem = NAV_ITEMS.find(item => item.id === activeTab) || { label: 'Dashboard' };
  const apiOnline = Boolean(healthData);

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--color-border)',
      padding: '0.85rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Breadcrumb & Title */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
          <span>Validation Platform</span>
          <span>/</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{currentItem.label}</span>
        </div>
        <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', marginTop: '0.1rem' }}>
          {currentItem.label}
        </h2>
      </div>

      {/* Right status indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* API Server status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '500',
          background: apiOnline ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
          color: apiOnline ? 'var(--color-success)' : 'var(--color-danger)',
          border: `1px solid ${apiOnline ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`
        }}>
          <Server size={13} />
          <span>API: {apiOnline ? 'Online' : 'Offline'}</span>
        </div>

        {/* Database status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.65rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '500',
          background: healthData?.database?.state === 'connected' ? '#f0fdf4' : '#fffbeb',
          color: healthData?.database?.state === 'connected' ? '#16a34a' : '#d97706',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <Database size={13} />
          <span>DB: {healthData?.database?.state || 'checking'}</span>
        </div>

        {/* Client-to-Server Latency */}
        {clientLatency !== null && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: '#eef2ff',
            color: 'var(--color-primary)',
            border: '1px solid #c7d2fe'
          }}>
            <Wifi size={13} />
            <span>RTT: {clientLatency} ms</span>
          </div>
        )}

        {/* Refresh / Ping Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="btn btn-outline"
          title="Refresh connection & fetch latest metrics"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Pinging...' : 'Ping'}</span>
        </button>
      </div>
    </header>
  );
}
