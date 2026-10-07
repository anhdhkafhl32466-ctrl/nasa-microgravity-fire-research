const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ==========================================================
   MOCK ORBITAL TELEMETRY & COMBUSTION DATABASE
   ========================================================== */
const DB = {
  stats: [
    { l: "Active Experiments", n: 128 },
    { l: "Fuel Matrix", n: 14 },
    { l: "Test Conditions", n: 6 }
  ],
  exps: [
    {
      id: "024",
      title: "Methane Combustion in Microgravity",
      fuel: "Methane (CH₄)",
      oxidizer: "Air 21% O₂",
      gravity: "μg (10⁻⁵ g)",
      gravityType: "microgravity",
      fuelType: "gas",
      temp: 1650,
      press: 101.3,
      dur: 42,
      o2: 21,
      soot: "Low",
      date: "2023-03-14",
      src: "NASA FLEX-2 · ISS",
      risk: "High",
      flame: "Spherical, blue, self-extinguishing"
    },
    {
      id: "031",
      title: "Heptane Droplet Burning",
      fuel: "n-Heptane",
      oxidizer: "Air 21% O₂",
      gravity: "μg (10⁻⁵ g)",
      gravityType: "microgravity",
      fuelType: "liquid",
      temp: 1480,
      press: 101.3,
      dur: 58,
      o2: 21,
      soot: "Medium",
      date: "2023-06-02",
      src: "NASA FLEX · ISS",
      risk: "Medium",
      flame: "Spherical envelope flame"
    },
    {
      id: "017",
      title: "Methane Combustion at 1 g",
      fuel: "Methane (CH₄)",
      oxidizer: "Air 21% O₂",
      gravity: "1 g (Earth)",
      gravityType: "earth",
      fuelType: "gas",
      temp: 1900,
      press: 101.3,
      dur: 180,
      o2: 21,
      soot: "Low",
      date: "2022-11-20",
      src: "Ground control · GRC",
      risk: "Medium",
      flame: "Conical flame buoyed upwards"
    },
    {
      id: "045",
      title: "Solid Fuel Flame Spread (SoFIE)",
      fuel: "PMMA",
      oxidizer: "O₂/N₂ 30%",
      gravity: "μg (10⁻⁵ g)",
      gravityType: "microgravity",
      fuelType: "solid",
      temp: 1320,
      press: 70.3,
      dur: 96,
      o2: 30,
      soot: "High",
      date: "2024-01-18",
      src: "SoFIE · CIR",
      risk: "High",
      flame: "Slow creeping flame across solid surface"
    },
    {
      id: "052",
      title: "Ethylene Sooting Flame",
      fuel: "Ethylene (C₂H₄)",
      oxidizer: "Air 21% O₂",
      gravity: "Lunar (0.16 g)",
      gravityType: "lunar",
      fuelType: "gas",
      temp: 1720,
      press: 101.3,
      dur: 75,
      o2: 21,
      soot: "High",
      date: "2024-04-09",
      src: "NASA Parabolic Flight",
      risk: "Medium",
      flame: "Elongated luminous soot shell"
    },
    {
      id: "060",
      title: "Low-O₂ Flame Extinction",
      fuel: "Methane (CH₄)",
      oxidizer: "O₂/N₂ 16%",
      gravity: "μg (10⁻⁵ g)",
      gravityType: "microgravity",
      fuelType: "gas",
      temp: 1100,
      press: 101.3,
      dur: 23,
      o2: 16,
      soot: "Low",
      date: "2024-08-27",
      src: "NASA FLEX-2 · ISS",
      risk: "Low",
      flame: "Pale dim blue hemisphere"
    }
  ],
  telemetry: {
    t: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
    series: {
      mu: [0, 410, 980, 1450, 1650, 1240, 300],
      g1: [0, 620, 1350, 1780, 1900, 1880, 1600]
    },
    o2curve: {
      labels: ["14%", "16%", "18%", "21%", "25%", "30%"],
      dur: [0, 23, 34, 42, 61, 96]
    }
  },
  safety: [
    { k: "Flame persistence", v: 82, lv: "Critical", c: "var(--risk)" },
    { k: "Plasma Temperature", v: 60, lv: "Nominal", c: "var(--fire)" },
    { k: "Oxygen concentration", v: 72, lv: "Optimal", c: "var(--cyan)" }
  ],
  insight: {
    q: "Trong vi trọng lực, không có lực đẩy nổi (buoyancy) tự nhiên nên ngọn lửa có hình cầu hoàn hảo, tự làm nghẽn nguồn khí bởi chính sản phẩm cháy.",
    ev: ["Experiment #024", "Experiment #031"]
  }
};

/* ==========================================================
   REST API ROUTES
   ========================================================== */

// 1. Dashboard Overview Stats & Telemetry
app.get('/api/dashboard', (req, res) => {
  res.json({
    status: "success",
    timestamp: new Date().toISOString(),
    orbit: {
      altitudeKm: 418.4,
      inclinationDeg: 51.6,
      station: "ISS Destiny Laboratory - CIR Facility"
    },
    stats: DB.stats,
    telemetry: DB.telemetry,
    safety: DB.safety,
    insight: DB.insight,
    recentExperiments: DB.exps.slice(0, 4)
  });
});

// 2. Experiments Catalogue (supports query filtering)
app.get('/api/experiments', (req, res) => {
  const { search, gravity, fuelType } = req.query;
  let results = [...DB.exps];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(e =>
      e.id.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q) ||
      e.fuel.toLowerCase().includes(q) ||
      e.src.toLowerCase().includes(q)
    );
  }

  if (gravity && gravity !== 'all') {
    results = results.filter(e => e.gravityType === gravity);
  }

  if (fuelType && fuelType !== 'all') {
    results = results.filter(e => e.fuelType === fuelType);
  }

  res.json({
    status: "success",
    count: results.length,
    data: results
  });
});

// 3. Single Experiment Detail
app.get('/api/experiments/:id', (req, res) => {
  const exp = DB.exps.find(e => e.id === req.params.id);
  if (!exp) {
    return res.status(404).json({ status: "error", message: "Experiment ID not found in CIR catalogue." });
  }
  res.json({
    status: "success",
    data: exp,
    telemetryTimeseries: DB.telemetry
  });
});

// 4. Compare Telemetry
app.get('/api/compare', (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(',') : ["024", "031", "017"];
  const list = DB.exps.filter(e => ids.includes(e.id));
  res.json({
    status: "success",
    data: list
  });
});

// 5. AI Research Assistant Query Endpoint
app.post('/api/insights/ask', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ status: "error", message: "Question query is required." });
  }

  // Smart Context-Aware Orbital Combustion Response Generator
  const qLower = question.toLowerCase();
  let answer = "";
  let evidence = ["Experiment #024", "Experiment #031"];

  if (qLower.includes("hỏa") || qLower.includes("mars") || qLower.includes("trăng") || qLower.includes("moon")) {
    answer = `Trên Sao Hoả (0.38 g) và Mặt Trăng (0.16 g), lực đẩy nổi yếu khiến ngọn lửa cháy chậm hơn Trái Đất nhưng vẫn duy trì được luồng khí định hướng yếu, đòi hỏi chuẩn an toàn vật liệu cao hơn chuẩn ISS.`;
    evidence = ["Experiment #052", "Experiment #045"];
  } else if (qLower.includes("dập") || qLower.includes("chữa cháy") || qLower.includes("extinguish")) {
    answer = `Trong vi trọng lực (μg), việc ngắt luồng thông gió cưỡng bức có thể khiến ngọn lửa tự ngạt thở bởi lớp màng CO₂ bao quanh chỉ sau 20-40 giây.`;
    evidence = ["Experiment #060", "Experiment #024"];
  } else {
    answer = `Phân tích dữ liệu vi trọng lực cho thấy: Thiếu đối lưu nhiệt tự nhiên làm giảm gradient vận tốc, ngọn lửa tạo thành cấu trúc cầu đẳng hướng với nhiệt độ vùng phản ứng ổn định hơn 1 g.`;
    evidence = ["Experiment #024", "Experiment #031", "Experiment #045"];
  }

  res.json({
    status: "success",
    query: question,
    response: answer,
    evidence
  });
});

// Catch-all SPA route to serve public/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`🚀 Orbital Microgravity Mission Server is running!`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`🌌 Environment: Node.js Express [Deep Space Edition]`);
  console.log(`=============================================================\n`);
});
