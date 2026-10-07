/**
 * NASA Microgravity Combustion Research Database (Mock Layer)
 * Separated from UI components for future backend/API integration.
 */

export const MOCK_STATS = [
  {
    id: "exp-count",
    label: "Total Experiments",
    value: 128,
    change: "+12 this cycle",
    isPositive: true,
    category: "Archive"
  },
  {
    id: "fuel-types",
    label: "Fuel Types Evaluated",
    value: 14,
    change: "Gaseous, Liquid & Solid",
    isPositive: true,
    category: "Chemical Matrix"
  },
  {
    id: "conditions",
    label: "Gravity Environments",
    value: 6,
    change: "μg, 0.16g, 0.38g, 1g, 2g",
    isPositive: true,
    category: "Test Matrix"
  },
  {
    id: "burn-hours",
    label: "Total Burn Telemetry",
    value: "42.8 hrs",
    change: "CIR / Destiny Lab",
    isPositive: true,
    category: "Flight Operations"
  }
];

export const MOCK_EXPERIMENTS = [
  {
    id: "024",
    title: "Methane Combustion in Microgravity",
    fuel: "Methane (CH₄)",
    oxidizer: "Air 21% O₂",
    gravity: "μg (10⁻⁵ g)",
    gravityType: "microgravity",
    fuelType: "Gas",
    temp: 1650,
    press: 101.3,
    dur: 42,
    o2: 21,
    soot: "Low",
    date: "2023-03-14",
    src: "NASA FLEX-2 · ISS",
    risk: "High",
    flame: "Spherical, blue, self-extinguishing",
    overview: "Observation of spherical diffusion flame without buoyancy-induced convective updraft. Radiative heat loss dominates flame extinction as oxygen depletes locally.",
    observations: [
      "Quasi-steady spherical blue flame established within 2.1s of ignition.",
      "Absence of buoyant plume allows soot precursors to radiate uniformly.",
      "Flame extinguished abruptly when ambient oxygen fell below extinction threshold."
    ]
  },
  {
    id: "031",
    title: "Heptane Droplet Burning Kinetics",
    fuel: "n-Heptane (C₇H₁₆)",
    oxidizer: "Air 21% O₂",
    gravity: "μg (10⁻⁵ g)",
    gravityType: "microgravity",
    fuelType: "Liquid",
    temp: 1480,
    press: 101.3,
    dur: 58,
    o2: 21,
    soot: "Medium",
    date: "2023-06-02",
    src: "NASA FLEX · ISS",
    risk: "Medium",
    flame: "Spherical droplet envelope flame",
    overview: "Study of droplet evaporation rates (d²-law) and cool-flame transitions in microgravity. Cool flame burning persisted after visual flame extinction.",
    observations: [
      "Classic d² evaporation law verified with burning rate constant K = 0.74 mm²/s.",
      "Second-stage cool flame detected by radiometer after apparent luminescent extinction.",
      "Minimal soot agglomeration observed due to spherical symmetry."
    ]
  },
  {
    id: "017",
    title: "Methane Combustion at 1 g Ground Baseline",
    fuel: "Methane (CH₄)",
    oxidizer: "Air 21% O₂",
    gravity: "1 g (Earth Baseline)",
    gravityType: "earth",
    fuelType: "Gas",
    temp: 1900,
    press: 101.3,
    dur: 180,
    o2: 21,
    soot: "Low",
    date: "2022-11-20",
    src: "Ground Control · NASA GRC",
    risk: "Medium",
    flame: "Conical flame buoyed upwards",
    overview: "Ground control baseline test under standard gravity conditions. Natural convection induces a fast vertical buoyant flow, sharpening temperature gradients.",
    observations: [
      "Buoyancy velocity exceeds 1.2 m/s, accelerating air intake at flame base.",
      "Higher peak temperature due to reduced radiative dwell time.",
      "Flickering instability at 12 Hz driven by toroidal vortex shedding."
    ]
  },
  {
    id: "045",
    title: "Solid Fuel Flame Spread (SoFIE)",
    fuel: "PMMA (Acrylic)",
    oxidizer: "O₂/N₂ 30%",
    gravity: "μg (10⁻⁵ g)",
    gravityType: "microgravity",
    fuelType: "Solid",
    temp: 1320,
    press: 70.3,
    dur: 96,
    o2: 30,
    soot: "High",
    date: "2024-01-18",
    src: "SoFIE · CIR Destiny",
    risk: "High",
    flame: "Creeping boundary layer flame",
    overview: "Evaluation of spacecraft interior material flammability under concurrent and opposed low-speed forced airflow in microgravity.",
    observations: [
      "Flame spread rate strongly coupled to forced flow speed in absence of buoyancy.",
      "Thick soot zone developed along downstream boundary layer.",
      "Critical oxygen index (LOI) increased significantly compared to 1 g test."
    ]
  },
  {
    id: "052",
    title: "Ethylene Sooting Flame in Lunar Gravity",
    fuel: "Ethylene (C₂H₄)",
    oxidizer: "Air 21% O₂",
    gravity: "Lunar (0.16 g)",
    gravityType: "lunar",
    fuelType: "Gas",
    temp: 1720,
    press: 101.3,
    dur: 75,
    o2: 21,
    soot: "High",
    date: "2024-04-09",
    src: "NASA Parabolic Campaign",
    risk: "Medium",
    flame: "Elongated luminous soot shell",
    overview: "Testing transitional buoyancy regime at Moon surface gravitational acceleration (0.16 g). Flame shows hybrid spherical-conical morphology.",
    observations: [
      "Buoyant acceleration sufficient to induce weak upward elongation.",
      "Soot residence time 3.4x longer than 1 g, leading to high radiative thermal load.",
      "Critical benchmark for Artemis lunar habitat life support design."
    ]
  },
  {
    id: "060",
    title: "Low-O₂ Flame Extinction Limit Testing",
    fuel: "Methane (CH₄)",
    oxidizer: "O₂/N₂ 16%",
    gravity: "μg (10⁻⁵ g)",
    gravityType: "microgravity",
    fuelType: "Gas",
    temp: 1100,
    press: 101.3,
    dur: 23,
    o2: 16,
    soot: "Low",
    date: "2024-08-27",
    src: "NASA FLEX-2 · ISS",
    risk: "Low",
    flame: "Pale dim blue hemisphere",
    overview: "Investigating the absolute limiting oxygen concentration required to sustain a diffusion flame when convective heat transport is absent.",
    observations: [
      "Flame barely visible to human eye, radiating primarily in near-infrared and CH* radicals.",
      "Quenched rapidly due to conductive heat dissipation into cold fuel nozzle.",
      "Proves feasibility of hypoxic fire prevention protocol for space habitats."
    ]
  }
];

// Telemetry Time-series Data for Charts
export const MOCK_TEMPERATURE_HISTORY = [
  { time: "0s", microgravity: 0, earth: 0 },
  { time: "10s", microgravity: 410, earth: 620 },
  { time: "20s", microgravity: 980, earth: 1350 },
  { time: "30s", microgravity: 1450, earth: 1780 },
  { time: "40s", microgravity: 1650, earth: 1900 },
  { time: "50s", microgravity: 1240, earth: 1880 },
  { time: "60s", microgravity: 300, earth: 1600 }
];

export const MOCK_O2_CURVE = [
  { o2: "14%", duration: 0 },
  { o2: "16%", duration: 23 },
  { o2: "18%", duration: 34 },
  { o2: "21%", duration: 42 },
  { o2: "25%", duration: 61 },
  { o2: "30%", duration: 96 }
];

export const MOCK_FLAME_BEHAVIOR = [
  { category: "Spherical (μg)", count: 14, color: "#38bdf8" },
  { category: "Conical (1g)", count: 9, color: "#2563eb" },
  { category: "Sooty (0.16g)", count: 7, color: "#f97316" },
  { category: "Extinct (<16% O₂)", count: 5, color: "#64748b" }
];

export const MOCK_FLAME_RADIUS_EVOLUTION = [
  { interval: "0-10s", radius: 8 },
  { interval: "10-20s", radius: 14 },
  { interval: "20-30s", radius: 11 },
  { interval: "30-40s", radius: 6 }
];

export const MOCK_SAFETY_INDICATORS = [
  {
    key: "Flame Persistence",
    percentage: 82,
    level: "High",
    color: "bg-nasa-risk",
    textColor: "text-nasa-risk",
    description: "Without buoyancy, flames can persist in stagnant pockets without generating upward thermal plumes."
  },
  {
    key: "Radiative Temperature",
    percentage: 60,
    level: "Medium",
    color: "bg-nasa-flame",
    textColor: "text-nasa-flame",
    description: "Uniform spherical radiation increases localized heating of adjacent cabin materials."
  },
  {
    key: "Oxygen Depletion Rate",
    percentage: 72,
    level: "Medium-High",
    color: "bg-nasa-cyan",
    textColor: "text-nasa-cyan",
    description: "Diffusion-limited transport creates steep oxygen concentration gradients near the reaction zone."
  }
];

export const MOCK_AI_INSIGHTS = [
  {
    id: "insight-1",
    title: "Buoyancy Suppression & Heat Transport",
    quote: "In microgravity, the absence of natural convection fundamentally alters combustion: flames form spherical reaction shells dominated solely by molecular diffusion.",
    evidence: ["Experiment #024 (Methane μg)", "Experiment #031 (Heptane Droplet)"],
    tag: "Core Physics"
  },
  {
    id: "insight-2",
    title: "Hypoxic Suppression Feasibility",
    quote: "Reducing ambient oxygen to 16% in microgravity extinguishes diffusion flames 78% faster than at 1 g, demonstrating the viability of low-oxygen spacecraft environments.",
    evidence: ["Experiment #060 (Low-O₂ Extinction)", "Experiment #045 (SoFIE PMMA)"],
    tag: "Life Support Safety"
  }
];

export const MOCK_MISSION_META = {
  missionName: "Microgravity Combustion Science",
  facility: "Combustion Integrated Rack (CIR) · Destiny Laboratory",
  platform: "International Space Station (ISS)",
  altitude: "418.4 km",
  inclination: "51.6°",
  orbitVelocity: "7.66 km/s",
  flightEngineer: "NASA Glenn Research Center (GRC)"
};
