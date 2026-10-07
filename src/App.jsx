import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Overview from './pages/Overview';
import Explore from './pages/Explore';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import Insights from './pages/Insights';
import About from './pages/About';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExpId, setSelectedExpId] = useState('024');

  // Handle direct navigation to an experiment detail
  const handleSelectExperiment = (expId) => {
    setSelectedExpId(expId);
    setActiveTab('detail');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <MainLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {activeTab === 'overview' && (
        <Overview
          onNavigateTab={setActiveTab}
          onSelectExperiment={handleSelectExperiment}
        />
      )}

      {activeTab === 'explore' && (
        <Explore
          onSelectExperiment={handleSelectExperiment}
        />
      )}

      {activeTab === 'detail' && (
        <Detail
          experimentId={selectedExpId}
          onBack={() => setActiveTab('explore')}
          onSelectExperiment={setSelectedExpId}
        />
      )}

      {activeTab === 'compare' && (
        <Compare />
      )}

      {activeTab === 'insights' && (
        <Insights
          onSelectExperiment={handleSelectExperiment}
        />
      )}

      {activeTab === 'about' && (
        <About />
      )}
    </MainLayout>
  );
}
