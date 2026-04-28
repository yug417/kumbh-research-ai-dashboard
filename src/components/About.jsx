import React from 'react';

export default function About() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
      
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>What is Kumbh Mela?</h3>
        <p>The Kumbh Mela is a major pilgrimage and festival in Hinduism, celebrated in a cycle of approximately 12 years at four river-bank pilgrimage sites. It is considered one of the largest peaceful gatherings in the world. This project specifically analyzes the Nashik Kumbh Mela of 2015 and the Prayagraj Maha Kumbh Mela of 2025.</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>About The Program</h3>
        <p>This dataset and dashboard were created as part of the Kumbh Research & AI Internship Program. The initiative aims to build structured, AI-ready datasets from complex, multi-year news coverage, allowing for deep chronological and comparative analysis of mega-events.</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>Data Collection Methodology</h3>
        <p>A structured news dataset was collected from 13 real newspaper sources (National and Regional) covering two distinct periods: August 2014 – September 2016 (Nashik) and January 2024 – March 2026 (Prayagraj). Over 50 unique, high-value articles were manually verified, structured into JSON format, and tagged with specific metadata (Date, Edition, Phase, Topic).</p>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px', color: 'var(--accent-primary)' }}>Topic Extraction Criteria</h3>
        <p>Every article is strictly categorized into one of 12 thematic buckets to ensure data consistency: Crowd Management, Sanitation & Pollution, Transport & Logistics, Health & Medical, Lost & Found, Security & Police, Accommodation, Digital Services & Technology, Finance & Economy, Religion & Culture, Administration & Government, and Disaster & Incidents.</p>
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'rgba(244, 160, 28, 0.05)', borderColor: 'var(--accent-primary)' }}>
        <h3 style={{ marginBottom: '16px' }}>Project Credits</h3>
        <p>Developed for the <strong>Kumbh Research & AI Internship</strong></p>
      </div>

    </div>
  );
}
