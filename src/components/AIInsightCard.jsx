import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function AIInsightCard({ insight, onSelectExperiment, onExploreInsights }) {
  return (
    <div className="bg-gradient-to-br from-nasa-surface/90 to-nasa-navy/90 backdrop-blur-md border border-nasa-blueLight/30 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
      {/* Background flare decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-nasa-blueLight/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nasa-blueLight" />
            <h3 className="font-space font-bold text-xs uppercase tracking-wider text-nasa-blueLight">
              ✦ AI RESEARCH ASSISTANT (PREVIEW)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nasa-blue/10 border border-nasa-blue/20 text-nasa-blueLight">
            CIR Synthesis
          </span>
        </div>

        {/* Insight Quote */}
        <blockquote className="my-3 pl-3.5 border-l-2 border-nasa-cyan text-sm leading-relaxed text-slate-200 italic">
          "{insight?.quote || "Microgravity changes the way heat and combustion products move around the flame, replacing buoyant convection with isotropic diffusion."}"
        </blockquote>

        {/* Evidence List */}
        <div className="mt-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-nasa-subtle font-semibold mb-2 flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-nasa-cyan" />
            Telemetry Evidence Sources
          </div>
          <div className="space-y-1.5">
            {(insight?.evidence || ["Experiment #024", "Experiment #031"]).map((ev, idx) => {
              const expId = ev.includes("#") ? ev.split("#")[1].slice(0, 3) : "024";
              return (
                <button
                  key={idx}
                  onClick={() => onSelectExperiment && onSelectExperiment(expId)}
                  className="w-full text-left text-xs font-mono text-nasa-blueLight hover:text-white flex items-center gap-1.5 hover:translate-x-1 transition-all"
                >
                  <span className="text-nasa-cyan">•</span>
                  <span className="underline decoration-nasa-blueLight/40 hover:decoration-white">{ev}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-5 pt-3 border-t border-nasa-border/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-nasa-subtle">
          Model: NASA-AeroFire-v1.4
        </span>
        <button
          onClick={onExploreInsights}
          className="text-xs font-medium text-nasa-text hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-nasa-border hover:border-nasa-blueLight/40 transition-colors"
        >
          View Sources <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-nasa-blueLight" />
        </button>
      </div>
    </div>
  );
}
