import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function ComparisonTable({ experiments }) {
  if (!experiments || experiments.length === 0) return null;

  const baseline = experiments[0];

  const parameters = [
    { label: "Experiment Title", key: "title" },
    { label: "Fuel Formulation", key: "fuel" },
    { label: "Gravity Environment", key: "gravity" },
    { label: "Peak Flame Temp", key: "temp", unit: "K" },
    { label: "Chamber Pressure", key: "press", unit: "kPa" },
    { label: "Flame Burn Duration", key: "dur", unit: "s" },
    { label: "Soot Formation Tendency", key: "soot" },
    { label: "Flame Morphology", key: "flame" },
    { label: "Facility / Source", key: "src" },
  ];

  const colors = ["text-nasa-blueLight", "text-nasa-cyan", "text-nasa-flameLight"];

  return (
    <div className="overflow-x-auto border border-nasa-border rounded-xl bg-nasa-card backdrop-blur-md">
      <table className="w-full text-left text-xs border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-nasa-border bg-nasa-surface/80">
            <th className="py-3.5 px-4 font-mono uppercase tracking-wider text-nasa-subtle text-[11px] w-1/4">
              Scientific Metric
            </th>
            {experiments.map((exp, idx) => (
              <th key={exp.id} className={`py-3.5 px-4 font-mono font-bold text-sm ${colors[idx % colors.length]}`}>
                Probe {"ABC"[idx]} · #{exp.id}
                <div className="text-[10px] font-normal text-nasa-muted font-sans mt-0.5">
                  {exp.fuel} ({exp.gravityType})
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-nasa-border/50 font-mono">
          {parameters.map((param, pIdx) => (
            <tr key={pIdx} className="hover:bg-nasa-surface/40 transition-colors">
              <td className="py-3 px-4 font-sans font-medium text-nasa-muted">
                {param.label}
              </td>
              {experiments.map((exp, eIdx) => {
                const val = exp[param.key];
                return (
                  <td key={exp.id} className="py-3 px-4 text-white">
                    {val} {param.unit || ""}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Delta comparison row vs Baseline (Experiment A) */}
          <tr className="bg-nasa-surface/60 font-semibold border-t-2 border-nasa-border">
            <td className="py-3 px-4 font-sans text-nasa-cyan text-[11px] uppercase tracking-wider">
              Δ Duration vs Probe A
            </td>
            {experiments.map((exp, idx) => {
              if (idx === 0) {
                return (
                  <td key={exp.id} className="py-3 px-4 text-nasa-subtle font-mono">
                    Baseline (0s)
                  </td>
                );
              }
              const delta = exp.dur - baseline.dur;
              const isLonger = delta > 0;
              return (
                <td key={exp.id} className={`py-3 px-4 font-mono flex items-center gap-1 ${isLonger ? 'text-nasa-ok' : 'text-nasa-flame'}`}>
                  {isLonger ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                  {isLonger ? `+${delta}s` : `${delta}s`}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
