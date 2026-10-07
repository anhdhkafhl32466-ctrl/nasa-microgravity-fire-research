import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { GitCompare, Plus, Check } from 'lucide-react';
import ComparisonTable from '../components/ComparisonTable';
import ChartCard from '../components/ChartCard';
import { MOCK_EXPERIMENTS } from '../data/mockData';

export default function Compare() {
  const [selectedIds, setSelectedIds] = useState(["024", "031", "017"]);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace the last one
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const selectedExperiments = MOCK_EXPERIMENTS.filter(e => selectedIds.includes(e.id));

  // Chart data preparation
  const durationChartData = selectedExperiments.map((e, idx) => ({
    name: `Probe ${"ABC"[idx]} (#${e.id})`,
    duration: e.dur,
    fuel: e.fuel,
    color: ["#38bdf8", "#06b6d4", "#f97316"][idx % 3]
  }));

  const tempChartData = selectedExperiments.map((e, idx) => ({
    name: `Probe ${"ABC"[idx]} (#${e.id})`,
    temp: e.temp,
    color: ["#38bdf8", "#06b6d4", "#f97316"][idx % 3]
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-nasa-border">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-nasa-cyan uppercase">
            SIDE-BY-SIDE TELEMETRY MATRIX
          </div>
          <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-1">
            Compare Research Probes
          </h1>
          <p className="text-xs sm:text-sm text-nasa-muted mt-1">
            Evaluate quantitative combustion variance across differing fuel chemistries, gravitational forces, and oxidizer ratios.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-nasa-surface border border-nasa-border text-nasa-blueLight font-semibold">
            {selectedIds.length} OF 3 PROBES SELECTED
          </span>
        </div>
      </div>

      {/* Selectable Experiment Chips */}
      <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-4 shadow-nasa-card">
        <div className="text-xs font-mono text-nasa-subtle uppercase mb-3 flex items-center gap-1.5">
          <GitCompare className="w-3.5 h-3.5 text-nasa-cyan" />
          Select up to 3 experiments to benchmark:
        </div>

        <div className="flex flex-wrap gap-2.5">
          {MOCK_EXPERIMENTS.map((exp) => {
            const isSelected = selectedIds.includes(exp.id);
            const index = selectedIds.indexOf(exp.id);
            return (
              <button
                key={exp.id}
                onClick={() => toggleSelect(exp.id)}
                className={`
                  flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all border
                  ${isSelected 
                    ? 'bg-nasa-blue/20 text-white border-nasa-blueLight/60 shadow-sm' 
                    : 'bg-nasa-surface/60 text-nasa-muted border-nasa-border hover:border-nasa-borderHover hover:text-white'}
                `}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${isSelected ? 'bg-nasa-blueLight text-nasa-navy' : 'bg-nasa-navy text-nasa-subtle'}`}>
                  {isSelected ? "ABC"[index] : <Plus className="w-3 h-3" />}
                </span>
                <span>#{exp.id} · {exp.title}</span>
                <span className="text-[10px] text-nasa-subtle font-sans">({exp.gravityType})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Table */}
      <ComparisonTable experiments={selectedExperiments} />

      {/* Comparative Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Flame Duration Comparison */}
        <ChartCard
          title="Burn Duration Benchmark (Seconds)"
          subtitle="Direct comparison of steady-state flame lifespan"
          badge="Burn Kinetics"
        >
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={durationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(11, 19, 41, 0.95)', 
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'monospace'
                  }} 
                />
                <Bar dataKey="duration" name="Burn Duration (s)" radius={[4, 4, 0, 0]}>
                  {durationChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Peak Flame Temperature Comparison */}
        <ChartCard
          title="Peak Temperature Comparison (Kelvin)"
          subtitle="Maximum thermocouple recording across reaction envelope"
          badge="Thermal Radiometry"
        >
          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tempChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} domain={[0, 2200]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(11, 19, 41, 0.95)', 
                    borderColor: 'rgba(56, 189, 248, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontFamily: 'monospace'
                  }} 
                />
                <Bar dataKey="temp" name="Peak Temperature (K)" radius={[4, 4, 0, 0]}>
                  {tempChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
