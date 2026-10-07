import React, { useState } from 'react';
import { Search, Database, Layers, RefreshCw } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';
import ExperimentCard from '../components/ExperimentCard';
import { MOCK_EXPERIMENTS } from '../data/mockData';

export default function Explore({ onSelectExperiment }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGravity, setSelectedGravity] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Filter logic on mock data
  const filteredExperiments = MOCK_EXPERIMENTS.filter((exp) => {
    const matchesSearch = 
      searchQuery === '' ||
      exp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.src.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGravity = 
      selectedGravity === 'all' || 
      (selectedGravity === 'solid' && exp.fuelType === 'Solid') ||
      (selectedGravity === 'gas' && exp.fuelType === 'Gas') ||
      exp.gravityType === selectedGravity;

    const matchesFuel = 
      selectedFuel === 'all' || 
      exp.fuelType === selectedFuel;

    return matchesSearch && matchesGravity && matchesFuel;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-nasa-border">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-nasa-cyan uppercase">
            FLIGHT TEST CATALOGUE
          </div>
          <h1 className="font-space text-2xl sm:text-3xl font-bold text-white mt-1">
            Explore Microgravity Research
          </h1>
          <p className="text-xs sm:text-sm text-nasa-muted mt-1">
            Browse NASA flight experiments conducted aboard the ISS Combustion Integrated Rack (CIR), parabolic flights, and drop towers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-nasa-surface border border-nasa-border text-nasa-blueLight font-semibold">
            {filteredExperiments.length} OF {MOCK_EXPERIMENTS.length} RECORDS
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGravity={selectedGravity}
        onGravityChange={setSelectedGravity}
        selectedFuel={selectedFuel}
        onFuelChange={setSelectedFuel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main View: Table or Grid */}
      {filteredExperiments.length > 0 ? (
        viewMode === 'table' ? (
          <DataTable
            experiments={filteredExperiments}
            onSelectExperiment={onSelectExperiment}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperiments.map((exp) => (
              <ExperimentCard
                key={exp.id}
                experiment={exp}
                onClick={() => onSelectExperiment(exp.id)}
              />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl bg-nasa-card border border-dashed border-nasa-border">
          <Database className="w-10 h-10 text-nasa-subtle mx-auto mb-3" />
          <h3 className="font-space font-semibold text-base text-white mb-1">
            No Microgravity Experiments Found
          </h3>
          <p className="text-xs text-nasa-muted max-w-md mx-auto mb-4">
            No telemetry records match your search query "{searchQuery}" or selected gravity filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGravity('all');
              setSelectedFuel('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nasa-surface hover:bg-nasa-surface/80 border border-nasa-border text-xs font-mono text-nasa-blueLight transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}

      {/* Additional Catalogue Information */}
      <div className="p-4 rounded-xl bg-nasa-surface/40 border border-nasa-border text-xs font-mono text-nasa-muted flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Showing telemetry datasets archived by NASA Glenn Research Center & ISS National Lab.</span>
        <span className="text-nasa-blueLight">Standard: NASA-STD-6001B</span>
      </div>
    </div>
  );
}
