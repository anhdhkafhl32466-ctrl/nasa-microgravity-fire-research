import React from 'react';
import { Menu, Activity, ShieldCheck, Clock, Terminal } from 'lucide-react';
import { MOCK_MISSION_META } from '../data/mockData';

export default function Header({ onOpenMobile, activeTabTitle }) {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

  return (
    <header className="sticky top-0 z-30 bg-nasa-navy/80 backdrop-blur-md border-b border-nasa-border px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="p-2 -ml-1 text-nasa-muted hover:text-white rounded-lg border border-nasa-border/60 hover:bg-white/5 lg:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="hidden sm:inline-block text-nasa-subtle uppercase">NASA GRC</span>
          <span className="hidden sm:inline-block text-nasa-border">/</span>
          <span className="text-nasa-blueLight font-semibold tracking-wide uppercase">{activeTabTitle}</span>
        </div>
      </div>

      {/* Flight Operations Status Bar */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nasa-surface/60 border border-nasa-border text-nasa-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-nasa-ok" />
          <span className="text-[11px]">FLIGHT INTEGRITY: <strong className="text-white">NOMINAL</strong></span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nasa-surface/60 border border-nasa-border text-nasa-muted">
          <Activity className="w-3.5 h-3.5 text-nasa-blueLight animate-pulse" />
          <span className="text-[11px]">ISS ORBIT: <strong className="text-white">{MOCK_MISSION_META.orbitVelocity}</strong></span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nasa-blue/10 border border-nasa-blue/30 text-nasa-blueLight">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] font-bold tracking-wider">UTC 2026</span>
        </div>
      </div>
    </header>
  );
}
