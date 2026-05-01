import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

export default function ChartsGrid({ chart1Data, chart1Options, chart2Data, chart3Data, chart4Data }) {
  return (
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
  );
}

ChartsGrid.propTypes = {
  chart1Data: PropTypes.object.isRequired,
  chart1Options: PropTypes.object.isRequired,
  chart2Data: PropTypes.object.isRequired,
  chart3Data: PropTypes.object.isRequired,
  chart4Data: PropTypes.object.isRequired
};
