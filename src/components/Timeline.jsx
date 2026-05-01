import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { ALL_TOPICS } from '../constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Timeline({ articles }) {
  // We'll build a custom scatter/bubble chart to represent the timeline
  
  const timelineData = useMemo(() => {
    // x-axis: time, y-axis: arbitrary spreading to avoid overlap, r: fixed
    const dataPoints = articles.map((a, i) => {
      const dateObj = new Date(a.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const decimalYear = year + (month / 12);
      
      return {
        x: decimalYear,
        y: ALL_TOPICS.indexOf(a.topic) + 1, // scatter on y axis based on topic
        r: 6,
        article: a
      };
    });

    return {
      datasets: [
        {
          label: 'News Articles',
          data: dataPoints,
          backgroundColor: dataPoints.map(d => d.article.edition === 'nashik2015' ? 'rgba(78, 205, 196, 0.7)' : 'rgba(244, 160, 28, 0.7)'),
          borderColor: dataPoints.map(d => d.article.edition === 'nashik2015' ? '#4ECDC4' : '#F4A01C'),
          borderWidth: 1
        }
      ]
    };
  }, [articles]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const a = context.raw.article;
            return [`${a.date}: ${a.headline}`, `Source: ${a.source} | Topic: ${a.topic}`];
          }
        }
      }
    },
    scales: {
      y: { display: false, min: 0, max: ALL_TOPICS.length + 1 },
      x: {
        min: 2014,
        max: 2026,
        grid: { color: 'rgba(255,255,255,0.1)' },
        ticks: {
          callback: function(value) {
            return Math.floor(value);
          }
        }
      }
    }
  };

  return (
    <div className="card timeline-card">
      <div className="timeline-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#4ECDC4' }}></div>
          <span>Nashik 2015</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#F4A01C' }}></div>
          <span>Prayagraj 2025</span>
        </div>
      </div>
      
      <div className="timeline-chart-container">
        {/* Shaded bands for Kumbh periods */}
        <div className="kumbh-band" style={{ left: '12.5%', width: '4%', background: 'rgba(78, 205, 196, 0.1)', borderLeft: '1px dashed #4ECDC4', borderRight: '1px dashed #4ECDC4' }}>
          <span className="band-label" style={{ color: '#4ECDC4' }}>Kumbh '15</span>
        </div>
        <div className="kumbh-band" style={{ left: '91.6%', width: '2%', background: 'rgba(244, 160, 28, 0.1)', borderLeft: '1px dashed #F4A01C', borderRight: '1px dashed #F4A01C' }}>
          <span className="band-label" style={{ color: '#F4A01C' }}>Kumbh '25</span>
        </div>

        <Bubble data={timelineData} options={options} />
      </div>
    </div>
  );
}

Timeline.propTypes = {
  articles: PropTypes.array.isRequired
};
