import React from 'react';
import PropTypes from 'prop-types';
import { Download } from 'lucide-react';
import { ALL_TOPICS } from '../constants';

export default function FilterBar({
  filterEdition, setFilterEdition,
  filterPhase, setFilterPhase,
  filterTopic, setFilterTopic,
  filterSourceType, setFilterSourceType,
  filterStartDate, setFilterStartDate,
  filterEndDate, setFilterEndDate,
  searchQuery, setSearchQuery,
  setCurrentPage,
  exportCSV
}) {
  return (
    <div className="card filter-bar">
      <select className="filter-select" value={filterEdition} onChange={e => {setFilterEdition(e.target.value); setCurrentPage(1);}}>
        <option value="All">All Editions</option>
        <option value="nashik2015">Nashik 2015</option>
        <option value="prayagraj2025">Prayagraj 2025</option>
      </select>
      
      <select className="filter-select" value={filterPhase} onChange={e => {setFilterPhase(e.target.value); setCurrentPage(1);}}>
        <option value="All">All Phases</option>
        <option value="Before">Before</option>
        <option value="During">During</option>
        <option value="After">After</option>
      </select>
      
      <select className="filter-select" value={filterTopic} onChange={e => {setFilterTopic(e.target.value); setCurrentPage(1);}}>
        <option value="All">All Topics</option>
        {ALL_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      
      <select className="filter-select" value={filterSourceType} onChange={e => {setFilterSourceType(e.target.value); setCurrentPage(1);}}>
        <option value="All">All Sources</option>
        <option value="National">National</option>
        <option value="Regional">Regional</option>
      </select>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="date" 
          className="filter-input" 
          value={filterStartDate}
          onChange={e => {setFilterStartDate(e.target.value); setCurrentPage(1);}}
          title="Start Date"
        />
        <span style={{color: 'var(--text-secondary)'}}>to</span>
        <input 
          type="date" 
          className="filter-input" 
          value={filterEndDate}
          onChange={e => {setFilterEndDate(e.target.value); setCurrentPage(1);}}
          title="End Date"
        />
      </div>
      
      <input 
        type="text" 
        className="filter-input" 
        placeholder="Search headline..." 
        value={searchQuery}
        onChange={e => {setSearchQuery(e.target.value); setCurrentPage(1);}}
      />
      
      <button className="btn" onClick={exportCSV} style={{ marginLeft: 'auto' }}>
        <Download size={16} /> Export CSV
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  filterEdition: PropTypes.string.isRequired,
  setFilterEdition: PropTypes.func.isRequired,
  filterPhase: PropTypes.string.isRequired,
  setFilterPhase: PropTypes.func.isRequired,
  filterTopic: PropTypes.string.isRequired,
  setFilterTopic: PropTypes.func.isRequired,
  filterSourceType: PropTypes.string.isRequired,
  setFilterSourceType: PropTypes.func.isRequired,
  filterStartDate: PropTypes.string.isRequired,
  setFilterStartDate: PropTypes.func.isRequired,
  filterEndDate: PropTypes.string.isRequired,
  setFilterEndDate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  exportCSV: PropTypes.func.isRequired
};
