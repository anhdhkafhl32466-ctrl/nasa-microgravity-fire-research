import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { Sparkles, Send, BookOpen, AlertTriangle, Lightbulb, Compass } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import SafetyIndicator from '../components/SafetyIndicator';
import { 
  MOCK_O2_CURVE, 
  MOCK_FLAME_BEHAVIOR, 
  MOCK_AI_INSIGHTS 
} from '../data/mockData';

export default function Insights({ onSelectExperiment }) {
  const [query, setQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState(null);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsAsking(true);
    setTimeout(() => {
      setSimulatedResponse({
        question: query,
        answer: "Based on archived CIR microgravity datasets, reducing convective buoyancy forces leads to a 60-70% lower localized Reynolds number around the flame zone. Consequently, thermal radiation and molecular species diffusion dominate ignition limits and soot formation rates.",
        evidence: ["Experiment #024 (Methane μg)", "Experiment #031 (Heptane Droplet)", "Experiment #045 (SoFIE)"]
      });
      setIsAsking(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-nasa-border">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-nasa-cyan uppercase">
            AI-POWERED COMBUSTION SYNTHESIS
          </div>
          <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-1">
            Cosmic Combustion Insights
          </h1>
          <p className="text-xs sm:text-sm text-nasa-muted mt-1">
            Explore AI-synthesized physical principles, hypoxic extinguishing curves, and spacecraft safety assessments.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-nasa-surface border border-nasa-border text-nasa-blueLight font-semibold">
            SYNTHESIS ENGINE v1.4 (UI MOCK)
          </span>
        </div>
      </div>

      {/* 1. Interactive AI Assistant Input Box Placeholder */}
      <div className="bg-gradient-to-r from-nasa-surface via-nasa-card to-nasa-navy border border-nasa-blueLight/30 rounded-xl p-6 shadow-nasa-card relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-nasa-blueLight" />
          <h3 className="font-space font-bold text-sm uppercase tracking-wider text-white">
            ✦ AI RESEARCH ASSISTANT (FRONTEND INTERFACE)
          </h3>
        </div>
        <p className="text-xs text-nasa-muted mb-4">
          Query the microgravity combustion knowledge base for thermal diffusion, soot agglomeration, or oxygen extinction limits.
        </p>

        <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about microgravity combustion (e.g. How does 16% O2 affect droplet burning on ISS?)..."
            className="flex-1 bg-nasa-void/90 border border-nasa-border rounded-lg px-4 py-3 text-xs text-white placeholder-nasa-subtle focus:outline-none focus:border-nasa-blueLight font-mono"
          />
          <button
            type="submit"
            disabled={isAsking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-nasa-blue hover:bg-blue-600 text-white text-xs font-semibold font-mono transition-all shadow-md shadow-nasa-blue/30 disabled:opacity-50"
          >
            {isAsking ? (
              <span>Synthesizing...</span>
            ) : (
              <>
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Simulated Response Box */}
        {simulatedResponse && (
          <div className="mt-5 p-4 rounded-lg bg-nasa-void/80 border border-nasa-blueLight/40 text-xs animate-fadeIn">
            <div className="text-[10px] font-mono text-nasa-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-nasa-cyan" />
              AI Synthesized Response (Mock Interface Preview)
            </div>
            <p className="text-slate-200 leading-relaxed mb-3">
              {simulatedResponse.answer}
            </p>
            <div className="pt-2 border-t border-nasa-border/60 text-[11px] font-mono text-nasa-subtle flex flex-wrap gap-2 items-center">
              <span>Telemetry Evidence:</span>
              {simulatedResponse.evidence.map((ev, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-nasa-surface border border-nasa-border text-nasa-blueLight">
                  {ev}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 text-[10px] font-mono text-nasa-subtle">
          Note: Frontend prototype placeholder. AI endpoint will connect to NASA AeroFire LLM in future phase.
        </div>
      </div>

      {/* 2. Key Synthesis Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_AI_INSIGHTS.map((insight) => (
          <div key={insight.id} className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-nasa-border/60">
                <span className="text-xs font-mono font-bold text-nasa-blueLight uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-nasa-blueLight" />
                  {insight.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nasa-surface border border-nasa-border text-nasa-cyan">
                  {insight.tag}
                </span>
              </div>

              <blockquote className="my-3 pl-3 border-l-2 border-nasa-blueLight text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{insight.quote}"
              </blockquote>

              <div className="mt-4 pt-3 border-t border-nasa-border/40">
                <span className="text-[10px] font-mono uppercase text-nasa-subtle block mb-1.5">
                  Telemetry Evidence Base:
                </span>
                <div className="space-y-1">
                  {insight.evidence.map((ev, idx) => {
                    const expId = ev.includes("#") ? ev.split("#")[1].slice(0, 3) : "024";
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectExperiment(expId)}
                        className="text-xs font-mono text-nasa-blueLight hover:underline block text-left"
                      >
                        • {ev}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-nasa-border/40 text-[10px] font-mono text-nasa-subtle flex justify-between">
              <span>Verified by ISS Destiny Rack</span>
              <span className="text-nasa-ok">Confidence: 98.4%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Scientific Data Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Oxygen Concentration vs Burn Duration */}
        <ChartCard
          title="Oxygen Concentration vs. Burn Duration"
          subtitle="Critical extinction curve under hypoxic microgravity conditions"
          badge="% O₂ vs. Seconds"
          footerNote="Experiments #024, #045, #060 Correlation"
        >
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_O2_CURVE}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="o2" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} domain={[0, 110]} />
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
                  dataKey="duration" 
                  name="Flame Duration (s)" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#06b6d4' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Combustion Behavior Morphological Breakdown */}
        <ChartCard
          title="Combustion Behavior Distribution"
          subtitle="Observed flame morphology classification across 35 CIR runs"
          badge="Morphology Matrix"
          footerNote="High-Speed Diagnostic Archive"
        >
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FLAME_BEHAVIOR}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
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
                <Bar dataKey="count" name="Experiment Count" radius={[4, 4, 0, 0]}>
                  {MOCK_FLAME_BEHAVIOR.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* 4. Safety Considerations Section */}
      <SafetyIndicator />
    </div>
  );
}
