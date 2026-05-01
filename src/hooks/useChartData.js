import { useMemo } from 'react';
import { TOPIC_COLORS } from '../constants';

export default function useChartData(filteredArticles, theme) {
  // CHART 1: Horizontal Bar (Topic count)
  const { chart1Data, chart1Options } = useMemo(() => {
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

    return { chart1Data, chart1Options };
  }, [filteredArticles, theme]);

  // CHART 2: Grouped Bar (Phase by Edition)
  const chart2Data = useMemo(() => {
    const countPhaseEdition = (phase, edition) => {
      return filteredArticles.filter(a => a.phase === phase && a.edition === edition).length;
    };
    return {
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
  }, [filteredArticles]);

  // CHART 3: Donut (Source Type)
  const chart3Data = useMemo(() => {
    const nationalCount = filteredArticles.filter(a => a.sourceType === 'national').length;
    const regionalCount = filteredArticles.filter(a => a.sourceType === 'regional').length;
    
    return {
      labels: ['National', 'Regional'],
      datasets: [{
        data: [nationalCount, regionalCount],
        backgroundColor: ['#415A77', '#F4A01C'],
        borderWidth: 0
      }]
    };
  }, [filteredArticles]);

  // CHART 4: Timeline Line Chart
  const chart4Data = useMemo(() => {
    const monthCounts = {};
    filteredArticles.forEach(a => {
      const month = a.date.substring(0, 7); // YYYY-MM
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const sortedMonths = Object.keys(monthCounts).sort();
    
    return {
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
  }, [filteredArticles]);

  return { chart1Data, chart1Options, chart2Data, chart3Data, chart4Data };
}
