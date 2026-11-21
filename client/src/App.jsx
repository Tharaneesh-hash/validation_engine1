import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomeDashboard from './pages/HomeDashboard';
import WebFormValidation from './pages/WebFormValidation';
import RegexPlayground from './pages/RegexPlayground';
import NfaConverter from './pages/NfaConverter';
import DfaConverter from './pages/DfaConverter';
import DfaSimulator from './pages/DfaSimulator';
import DfaMinimizer from './pages/DfaMinimizer';
import DfaVisualizer from './pages/DfaVisualizer';
import ValidationHistory from './pages/ValidationHistory';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NetworkMonitoring from './pages/NetworkMonitoring';
import HttpHeaderInspector from './pages/HttpHeaderInspector';
import CookieInspector from './pages/CookieInspector';
import SessionCookieDFA from './pages/SessionCookieDFA';
import SecurityMonitoringDashboard from './pages/SecurityMonitoringDashboard';
import api from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientLatency, setClientLatency] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const response = await api.get('/health');
      setHealthData(response.data.data);
      setClientLatency(response.latencyMs);
    } catch (err) {
      setHealthData(null);
      console.error('Error fetching backend health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    // Periodic health ping every 30 seconds for live network telemetry
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HomeDashboard setActiveTab={setActiveTab} healthData={healthData} />;
      case 'security-dashboard':
        return <SecurityMonitoringDashboard />;
      case 'http-headers':
        return <HttpHeaderInspector />;
      case 'cookie-security':
        return <CookieInspector />;
      case 'session-dfa':
        return <SessionCookieDFA />;
      case 'form':
        return <WebFormValidation />;
      case 'playground':
        return <RegexPlayground />;
      case 'nfa':
        return <NfaConverter />;
      case 'dfa':
        return <DfaConverter />;
      case 'simulator':
        return <DfaSimulator />;
      case 'minimizer':
        return <DfaMinimizer />;
      case 'visualizer':
        return <DfaVisualizer />;
      case 'history':
        return <ValidationHistory />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'network':
        return <NetworkMonitoring />;
      default:
        return <HomeDashboard setActiveTab={setActiveTab} healthData={healthData} />;
    }
  };

  return (
    <div className="app-container">
      {/* Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        <Navbar
          activeTab={activeTab}
          healthData={healthData}
          loading={loading}
          onRefresh={fetchHealth}
          clientLatency={clientLatency}
        />

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
