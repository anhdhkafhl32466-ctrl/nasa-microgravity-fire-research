import React from 'react';
import { AlertTriangle, ShieldAlert, Wind, Thermometer, Flame } from 'lucide-react';
import { MOCK_SAFETY_INDICATORS } from '../data/mockData';

export default function SafetyIndicator() {
  const getIcon = (key) => {
    if (key.includes("Flame")) return <Flame className="w-3.5 h-3.5 text-nasa-flame" />;
    if (key.includes("Temperature")) return <Thermometer className="w-3.5 h-3.5 text-nasa-flameLight" />;
    return <Wind className="w-3.5 h-3.5 text-nasa-cyan" />;
  };

  return (
    <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-nasa-border/60">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-nasa-flame" />
          <h3 className="font-space font-semibold text-base text-white">
            Spacecraft Safety Indicators
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-nasa-flame/10 border border-nasa-flame/30 text-nasa-flameLight flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Artemis / ISS Standard
        </span>
      </div>

      {/* Metric Bars */}
      <div className="space-y-4 mb-5">
        {MOCK_SAFETY_INDICATORS.map((indicator, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-nasa-text flex items-center gap-1.5">
                {getIcon(indicator.key)}
                {indicator.key}
              </span>
              <span className={`font-semibold ${indicator.textColor}`}>
                {indicator.level} ({indicator.percentage}%)
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-nasa-surface border border-nasa-border/60 overflow-hidden">
              <div 
                className={`h-full rounded-full ${indicator.color} transition-all duration-500`}
                style={{ width: `${indicator.percentage}%` }}
              />
            </div>

            <p className="text-[11px] text-nasa-subtle leading-tight">
              {indicator.description}
            </p>
          </div>
        ))}
      </div>

      {/* Safety Considerations Callout */}
      <div className="p-3.5 rounded-lg bg-nasa-flame/5 border border-nasa-flame/20 text-xs">
        <div className="font-semibold text-nasa-flameLight flex items-center gap-1.5 mb-1 font-mono uppercase tracking-wide text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 text-nasa-flame" />
          Operational Safety Considerations
        </div>
        <p className="text-nasa-muted text-[11px] leading-relaxed">
          In microgravity environments, flames remain spherical and can burn quietly without smoke plume buoyancy. Optical smoke detectors must be augmented by multi-spectrum infrared sensors and ventilation flow monitors.
        </p>
      </div>
    </div>
  );
}
