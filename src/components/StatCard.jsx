import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatCard({ label, value, change, category }) {
  return (
    <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 hover:border-nasa-borderHover transition-all duration-200 hover:translate-y-[-2px] shadow-nasa-card group relative overflow-hidden">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nasa-blueLight/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between text-xs text-nasa-muted mb-2 font-mono">
        <span className="uppercase tracking-wider text-[10px] text-nasa-cyan">{category || "METRIC"}</span>
        <span className="text-nasa-subtle group-hover:text-nasa-blueLight transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>

      <div className="font-space text-3xl font-bold text-white tracking-tight my-1">
        {value}
      </div>

      <div className="text-xs text-nasa-muted font-medium mt-1">
        {label}
      </div>

      {change && (
        <div className="mt-3 pt-2.5 border-t border-nasa-border/50 text-[11px] font-mono text-nasa-subtle flex items-center justify-between">
          <span>Status</span>
          <span className="text-nasa-blueLight">{change}</span>
        </div>
      )}
    </div>
  );
}
