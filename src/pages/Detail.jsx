import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { ArrowLeft, Flame, Thermometer, Gauge, Clock, Wind, CheckCircle2, ShieldAlert } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { 
  MOCK_EXPERIMENTS, 
  MOCK_TEMPERATURE_HISTORY, 
  MOCK_FLAME_RADIUS_EVOLUTION 
} from '../data/mockData';

export default function Detail({ experimentId, onBack, onSelectExperiment }) {
  const exp = MOCK_EXPERIMENTS.find(e => e.id === experimentId) || MOCK_EXPERIMENTS[0];

  return (
    <div className="space-y-6">
      {/* Back Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-nasa-muted hover:text-white px-3 py-1.5 rounded-lg bg-nasa-surface/60 border border-nasa-border hover:border-nasa-borderHover transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-nasa-blueLight" />
          Back to Catalogue
        </button>

        <div className="flex items-center gap-2">
          {MOCK_EXPERIMENTS.map((other) => (
            <button
              key={other.id}
              onClick={() => onSelectExperiment(other.id)}
              className={`
                px-2.5 py-1 rounded text-xs font-mono transition-all border
                ${other.id === exp.id 
                  ? 'bg-nasa-blue/20 text-nasa-blueLight border-nasa-blueLight/50 font-bold' 
                  : 'bg-nasa-surface/40 text-nasa-subtle border-nasa-border hover:text-white'}
              `}
            >
              #{other.id}
            </button>
          ))}
        </div>
      </div>

      {/* Experiment Header Banner */}
      <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-6 shadow-nasa-card">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-nasa-blue/15 border border-nasa-blue/30 text-nasa-blueLight">
            EXPERIMENT #{exp.id}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-nasa-surface border border-nasa-border text-nasa-muted">
            Date: {exp.date}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-nasa-surface border border-nasa-border text-nasa-cyan">
            {exp.src}
          </span>
          <span className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${exp.risk === 'High' ? 'bg-nasa-flame/10 text-nasa-flame border-nasa-flame/30' : 'bg-nasa-ok/10 text-nasa-ok border-nasa-ok/30'}`}>
            {exp.risk} Risk Profile
          </span>
        </div>

        <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mb-3">
          {exp.title}
        </h1>

        <p className="text-sm text-nasa-muted max-w-4xl leading-relaxed">
          {exp.overview}
        </p>
      </div>

      {/* Key Experimental Conditions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Fuel</span>
          <b className="text-white text-sm block truncate" title={exp.fuel}>{exp.fuel}</b>
        </div>
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Oxidizer</span>
          <b className="text-nasa-cyan text-sm block truncate" title={exp.oxidizer}>{exp.oxidizer}</b>
        </div>
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Gravity Level</span>
          <b className="text-white text-sm block truncate">{exp.gravity}</b>
        </div>
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Peak Temp</span>
          <b className="text-nasa-flameLight text-sm block">{exp.temp} K</b>
        </div>
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Chamber Press</span>
          <b className="text-white text-sm block">{exp.press} kPa</b>
        </div>
        <div className="p-4 rounded-xl bg-nasa-surface/80 border border-nasa-border font-mono text-xs">
          <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider mb-1">Burn Duration</span>
          <b className="text-nasa-blueLight text-sm block">{exp.dur} s</b>
        </div>
      </div>

      {/* Observations & Morphology Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Observations List */}
        <div className="lg:col-span-2 bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-nasa-border/60">
            <CheckCircle2 className="w-4 h-4 text-nasa-cyan" />
            <h3 className="font-space font-semibold text-base text-white">
              Scientific Observations & Diagnostics
            </h3>
          </div>

          <div className="space-y-3 mb-5">
            {exp.observations.map((obs, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-nasa-surface/50 border border-nasa-border/50 text-xs text-slate-300 leading-relaxed">
                <span className="font-mono text-nasa-cyan font-bold mt-0.5">0{idx + 1}.</span>
                <p>{obs}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-nasa-blue/5 border border-nasa-blue/20 text-xs font-mono">
            <span className="text-nasa-blueLight font-semibold block mb-1">FLAME MORPHOLOGY PROFILE:</span>
            <p className="text-nasa-muted">
              {exp.flame}. Soot formation tendency rated as <strong className="text-white">{exp.soot}</strong>.
            </p>
          </div>
        </div>

        {/* Flame Radius Evolution Chart */}
        <ChartCard
          title="Flame Radius Growth"
          subtitle="Radial expansion (mm) vs. Time interval"
          badge="High-Speed Optics"
        >
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FLAME_RADIUS_EVOLUTION}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="interval" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
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
                <Bar dataKey="radius" name="Flame Radius (mm)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Temperature Time-Series History */}
      <ChartCard
        title={`Temperature Telemetry Track (Exp #${exp.id})`}
        subtitle="Transient thermocouple / pyrometer trace over burn envelope"
        badge="Sensor CIR-TC-04"
        footerNote="Processed by NASA GRC Microgravity Science Division"
      >
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_TEMPERATURE_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} domain={[0, 2000]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(11, 19, 41, 0.95)', 
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontFamily: 'monospace'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="microgravity" 
                name={`Experiment #${exp.id} Telemetry (K)`} 
                stroke="#38bdf8" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#38bdf8' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
