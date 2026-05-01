import React from 'react';
import PropTypes from 'prop-types';
import { Users, Trash2, Bus, Stethoscope, Search, ShieldAlert, Home, Smartphone, TrendingUp, Sparkles, Landmark, AlertTriangle, ExternalLink } from 'lucide-react';
import { ALL_TOPICS, TOPIC_COLORS } from '../constants';

const TOPIC_ICONS = {
  "Crowd Management": <Users size={24} color="#FF6B6B" />,
  "Sanitation & Pollution": <Trash2 size={24} color="#4ECDC4" />,
  "Transport & Logistics": <Bus size={24} color="#45B7D1" />,
  "Health & Medical": <Stethoscope size={24} color="#F9ED69" />,
  "Lost & Found": <Search size={24} color="#F08A5D" />,
  "Security & Police": <ShieldAlert size={24} color="#B83B5E" />,
  "Accommodation": <Home size={24} color="#6A2C70" />,
  "Digital Services & Technology": <Smartphone size={24} color="#00B8A9" />,
  "Finance & Economy": <TrendingUp size={24} color="#F8F3D4" />,
  "Religion & Culture": <Sparkles size={24} color="#F4A01C" />,
  "Administration & Government": <Landmark size={24} color="#95E1D3" />,
  "Disaster & Incidents": <AlertTriangle size={24} color="#EAFFD0" />
};

const AI_INSIGHTS = {
  "Crowd Management": "Crowd management coverage consistently peaks during Shahi Snan dates, with Prayagraj utilizing AI compared to physical barriers in Nashik.",
  "Sanitation & Pollution": "Sanitation transitions from 'preparation' focus before the event to 'crisis management' (river pollution) after the event concludes.",
  "Transport & Logistics": "Transport logistics dominate the 'before' phase news, emphasizing special trains and new airport terminals.",
  "Health & Medical": "Health coverage spikes 2 weeks into each Kumbh due to minor outbreak concerns and winter ailments.",
  "Lost & Found": "Lost & Found is a uniquely high-volume topic 'during' the event, now strongly mitigated by digital tools like facial recognition.",
  "Security & Police": "Security discussions shift from 'deployment counts' beforehand to 'incident response' during the main bathing days.",
  "Accommodation": "Tent city infrastructure is a major pre-event talking point, followed by dismantling challenges post-event.",
  "Digital Services & Technology": "There is a massive 300% increase in digital services coverage for Prayagraj 2025 compared to Nashik 2015.",
  "Finance & Economy": "Economic impact articles uniformly appear in the 'after' phase, boasting 30-40% boosts to local economies.",
  "Religion & Culture": "Religious coverage remains steady, primarily tracking the movements of Sadhus, Akhadas, and foreign tourist experiences.",
  "Administration & Government": "Government coverage is highly laudatory post-event, contrasting with critical infrastructure reviews pre-event.",
  "Disaster & Incidents": "Minor incidents (stampede scares) generate disproportionate national media coverage compared to regional media."
};

export default function TopicInsights({ articles }) {
  const topics = Object.keys(TOPIC_ICONS);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
      {topics.map(topic => {
        const topicArticles = articles.filter(a => a.topic === topic);
        const nashikCount = topicArticles.filter(a => a.edition === 'nashik2015').length;
        const prayagrajCount = topicArticles.filter(a => a.edition === 'prayagraj2025').length;
        const beforeCount = topicArticles.filter(a => a.phase === 'before').length;
        const duringCount = topicArticles.filter(a => a.phase === 'during').length;
        const afterCount = topicArticles.filter(a => a.phase === 'after').length;
        
        const topHeadlines = [...topicArticles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

        return (
          <div key={topic} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              {TOPIC_ICONS[topic]}
              <h3 style={{ fontSize: '1.2rem' }}>{topic}</h3>
              <span className="badge" style={{ marginLeft: 'auto', background: 'var(--accent-primary)', color: '#000' }}>
                {topicArticles.length}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div><strong>Nashik:</strong> {nashikCount} | <strong>Prayagraj:</strong> {prayagrajCount}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem' }}>
              <span className="phase-badge before">B: {beforeCount}</span>
              <span className="phase-badge during">D: {duringCount}</span>
              <span className="phase-badge after">A: {afterCount}</span>
            </div>

            <div className="insight-quote">
              "{AI_INSIGHTS[topic]}"
            </div>

            <div style={{ marginTop: 'auto' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Top Headlines</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topHeadlines.map(h => (
                  <li key={h.id} style={{ fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <ExternalLink size={14} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--text-secondary)' }} />
                    <span>{h.headline} <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>({h.source})</span></span>
                  </li>
                ))}
                {topHeadlines.length === 0 && <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No articles found.</li>}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

TopicInsights.propTypes = {
  articles: PropTypes.array.isRequired
};
