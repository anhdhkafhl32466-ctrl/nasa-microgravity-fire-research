import React from 'react';
import { Flame, ArrowUpDown } from 'lucide-react';

export default function DataTable({ experiments, onSelectExperiment }) {
  return (
    <div className="overflow-x-auto border border-nasa-border rounded-xl bg-nasa-card backdrop-blur-md">
      <table className="w-full text-left text-xs border-collapse min-w-[760px]">
        <thead>
          <tr className="border-b border-nasa-border bg-nasa-surface/60 text-[11px] font-mono uppercase tracking-wider text-nasa-cyan">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Experiment Title</th>
            <th className="py-3 px-4">Fuel Formulation</th>
            <th className="py-3 px-4">Environment</th>
            <th className="py-3 px-4 text-right">Temp (K)</th>
            <th className="py-3 px-4 text-right">Pressure (kPa)</th>
            <th className="py-3 px-4 text-right">Duration</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Hardware Facility</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-nasa-border/60">
          {experiments.map((e) => (
            <tr
              key={e.id}
              onClick={() => onSelectExperiment(e.id)}
              className="hover:bg-nasa-surface/80 transition-colors cursor-pointer group"
            >
              <td className="py-3 px-4 font-mono font-bold text-nasa-blueLight">
                #{e.id}
              </td>
              <td className="py-3 px-4 font-medium text-white group-hover:text-nasa-blueLight transition-colors">
                {e.title}
              </td>
              <td className="py-3 px-4 text-nasa-muted">
                {e.fuel}
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 rounded bg-nasa-surface border border-nasa-border text-nasa-text text-[11px] font-mono">
                  {e.gravity}
                </span>
              </td>
              <td className="py-3 px-4 text-right font-mono text-nasa-flameLight font-semibold">
                {e.temp}
              </td>
              <td className="py-3 px-4 text-right font-mono text-nasa-text">
                {e.press}
              </td>
              <td className="py-3 px-4 text-right font-mono text-white font-semibold">
                {e.dur}s
              </td>
              <td className="py-3 px-4 font-mono text-nasa-subtle text-[11px]">
                {e.date}
              </td>
              <td className="py-3 px-4 text-nasa-muted text-[11px]">
                {e.src}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
