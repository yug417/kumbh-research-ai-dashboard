import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
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
import { TOPIC_COLORS } from '../constants';
import FilterBar from './FilterBar';
import ChartsGrid from './ChartsGrid';
import ArticleTable from './ArticleTable';
import ArticleModal from './ArticleModal';

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


export default function Dashboard({ articles, theme }) {
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

  const isDark = theme === 'dark';
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
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="dashboard-grid">
      <FilterBar
        filterEdition={filterEdition} setFilterEdition={setFilterEdition}
        filterPhase={filterPhase} setFilterPhase={setFilterPhase}
        filterTopic={filterTopic} setFilterTopic={setFilterTopic}
        filterSourceType={filterSourceType} setFilterSourceType={setFilterSourceType}
        filterStartDate={filterStartDate} setFilterStartDate={setFilterStartDate}
        filterEndDate={filterEndDate} setFilterEndDate={setFilterEndDate}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        exportCSV={exportCSV}
      />

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

      <ChartsGrid 
        chart1Data={chart1Data} chart1Options={chart1Options}
        chart2Data={chart2Data} chart3Data={chart3Data} chart4Data={chart4Data}
      />

      <ArticleTable 
        currentTableData={currentTableData}
        setSelectedArticle={setSelectedArticle}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <ArticleModal 
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
      />
    </div>
  );
}

Dashboard.propTypes = {
  articles: PropTypes.array.isRequired,
  theme: PropTypes.string.isRequired
};
