import React from 'react';
import { Flame, Clock, Thermometer, Gauge, ChevronRight } from 'lucide-react';

export default function ExperimentCard({ experiment, onClick }) {
  const isHighRisk = experiment.risk === 'High';

  return (
    <div 
      onClick={onClick}
      className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 hover:border-nasa-blueLight/50 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-nasa-glow cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Card Header: ID and Risk Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-nasa-surface border border-nasa-border text-nasa-blueLight">
            #{experiment.id}
          </span>
          <span className={`
            text-[11px] font-mono px-2.5 py-0.5 rounded-full border flex items-center gap-1
            ${isHighRisk 
              ? 'bg-nasa-flame/10 text-nasa-flameLight border-nasa-flame/30' 
              : 'bg-nasa-cyan/10 text-nasa-cyan border-nasa-cyan/30'}
          `}>
            {isHighRisk && <Flame className="w-3 h-3 text-nasa-flame" />}
            {experiment.risk} Risk
          </span>
        </div>

        {/* Title */}
        <h3 className="font-space font-semibold text-base text-white group-hover:text-nasa-blueLight transition-colors mb-1.5 leading-snug">
          {experiment.title}
        </h3>

        {/* Subtitle / Fuel & Environment */}
        <p className="text-xs text-nasa-muted mb-4 font-mono">
          {experiment.fuel} · <span className="text-nasa-text">{experiment.gravity}</span>
        </p>
      </div>

      {/* Numerical Metrics Matrix */}
      <div>
        <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-nasa-surface/60 border border-nasa-border/60 text-xs font-mono mb-3">
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider">Duration</span>
            <b className="text-white text-sm font-semibold">{experiment.dur}s</b>
          </div>
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase tracking-wider">Peak Temp</span>
            <b className="text-nasa-flameLight text-sm font-semibold">{experiment.temp} K</b>
          </div>
        </div>

        {/* Footer info: Source and Action */}
        <div className="flex items-center justify-between text-[11px] text-nasa-subtle pt-2 border-t border-nasa-border/40">
          <span className="truncate max-w-[170px]">{experiment.src}</span>
          <span className="text-nasa-blueLight group-hover:translate-x-1 transition-transform flex items-center font-medium">
            Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
