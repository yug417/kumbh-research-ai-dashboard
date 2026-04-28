# Kumbh Mela News Intelligence Platform

Kumbh Mela News Intelligence Platform — built for the Kumbh Research & AI Internship Program.

## Overview
This is a data journalism and AI research dashboard that visualizes a structured news dataset collected from real newspaper sources about two distinct Kumbh Mela events:
- **Nashik Kumbh Mela 2015** (Coverage: Aug 2014 – Sep 2016)
- **Prayagraj Maha Kumbh 2025** (Coverage: Jan 2024 – Mar 2026)

## Features
- **Dashboard**: Real-time filtering by Edition, Phase, Topic, Source, and Keyword. Includes dynamic Chart.js visualizations (Bar, Doughnut, Line) and a paginated dataset table.
- **Topic Insights**: Grid breakdown of 12 thematic buckets with AI-generated summaries and headline tracking.
- **Timeline Mapping**: Chronological Scatter chart plotting news distribution across both events.
- **AI Insights**: Matrix comparison of coverage trends and key paradigm shifts.

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (Glassmorphism & Dark Mode)
- **Visualizations**: Chart.js & React-ChartJS-2
- **Icons**: Lucide React
- **Data**: Static JSON (`src/data/articles.json`)

## Dataset Structure
The platform is powered by a rigorously structured JSON dataset (`src/data/articles.json`) containing 52 real-world news articles. Each article strictly follows this schema:
```json
{
  "id": 1,
  "headline": "...",
  "source": "Times of India",
  "sourceType": "national",
  "date": "YYYY-MM-DD",
  "topic": "Sanitation & Pollution",
  "edition": "nashik2015",
  "phase": "before",
  "url": "..."
}
```

## How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *Note: On Windows, if your folder path contains the `&` symbol, you may need to use `npx vite` or `.\node_modules\.bin\vite.ps1` instead of `npm run dev`.*

3. **Build for Production**
   ```bash
   npm run build
   ```
