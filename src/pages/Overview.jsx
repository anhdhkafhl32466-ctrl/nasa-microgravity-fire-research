import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Flame, ArrowRight, ShieldCheck, Cpu, Database, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import AIInsightCard from '../components/AIInsightCard';
import SafetyIndicator from '../components/SafetyIndicator';
import { 
  MOCK_STATS, 
  MOCK_EXPERIMENTS, 
  MOCK_TEMPERATURE_HISTORY, 
  MOCK_AI_INSIGHTS 
} from '../data/mockData';

export default function Overview({ onNavigateTab, onSelectExperiment }) {
  const recentExperiments = MOCK_EXPERIMENTS.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Hero Mission Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-nasa-navy via-nasa-surface to-nasa-navy border border-nasa-border p-6 sm:p-8 shadow-nasa-panel">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-nasa-blue/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-nasa-cyan/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nasa-blue/10 border border-nasa-blue/30 text-nasa-blueLight text-xs font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-nasa-cyan animate-pulse"></span>
            MISSION CONTROL · COMBUSTION INTEGRATED RACK (CIR)
          </div>

          <h1 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
            Microgravity Fire Research Platform
          </h1>

          <p className="text-sm sm:text-base text-nasa-muted mb-6 leading-relaxed">
            Understanding fundamental combustion physics beyond Earth: how flames ignite, stabilize, and extinguish on the International Space Station, Moon, and Mars to keep deep-space crews safe.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('explore')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-nasa-blue hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-nasa-blue/25 hover:translate-y-[-1px]"
            >
              Explore Research Catalogue <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('compare')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-nasa-surface hover:bg-nasa-surface/80 border border-nasa-border text-nasa-text text-xs sm:text-sm font-medium transition-all"
            >
              Compare Telemetry Data
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            category={stat.category}
          />
        ))}
      </div>

      {/* 3. Primary Flame Combustion Chart (Recharts) */}
      <ChartCard
        title="Flame Temperature History Over Time"
        subtitle="Kelvin (K) · Microgravity (μg) vs. Earth Standard (1 g)"
        badge="Recharts Live Telemetry"
        footerNote="NASA Glenn GRC Flight Database (FLEX / CIR)"
      >
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_TEMPERATURE_HISTORY} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} 
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                domain={[0, 2200]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(11, 19, 41, 0.95)', 
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
              />
              <Line 
                type="monotone" 
                dataKey="microgravity" 
                name="Microgravity μg (Spherical)" 
                stroke="#38bdf8" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#38bdf8', stroke: '#0b132b', strokeWidth: 1.5 }}
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="earth" 
                name="Earth 1 g (Buoyant Convective)" 
                stroke="#f97316" 
                strokeWidth={2.5} 
                strokeDasharray="4 4"
                dot={{ r: 4, fill: '#f97316', stroke: '#0b132b', strokeWidth: 1.5 }}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* 4. Two-Column Dashboard Section: Recent Experiments & AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Experiments List */}
        <div className="lg:col-span-2 bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-nasa-border/60">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-nasa-flame" />
                <h3 className="font-space font-semibold text-base text-white">
                  Recent Flight Experiments
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('explore')}
                className="text-xs font-mono text-nasa-blueLight hover:underline"
              >
                View all catalogue →
              </button>
            </div>

            <div className="space-y-2.5">
              {recentExperiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => onSelectExperiment(exp.id)}
                  className="p-3 rounded-lg bg-nasa-surface/60 border border-nasa-border/50 hover:border-nasa-blueLight/50 hover:bg-nasa-surface transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-nasa-blueLight px-2 py-0.5 rounded bg-nasa-navy border border-nasa-border">
                      #{exp.id}
                    </span>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-nasa-blueLight transition-colors">
                        {exp.title}
                      </h4>
                      <p className="text-[11px] text-nasa-subtle font-mono">
                        {exp.fuel} · {exp.gravity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-mono text-nasa-muted">
                      {exp.dur}s @ {exp.temp}K
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${exp.risk === 'High' ? 'bg-nasa-flame/10 text-nasa-flame border-nasa-flame/30' : 'bg-nasa-cyan/10 text-nasa-cyan border-nasa-cyan/30'}`}>
                      {exp.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-nasa-border/40 text-[11px] font-mono text-nasa-subtle flex justify-between items-center">
            <span>CIR Operational Cycle: Expedition 69/70</span>
            <span className="text-nasa-ok">● ALL SYSTEMS RUNNING</span>
          </div>
        </div>

        {/* AI Insight Card Component */}
        <AIInsightCard
          insight={MOCK_AI_INSIGHTS[0]}
          onSelectExperiment={onSelectExperiment}
          onExploreInsights={() => onNavigateTab('insights')}
        />
      </div>

      {/* 5. Safety Indicators & System Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SafetyIndicator />

        {/* System Diagnostics & Telemetry Pipeline Preview */}
        <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-nasa-border/60">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-nasa-blueLight" />
                <h3 className="font-space font-semibold text-base text-white">
                  Telemetry Diagnostics
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nasa-ok/10 border border-nasa-ok/30 text-nasa-ok">
                STREAM HEALTHY
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-nasa-surface/60 border border-nasa-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-nasa-cyan" />
                  <span className="text-nasa-text">CIR High-Speed Imaging Sensor</span>
                </div>
                <span className="text-nasa-ok">30 fps @ 1080p</span>
              </div>

              <div className="p-3 rounded-lg bg-nasa-surface/60 border border-nasa-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-nasa-flameLight" />
                  <span className="text-nasa-text">Radiometer IR Calibration</span>
                </div>
                <span className="text-nasa-blueLight">±0.2 K Drift (Nominal)</span>
              </div>

              <div className="p-3 rounded-lg bg-nasa-surface/60 border border-nasa-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-nasa-ok" />
                  <span className="text-nasa-text">Cabin Atmosphere Inerting Valve</span>
                </div>
                <span className="text-white">Standby (Auto-Seal)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-nasa-border/40 text-[11px] font-mono text-nasa-subtle flex justify-between">
            <span>Ground Link: Ku-Band TDRS</span>
            <span className="text-nasa-cyan">Latency: 142ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
