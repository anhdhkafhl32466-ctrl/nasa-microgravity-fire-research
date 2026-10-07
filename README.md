# NASA · Microgravity Combustion Research Platform

> An interactive scientific dashboard prototype designed for NASA science and space exploration competitions, studying flame kinetics, extinction limits, and spacecraft fire safety in microgravity (ISS, Moon, Mars).

![NASA Combustion Research Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop)

---

## 🚀 Key Features

- **Mission Overview & Telemetry Metrics**: Real-time visualization of peak flame temperatures over time comparing microgravity ($\mu\text{g}$) and standard Earth gravity ($1\text{g}$) using **Recharts**.
- **Research Catalogue & Advanced Exploration**: Full catalogue of flight experiments with filtering by gravity regime (ISS $\mu\text{g}$, Lunar $0.16\text{g}$, Earth $1\text{g}$) and fuel types (Methane, Heptane, PMMA Acrylic, Ethylene).
- **In-Depth Experiment Inspector**: Complete diagnostic breakdown of individual experiments (#024, #031, #045, #052, #060), flame radial growth kinetics, and physical observations.
- **Side-by-Side Telemetry Benchmark**: Multi-probe comparison matrix with automated duration delta ($\Delta$) and peak thermal comparisons.
- **AI-Powered Synthesis & Spacecraft Safety**: Prototype interface for querying combustion physics models, hypoxic oxygen suppression curves ($14\% - 30\% \text{ O}_2$), and Artemis cabin fire safety standards.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with NASA Deep Space & Scientific HUD palette
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Data Layer**: Clean mock data layer (`src/data/mockData.js`) decoupled from UI for seamless future backend/API integration.

---

## 📦 Project Structure

```
├── index.html                # App shell
├── package.json              # Project dependencies
├── tailwind.config.js        # NASA Deep Space color definitions
├── vite.config.js            # Vite configuration
└── src/
    ├── data/
    │   └── mockData.js       # Independent mock data layer
    ├── layouts/
    │   └── MainLayout.jsx    # Responsive sidebar & mission header layout
    ├── components/
    │   ├── Header.jsx        # Telemetry status, UTC clock & flight health
    │   ├── Sidebar.jsx       # NASA brand & navigation
    │   ├── StatCard.jsx      # Scientific metric card
    │   ├── ExperimentCard.jsx# Individual experiment card
    │   ├── DataTable.jsx     # High-density scientific table
    │   ├── ChartCard.jsx     # Reusable Recharts container
    │   ├── AIInsightCard.jsx # AI research assistant card with evidence
    │   ├── SafetyIndicator.jsx # Spacecraft fire safety progress bars
    │   ├── FilterBar.jsx     # Search & category filter chips
    │   └── ComparisonTable.jsx # Multi-probe telemetry comparison
    └── pages/
        ├── Overview.jsx      # Mission overview & primary telemetry
        ├── Explore.jsx       # Catalogue exploration & filters
        ├── Detail.jsx        # Detailed experiment analysis
        ├── Compare.jsx       # Side-by-side probe benchmark
        ├── Insights.jsx      # AI combustion synthesis & hypoxic curves
        └── About.jsx         # Mission context & NASA GRC facility info
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project folder
cd microgravity-dashboard

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be running at `http://localhost:3000`.

---

## 📜 License & Acknowledgments

This project is built for scientific research prototyping and educational demonstration. Inspired by research conducted by **NASA Glenn Research Center (GRC)** aboard the **International Space Station (ISS)** Combustion Integrated Rack (CIR).
