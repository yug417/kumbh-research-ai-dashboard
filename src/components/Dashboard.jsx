import React, { useState, useMemo, useReducer } from 'react';
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
import useChartData from '../hooks/useChartData';

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


const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EDITION': return { ...state, edition: action.payload };
    case 'SET_PHASE': return { ...state, phase: action.payload };
    case 'SET_TOPIC': return { ...state, topic: action.payload };
    case 'SET_SOURCE_TYPE': return { ...state, sourceType: action.payload };
    case 'SET_START_DATE': return { ...state, startDate: action.payload };
    case 'SET_END_DATE': return { ...state, endDate: action.payload };
    case 'SET_SEARCH_QUERY': return { ...state, searchQuery: action.payload };
    default: return state;
  }
};
const initialFilterState = { edition: 'All', phase: 'All', topic: 'All', sourceType: 'All', startDate: '', endDate: '', searchQuery: '' };

export default function Dashboard({ articles, theme }) {
  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Real-time filtering
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchEdition = filterState.edition === 'All' || a.edition === filterState.edition;
      const matchPhase = filterState.phase === 'All' || a.phase === filterState.phase.toLowerCase();
      const matchTopic = filterState.topic === 'All' || a.topic === filterState.topic;
      const matchSource = filterState.sourceType === 'All' || a.sourceType === filterState.sourceType.toLowerCase();
      const matchStartDate = !filterState.startDate || a.date >= filterState.startDate;
      const matchEndDate = !filterState.endDate || a.date <= filterState.endDate;
      const matchSearch = a.headline.toLowerCase().includes(filterState.searchQuery.toLowerCase());
      return matchEdition && matchPhase && matchTopic && matchSource && matchStartDate && matchEndDate && matchSearch;
    });
  }, [articles, filterState]);

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

  // Use custom hook for chart data
  const { chart1Data, chart1Options, chart2Data, chart3Data, chart4Data } = useChartData(filteredArticles, theme);

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
        filterState={filterState}
        dispatch={dispatch}
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
