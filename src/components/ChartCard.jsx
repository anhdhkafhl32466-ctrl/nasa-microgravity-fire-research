import React from 'react';

export default function ChartCard({ title, subtitle, badge, children, footerNote }) {
  return (
    <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 hover:border-nasa-borderHover transition-all flex flex-col justify-between shadow-nasa-card">
      <div>
        {/* Chart Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-nasa-border/60">
          <div>
            <h3 className="font-space font-semibold text-base text-white tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-nasa-muted font-mono mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {badge && (
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-nasa-surface border border-nasa-border text-nasa-blueLight">
              {badge}
            </span>
          )}
        </div>

        {/* Chart Viewport */}
        <div className="w-full min-h-[220px]">
          {children}
        </div>
      </div>

      {footerNote && (
        <div className="mt-3 pt-2.5 border-t border-nasa-border/40 text-[11px] font-mono text-nasa-subtle flex items-center justify-between">
          <span>Telemetry Source</span>
          <span className="text-nasa-muted">{footerNote}</span>
        </div>
      )}
    </div>
  );
}
