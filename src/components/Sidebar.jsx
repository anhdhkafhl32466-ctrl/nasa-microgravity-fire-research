import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  GitCompare, 
  Sparkles, 
  Info, 
  Flame, 
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MOCK_MISSION_META } from '../data/mockData';

export default function Sidebar({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'explore', label: 'Explore Research', icon: Search, badge: '128' },
    { id: 'compare', label: 'Compare Telemetry', icon: GitCompare },
    { id: 'insights', label: 'AI & Insights', icon: Sparkles, badge: '✦' },
    { id: 'about', label: 'About Mission', icon: Info },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-nasa-void/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-nasa-navy/95 backdrop-blur-xl border-r border-nasa-border flex flex-col
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-nasa-border flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 via-nasa-blue to-cyan-400 p-[1px] shadow-lg shadow-nasa-blue/20">
            <div className="w-full h-full bg-nasa-navy rounded-full flex items-center justify-center">
              <span className="font-space font-extrabold text-[11px] tracking-wider text-white">NASA</span>
            </div>
            {/* Pulsing orbital dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border-2 border-nasa-navy"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <b className="font-space font-bold text-sm tracking-wide text-white">FIRE RESEARCH</b>
              <Flame className="w-3.5 h-3.5 text-nasa-flame" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-nasa-blueLight uppercase block">
              MICROGRAVITY · ISS
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3.5 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-nasa-subtle">
            Mission Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-nasa-blue/15 text-white border border-nasa-blue/40 shadow-sm shadow-nasa-blue/20' 
                    : 'text-nasa-muted hover:text-white hover:bg-white/[0.04] border border-transparent'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-nasa-blueLight' : 'text-nasa-muted group-hover:text-nasa-text'}`} />
                  <span className="tracking-wide">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`
                    text-[10px] font-mono px-2 py-0.5 rounded-full border
                    ${isActive 
                      ? 'bg-nasa-blueLight/20 text-nasa-blueLight border-nasa-blueLight/30' 
                      : 'bg-white/5 text-nasa-muted border-white/10 group-hover:border-white/20'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Telemetry Status Box (Bottom) */}
        <div className="p-4 m-3.5 rounded-xl bg-nasa-surface/80 border border-nasa-border shadow-inner font-mono text-[11px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-nasa-border/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nasa-ok animate-pulse-subtle"></span>
              <span className="font-semibold text-nasa-text">CIR TELEMETRY</span>
            </div>
            <span className="text-[10px] text-nasa-muted font-mono">LIVE SYNC</span>
          </div>
          <div className="space-y-1 text-nasa-muted text-[10px]">
            <div className="flex justify-between">
              <span>ALTITUDE</span>
              <span className="text-white font-medium">{MOCK_MISSION_META.altitude}</span>
            </div>
            <div className="flex justify-between">
              <span>INCLINATION</span>
              <span className="text-white font-medium">{MOCK_MISSION_META.inclination}</span>
            </div>
            <div className="flex justify-between">
              <span>FACILITY</span>
              <span className="text-nasa-blueLight truncate max-w-[110px]" title={MOCK_MISSION_META.facility}>Destiny Lab CIR</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-nasa-border text-[10px] text-nasa-subtle font-mono flex items-center justify-between">
          <span>PROTOTYPE v2.4</span>
          <span className="text-nasa-cyan">NASA GRC</span>
        </div>
      </aside>
    </>
  );
}
