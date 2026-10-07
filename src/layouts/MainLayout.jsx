import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout({ activeTab, onSelectTab, children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'overview': return 'Mission Overview';
      case 'explore': return 'Research Catalogue';
      case 'detail': return 'Experiment Telemetry';
      case 'compare': return 'Telemetry Comparison';
      case 'insights': return 'AI Combustion Insights';
      case 'about': return 'Mission Context';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-nasa-void text-nasa-text flex overflow-x-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTabTitle={getTabTitle(activeTab)}
          onOpenMobile={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Global Mission Footer */}
        <footer className="border-t border-nasa-border/60 bg-nasa-navy/50 py-4 px-6 text-center text-xs font-mono text-nasa-subtle">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>NASA Microgravity Fire Research Dashboard · Scientific Prototype UI</span>
            <span className="text-nasa-blueLight">Frontend Architecture: React + Vite + Tailwind CSS</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
