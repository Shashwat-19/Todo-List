import React from 'react';

interface Props {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterBar: React.FC<Props> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      {(['all', 'active', 'completed'] as const).map(f => (
        <button 
          key={f}
          className={`filter-btn ${currentFilter === f ? 'active' : ''}`} 
          onClick={() => onFilterChange(f)}
          style={{ textTransform: 'capitalize' }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
