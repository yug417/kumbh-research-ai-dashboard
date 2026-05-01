import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Download } from 'lucide-react';
import { ALL_TOPICS, TOPIC_COLORS } from '../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);


export default function Dashboard({ articles }) {
  const [filterEdition, setFilterEdition] = useState('All');
  const [filterPhase, setFilterPhase] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterSourceType, setFilterSourceType] = useState('All');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Real-time filtering
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchEdition = filterEdition === 'All' || a.edition === filterEdition;
      const matchPhase = filterPhase === 'All' || a.phase === filterPhase.toLowerCase();
      const matchTopic = filterTopic === 'All' || a.topic === filterTopic;
      const matchSource = filterSourceType === 'All' || a.sourceType === filterSourceType.toLowerCase();
      const matchStartDate = !filterStartDate || a.date >= filterStartDate;
      const matchEndDate = !filterEndDate || a.date <= filterEndDate;
      const matchSearch = a.headline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchEdition && matchPhase && matchTopic && matchSource && matchStartDate && matchEndDate && matchSearch;
    });
  }, [articles, filterEdition, filterPhase, filterTopic, filterSourceType, filterStartDate, filterEndDate, searchQuery]);

  // Derived Stats
  const uniqueTopicsCount = new Set(filteredArticles.map(a => a.topic)).size;
  const nationalCount = filteredArticles.filter(a => a.sourceType === 'national').length;
  const regionalCount = filteredArticles.filter(a => a.sourceType === 'regional').length;

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / rowsPerPage);
  const currentTableData = filteredArticles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // --- CHART 1: Horizontal Bar (Topic count) ---
  const topicCounts = {};
  filteredArticles.forEach(a => { topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1; });
  const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  
  const chart1Data = {
    labels: sortedTopics.map(t => t[0]),
    datasets: [{
      label: 'Articles',
      data: sortedTopics.map(t => t[1]),
      backgroundColor: sortedTopics.map(t => TOPIC_COLORS[t[0]] || '#415A77'),
    }]
  };

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const chart1Options = {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { color: gridColor } }, y: { grid: { display: false } } }
  };

  // --- CHART 2: Grouped Bar (Phase by Edition) ---
  const countPhaseEdition = (phase, edition) => {
    return filteredArticles.filter(a => a.phase === phase && a.edition === edition).length;
  };
  const chart2Data = {
    labels: ['Before', 'During', 'After'],
    datasets: [
      {
        label: 'Nashik 2015',
        data: ['before', 'during', 'after'].map(p => countPhaseEdition(p, 'nashik2015')),
        backgroundColor: '#4ECDC4'
      },
      {
        label: 'Prayagraj 2025',
        data: ['before', 'during', 'after'].map(p => countPhaseEdition(p, 'prayagraj2025')),
        backgroundColor: '#F4A01C'
      }
    ]
  };

  // --- CHART 3: Donut (Source Type) ---
  const chart3Data = {
    labels: ['National', 'Regional'],
    datasets: [{
      data: [nationalCount, regionalCount],
      backgroundColor: ['#415A77', '#F4A01C'],
      borderWidth: 0
    }]
  };

  // --- CHART 4: Timeline Line Chart ---
  const monthCounts = {};
  filteredArticles.forEach(a => {
    const month = a.date.substring(0, 7); // YYYY-MM
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });
  const sortedMonths = Object.keys(monthCounts).sort();
  
  const chart4Data = {
    labels: sortedMonths,
    datasets: [{
      label: 'Articles Published',
      data: sortedMonths.map(m => monthCounts[m]),
      borderColor: '#F4A01C',
      backgroundColor: 'rgba(244, 160, 28, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const exportCSV = () => {
    const headers = "ID,Headline,Source,SourceType,Date,Topic,Edition,Phase\n";
    const csvContent = filteredArticles.map(a => 
      `${a.id},"${a.headline.replace(/"/g, '""')}","${a.source}",${a.sourceType},${a.date},"${a.topic}",${a.edition},${a.phase}`
    ).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "kumbh_articles_export.csv";
    link.click();
  };

  return (
    <div className="dashboard-grid">
      {/* FILTER BAR */}
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

      {/* STATS ROW */}
      <div className="stats-row" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <h2 style={{fontSize: '2rem'}}>{filteredArticles.length}</h2>
          <p>Articles</p>
        </div>
        <div className="stat-card">
          <h2 style={{fontSize: '2rem'}}>{uniqueTopicsCount}</h2>
          <p>Topics</p>
        </div>
        <div className="stat-card">
          <h2 style={{fontSize: '2rem'}}>{nationalCount}</h2>
          <p>National</p>
        </div>
        <div className="stat-card">
          <h2 style={{fontSize: '2rem'}}>{regionalCount}</h2>
          <p>Regional</p>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="charts-grid">
        <div className="card">
          <h3 style={{marginBottom: '16px'}}>Articles per Topic</h3>
          <Bar data={chart1Data} options={chart1Options} height={200} />
        </div>
        <div className="card">
          <h3 style={{marginBottom: '16px'}}>Phases by Edition</h3>
          <Bar data={chart2Data} options={{ responsive: true }} height={200} />
        </div>
        <div className="card">
          <h3 style={{marginBottom: '16px'}}>Source Types</h3>
          <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={chart3Data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="card">
          <h3 style={{marginBottom: '16px'}}>Publication Timeline</h3>
          <Line data={chart4Data} options={{ responsive: true }} height={200} />
        </div>
      </div>

      {/* DATA TABLE */}
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

      {/* ARTICLE MODAL */}
      {selectedArticle && (
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
      )}
    </div>
  );
}
