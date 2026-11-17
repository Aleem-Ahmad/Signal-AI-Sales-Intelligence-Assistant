import { useState, useEffect } from 'react';
import InputPanel from '../components/InputPanel';
import ResultPanel from '../components/ResultPanel';
import { analyzeInput } from '../services/api';
import { initMagnets, initCardAnimations, initTextAnimations } from '../utils/sheryAnimations';

const Dashboard = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    initTextAnimations('.shery-title');
    initMagnets();
    initCardAnimations();
  }, []);

  useEffect(() => {
    if (analysis) {
      const timer = setTimeout(() => {
        initMagnets();
        initCardAnimations();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [analysis]);

  const handleAnalyze = async (payload) => {
    setLoading(true);
    setError('');

    try {
      const response = await analyzeInput(payload);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <span className="eyebrow">WORKSPACE / COCKPIT</span>
          <h1 className="shery-title">Deal intelligence.</h1>
          <p>Extract instant sales signal from raw prospect communication.</p>
        </div>

        <div className="header-tag magnet-target">
          <span className="status-dot"></span>
          AI ENGINE READY
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-grid">
        <InputPanel onAnalyze={handleAnalyze} loading={loading} />

        {loading ? (
          <section className="result-panel loading-panel">
            <div className="loader"></div>
            <h3>Extracting intelligence...</h3>
            <p>Synthesizing conversation data with Gemini</p>
          </section>
        ) : (
          <ResultPanel analysis={analysis} />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
