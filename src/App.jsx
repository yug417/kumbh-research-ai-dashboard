import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, BarChart3, Clock, Brain, Info } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TopicInsights from './components/TopicInsights';
import Timeline from './components/Timeline';
import AIInsights from './components/AIInsights';
import About from './components/About';
import articlesData from './data/articles.json';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Kumbh Intelligence</div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('dashboard')} className="nav-link">Dashboard</button>
          <button onClick={() => scrollToSection('insights')} className="nav-link">Topic Insights</button>
          <button onClick={() => scrollToSection('timeline')} className="nav-link">Timeline</button>
          <button onClick={() => scrollToSection('ai')} className="nav-link">AI Output</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <main>
        {/* Sections will go here */}
        <section id="hero" className="section-hero">
          <div className="hero-content">
            <h1>Kumbh Mela News Intelligence</h1>
            <p className="subtitle">A structured AI-ready dataset across two Kumbh events</p>
            <p className="description">
              A data journalism and AI research platform displaying structured news data from Nashik 2015 and Prayagraj 2025.
            </p>
            <div className="stats-row">
              <div className="stat-card">
                <h2>{articles.length}</h2>
                <p>Total Articles</p>
              </div>
              <div className="stat-card">
                <h2>{new Set(articles.map(a => a.topic)).size}</h2>
                <p>Unique Topics</p>
              </div>
              <div className="stat-card">
                <h2>{new Set(articles.map(a => a.edition)).size}</h2>
                <p>Editions Covered</p>
              </div>
              <div className="stat-card">
                <h2>{new Set(articles.map(a => a.date.substring(0,4))).size}</h2>
                <p>Years of Data</p>
              </div>
            </div>
            <button className="btn hero-cta" onClick={() => scrollToSection('dashboard')}>
              Explore the Dataset <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section id="dashboard" className="section">
          <div className="section-header">
            <h2><BarChart3 className="icon" /> Dashboard</h2>
            <p>Interactive dataset exploration</p>
          </div>
          <Dashboard articles={articles} />
        </section>

        <section id="insights" className="section">
          <div className="section-header">
            <h2>Topic Insights</h2>
            <p>Deep dive into specific coverage areas</p>
          </div>
          <TopicInsights articles={articles} />
        </section>

        <section id="timeline" className="section">
          <div className="section-header">
            <h2><Clock className="icon" /> Timeline Mapping</h2>
            <p>Chronological news publication tracking</p>
          </div>
          <Timeline articles={articles} />
        </section>

        <section id="ai" className="section">
          <div className="section-header">
            <h2><Brain className="icon" /> AI Insights</h2>
            <p>Basic AI-generated analysis of the dataset</p>
          </div>
          <AIInsights articles={articles} />
        </section>

        <section id="about" className="section">
          <div className="section-header">
            <h2><Info className="icon" /> Methodology</h2>
            <p>About the project and data collection</p>
          </div>
          <About />
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Kumbh Research & AI Internship Program</p>
      </footer>
    </div>
  );
}

export default App;
