import React from 'react';
import PropTypes from 'prop-types';
import { TOPIC_COLORS } from '../constants';

export default function ArticleModal({ selectedArticle, setSelectedArticle }) {
  if (!selectedArticle) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase' }}>
            {selectedArticle.source} <span style={{ textTransform: 'none', marginLeft: '8px' }}>({selectedArticle.sourceType})</span>
          </h3>
          <button onClick={() => setSelectedArticle(null)} className="close-btn">✕</button>
        </div>
        <div className="modal-body">
          <h2 style={{ marginBottom: '20px', fontSize: '1.8rem', lineHeight: 1.3 }}>{selectedArticle.headline}</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span className="badge" style={{ backgroundColor: TOPIC_COLORS[selectedArticle.topic] || '#eee', color: '#000' }}>
              {selectedArticle.topic}
            </span>
            <span className="badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              {selectedArticle.date}
            </span>
            <span className="badge" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              {selectedArticle.edition === 'nashik2015' ? 'Nashik 2015' : 'Prayagraj 2025'}
            </span>
          </div>
          <div style={{ padding: '20px', borderRadius: '8px', background: 'var(--bg-primary)', borderLeft: '4px solid var(--accent-primary)', marginBottom: '20px' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              According to reports from <strong>{selectedArticle.source}</strong>, developments regarding <strong>{selectedArticle.topic.toLowerCase()}</strong> were highlighted prominently during the <strong>{selectedArticle.phase}</strong> phase of the <strong>{selectedArticle.edition === 'nashik2015' ? 'Nashik' : 'Prayagraj'}</strong> Kumbh. 
              <br /><br />
              As this is a structured dataset extraction, the full unstructured article body is not stored directly in this database. 
            </p>
          </div>
          <a 
            href={selectedArticle.url || `https://www.google.com/search?q=${encodeURIComponent(`"${selectedArticle.headline}" OR (${selectedArticle.edition === 'nashik2015' ? 'Nashik' : 'Prayagraj'} Kumbh Mela ${selectedArticle.date.substring(0, 4)} ${selectedArticle.source})`)}`} 
            className="btn" 
            target="_blank" 
            rel="noreferrer" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Read Full Article at {selectedArticle.source}
          </a>
        </div>
      </div>
    </div>
  );
}

ArticleModal.propTypes = {
  selectedArticle: PropTypes.object,
  setSelectedArticle: PropTypes.func.isRequired
};
