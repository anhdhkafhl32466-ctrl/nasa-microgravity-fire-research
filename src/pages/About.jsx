import React from 'react';
import { Rocket, Satellite, ShieldCheck, Microscope, Cpu, Compass } from 'lucide-react';
import { MOCK_MISSION_META } from '../data/mockData';

export default function About() {
  const pillars = [
    {
      icon: Satellite,
      title: "Combustion Integrated Rack (CIR)",
      desc: "Mounted in the US Destiny Laboratory on the International Space Station, CIR provides a sealed 100-liter chamber with optical windows, laser diagnostics, and gas chromatography.",
      badge: "Orbital Facility"
    },
    {
      icon: Rocket,
      title: "Lunar & Martian Fire Safety",
      desc: "Preparing fire safety protocols for Artemis lunar base camps and crewed transit vehicles to Mars, where partial gravity introduces unique buoyant-diffusion transitional regimes.",
      badge: "Exploration Standard"
    },
    {
      icon: Microscope,
      title: "SoFIE & FLEX-2 Payloads",
      desc: "Solid Fuel Ignition and Extinction (SoFIE) and Flame Extinction Experiment (FLEX-2) measure droplet evaporation rates, flame spread over fabrics, and extinction limits.",
      badge: "Scientific Payload"
    },
    {
      icon: ShieldCheck,
      title: "Hypoxic Fire Suppression Protocol",
      desc: "Developing next-generation spacecraft habitat safety standards that leverage low oxygen concentrations (16% O₂) to prevent flame propagation without impairing crew respiration.",
      badge: "Life Support Architecture"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-nasa-border">
        <div className="text-[11px] font-mono tracking-widest text-nasa-cyan uppercase">
          MISSION ARCHITECTURE & CONTEXT
        </div>
        <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-1">
          About Microgravity Fire Research
        </h1>
        <p className="text-xs sm:text-sm text-nasa-muted mt-1 max-w-3xl">
          NASA has investigated the fundamentals of microgravity combustion for over three decades to safeguard astronaut crews and engineer ultra-resilient spacecraft systems.
        </p>
      </div>

      {/* Mission Overview Hero Card */}
      <div className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-6 shadow-nasa-card">
        <h2 className="font-space font-semibold text-lg text-white mb-3 flex items-center gap-2">
          <Compass className="w-5 h-5 text-nasa-blueLight" />
          The Physics of Fire Beyond Earth
        </h2>
        <p className="text-xs sm:text-sm text-nasa-muted leading-relaxed mb-4">
          On Earth, gravity drives natural convection: hot, less dense gases rise, drawing fresh oxygen into the base of the flame and creating the familiar teardrop shape. In the microgravity environment of the International Space Station, buoyancy is virtually eliminated. Flames burn in perfect spheres, molecular diffusion becomes the sole transport mechanism, and soot radiates heat uniformly in all directions.
        </p>
        <p className="text-xs sm:text-sm text-nasa-muted leading-relaxed">
          These distinctive physics make space fires behave in non-intuitive ways: they burn slower, generate less visible smoke, and can persist in hidden airflow ducts without triggering conventional ionization smoke detectors.
        </p>

        <div className="mt-6 pt-4 border-t border-nasa-border/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase">Operating Agency</span>
            <b className="text-white">NASA / GRC / ESA / JAXA</b>
          </div>
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase">Orbital Lab</span>
            <b className="text-nasa-blueLight">ISS Destiny Module</b>
          </div>
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase">Flight Altitude</span>
            <b className="text-white">{MOCK_MISSION_META.altitude}</b>
          </div>
          <div>
            <span className="text-[10px] text-nasa-subtle block uppercase">Safety Standard</span>
            <b className="text-nasa-ok">NASA-STD-6001B</b>
          </div>
        </div>
      </div>

      {/* 4 Research Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="bg-nasa-card backdrop-blur-md border border-nasa-border rounded-xl p-5 shadow-nasa-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-nasa-surface border border-nasa-border text-nasa-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-nasa-surface border border-nasa-border text-nasa-blueLight">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-space font-semibold text-base text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-nasa-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-nasa-border/40 text-[10px] font-mono text-nasa-subtle flex justify-between items-center">
                <span>Facility: NASA GRC</span>
                <span className="text-nasa-blueLight">Validated Data</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
