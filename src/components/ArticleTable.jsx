import React from 'react';
import PropTypes from 'prop-types';
import { TOPIC_COLORS } from '../constants';

export default function ArticleTable({ 
  currentTableData, 
  setSelectedArticle, 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) {
  return (
    <div className="card table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Headline</th>
            <th>Source</th>
            <th>Date</th>
            <th>Topic</th>
            <th>Edition</th>
            <th>Phase</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(a => (
            <tr key={a.id} onClick={() => setSelectedArticle(a)} style={{ cursor: 'pointer' }}>
              <td>{a.id}</td>
              <td style={{fontWeight: 500}}>{a.headline}</td>
              <td>{a.source}</td>
              <td>{a.date}</td>
              <td>
                <span className="badge" style={{backgroundColor: TOPIC_COLORS[a.topic] || '#eee', color: '#000'}}>
                  {a.topic}
                </span>
              </td>
              <td>{a.edition === 'nashik2015' ? 'Nashik' : 'Prayagraj'}</td>
              <td>
                <span className="badge" style={{
                  backgroundColor: a.phase === 'before' ? '#415A77' : a.phase === 'during' ? '#F4A01C' : '#4ECDC4',
                  color: a.phase === 'during' ? '#000' : '#fff'
                }}>
                  {a.phase.toUpperCase()}
                </span>
              </td>
              <td><span style={{textTransform: 'capitalize'}}>{a.sourceType}</span></td>
            </tr>
          ))}
          {currentTableData.length === 0 && (
            <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px'}}>No articles found.</td></tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <button 
            className="btn" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Prev
          </button>
          <span style={{ padding: '8px', color: 'var(--text-secondary)' }}>Page {currentPage} of {totalPages}</span>
          <button 
            className="btn" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

ArticleTable.propTypes = {
  currentTableData: PropTypes.array.isRequired,
  setSelectedArticle: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};
