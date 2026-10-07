import React from 'react';
import { Search, Filter, LayoutGrid, Table, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  selectedGravity, 
  onGravityChange,
  selectedFuel,
  onFuelChange,
  viewMode,
  onViewModeChange 
}) {
  const chips = [
    { id: 'all', label: 'All Experiments' },
    { id: 'microgravity', label: 'Microgravity (μg)' },
    { id: 'lunar', label: 'Lunar (0.16 g)' },
    { id: 'earth', label: 'Earth (1 g)' },
    { id: 'solid', label: 'Solid Fuels' },
    { id: 'gas', label: 'Gaseous Flames' }
  ];

  return (
    <div className="space-y-3.5 mb-6">
      {/* Search & Dropdowns Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input placeholder */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-nasa-subtle absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search experiments by ID, fuel type, facility (e.g. Methane, FLEX-2, PMMA)..."
            className="w-full bg-nasa-surface/90 border border-nasa-border rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-nasa-subtle focus:outline-none focus:border-nasa-blueLight/60 focus:ring-1 focus:ring-nasa-blueLight/30 transition-all font-mono"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2">
          <select 
            value={selectedFuel}
            onChange={(e) => onFuelChange(e.target.value)}
            className="bg-nasa-surface border border-nasa-border rounded-lg px-3 py-2.5 text-xs text-nasa-text font-mono focus:outline-none focus:border-nasa-blueLight/60"
          >
            <option value="all">Fuel Type: All</option>
            <option value="Gas">Gaseous (CH₄, C₂H₄)</option>
            <option value="Liquid">Liquid (Heptane)</option>
            <option value="Solid">Solid (PMMA Acrylic)</option>
          </select>

          <select 
            value={selectedGravity}
            onChange={(e) => onGravityChange(e.target.value)}
            className="bg-nasa-surface border border-nasa-border rounded-lg px-3 py-2.5 text-xs text-nasa-text font-mono focus:outline-none focus:border-nasa-blueLight/60"
          >
            <option value="all">Gravity: All</option>
            <option value="microgravity">Microgravity (μg)</option>
            <option value="lunar">Lunar 0.16 g</option>
            <option value="earth">Earth 1 g</option>
          </select>

          {/* View Toggler (Grid vs Table) */}
          <div className="flex items-center bg-nasa-surface p-1 rounded-lg border border-nasa-border">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'table' ? 'bg-nasa-blue text-white shadow' : 'text-nasa-subtle hover:text-white'}`}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'grid' ? 'bg-nasa-blue text-white shadow' : 'text-nasa-subtle hover:text-white'}`}
              title="Card Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-mono text-nasa-subtle flex items-center gap-1 uppercase">
          <Filter className="w-3 h-3 text-nasa-cyan" /> Quick:
        </span>
        {chips.map((chip) => {
          const isActive = selectedGravity === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onGravityChange(chip.id)}
              className={`
                px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all border
                ${isActive 
                  ? 'bg-nasa-blue/20 text-nasa-blueLight border-nasa-blueLight/40 shadow-sm' 
                  : 'bg-nasa-surface/60 text-nasa-muted border-nasa-border hover:border-nasa-borderHover hover:text-white'}
              `}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
