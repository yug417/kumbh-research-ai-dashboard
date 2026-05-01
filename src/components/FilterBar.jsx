import React from 'react';
import PropTypes from 'prop-types';
import { Download } from 'lucide-react';
import { ALL_TOPICS } from '../constants';

export default function FilterBar({
  filterState, dispatch,
  setCurrentPage,
  exportCSV
}) {
  return (
    <div className="card filter-bar">
      <select className="filter-select" value={filterState.edition} onChange={e => {dispatch({ type: 'SET_EDITION', payload: e.target.value }); setCurrentPage(1);}}>
        <option value="All">All Editions</option>
        <option value="nashik2015">Nashik 2015</option>
        <option value="prayagraj2025">Prayagraj 2025</option>
      </select>
      
      <select className="filter-select" value={filterState.phase} onChange={e => {dispatch({ type: 'SET_PHASE', payload: e.target.value }); setCurrentPage(1);}}>
        <option value="All">All Phases</option>
        <option value="Before">Before</option>
        <option value="During">During</option>
        <option value="After">After</option>
      </select>
      
      <select className="filter-select" value={filterState.topic} onChange={e => {dispatch({ type: 'SET_TOPIC', payload: e.target.value }); setCurrentPage(1);}}>
        <option value="All">All Topics</option>
        {ALL_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      
      <select className="filter-select" value={filterState.sourceType} onChange={e => {dispatch({ type: 'SET_SOURCE_TYPE', payload: e.target.value }); setCurrentPage(1);}}>
        <option value="All">All Sources</option>
        <option value="National">National</option>
        <option value="Regional">Regional</option>
      </select>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="date" 
          className="filter-input" 
          value={filterState.startDate}
          onChange={e => {dispatch({ type: 'SET_START_DATE', payload: e.target.value }); setCurrentPage(1);}}
          title="Start Date"
        />
        <span style={{color: 'var(--text-secondary)'}}>to</span>
        <input 
          type="date" 
          className="filter-input" 
          value={filterState.endDate}
          onChange={e => {dispatch({ type: 'SET_END_DATE', payload: e.target.value }); setCurrentPage(1);}}
          title="End Date"
        />
      </div>
      
      <input 
        type="text" 
        className="filter-input" 
        placeholder="Search headline..." 
        value={filterState.searchQuery}
        onChange={e => {dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value }); setCurrentPage(1);}}
      />
      
      <button className="btn" onClick={exportCSV} style={{ marginLeft: 'auto' }}>
        <Download size={16} /> Export CSV
      </button>
    </div>
  );
}

FilterBar.propTypes = {
  filterState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  exportCSV: PropTypes.func.isRequired
};
