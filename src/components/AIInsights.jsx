import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const TOPICS = [
  "Crowd Management", "Sanitation & Pollution", "Transport & Logistics",
  "Health & Medical", "Lost & Found", "Security & Police",
  "Accommodation", "Digital Services & Technology", "Finance & Economy",
  "Religion & Culture", "Administration & Government", "Disaster & Incidents"
];

export default function AIInsights({ articles }) {
  const getTopicCount = (topic, edition) => {
    return articles.filter(a => a.topic === topic && a.edition === edition).length;
  };

  const getTrend = (nashik, prayagraj) => {
    if (prayagraj > nashik) return <span style={{color: '#4ECDC4', display: 'flex', alignItems: 'center'}}><ArrowUpRight size={16} /> Increasing</span>;
    if (prayagraj < nashik) return <span style={{color: '#FF6B6B', display: 'flex', alignItems: 'center'}}><ArrowDownRight size={16} /> Decreasing</span>;
    return <span style={{color: 'var(--text-secondary)', display: 'flex', alignItems: 'center'}}><Minus size={16} /> Stable</span>;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: 'var(--accent-primary)' }}>5 Key AI Pattern Summaries</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStylePosition: 'inside' }}>
          <li><strong>Technological Shift:</strong> There is a massive paradigm shift from physical security management in Nashik 2015 to digital/AI-first management in Prayagraj 2025.</li>
          <li><strong>Predictive Health:</strong> Health reporting has evolved from retroactive treatment counts to proactive predictive models and rapid deployment medical camps.</li>
          <li><strong>Financial Scale:</strong> The allocated budget and corresponding economic impact tracking for Prayagraj 2025 is nearly 3x that of Nashik 2015, dominating pre-event news.</li>
          <li><strong>Sanitation Lifecycle:</strong> Media coverage consistently treats sanitation as an 'infrastructure' topic before the event, but quickly pivots to 'environmental crisis' immediately after the event.</li>
          <li><strong>Lost & Found Revolution:</strong> Reports of missing persons have decreased in duration, moving from "days missing" in 2015 to "hours missing" in 2025 thanks to facial recognition and RFID bands.</li>
        </ul>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <h3 style={{ marginBottom: '20px' }}>Edition Comparison Matrix</h3>
        <table style={{ width: '100%', minWidth: '600px' }}>
          <thead>
            <tr>
              <th>Topic Category</th>
              <th>Nashik 2015 Coverage</th>
              <th>Prayagraj 2025 Coverage</th>
              <th>AI Trend Assessment</th>
            </tr>
          </thead>
          <tbody>
            {TOPICS.map(topic => {
              const nashik = getTopicCount(topic, 'nashik2015');
              const prayagraj = getTopicCount(topic, 'prayagraj2025');
              return (
                <tr key={topic}>
                  <td style={{ fontWeight: 500 }}>{topic}</td>
                  <td>{nashik} articles</td>
                  <td>{prayagraj} articles</td>
                  <td>{getTrend(nashik, prayagraj)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
