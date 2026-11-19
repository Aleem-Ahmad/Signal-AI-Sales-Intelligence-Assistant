
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

import InputPanel from '../components/InputPanel';
import ResultPanel from '../components/ResultPanel';
import { analyzeInput } from '../services/api';

const Dashboard = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (payload) => {
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await analyzeInput(payload);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <span className="eyebrow">WORKSPACE / OVERVIEW</span>
          <h1>Sales intelligence.</h1>
          <p>Less reading. Better decisions.</p>
        </div>

        <div className="header-tag">
          <Sparkles size={16} />
          POWERED BY GEMINI
        </div>
      </header>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <div className="dashboard-grid">
        <InputPanel
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        <div className="result-wrapper">
          {loading ? (
            <section className="result-panel loading-panel">
              <div className="loader"></div>
              <h3>Reading the conversation...</h3>
              <p>Gemini is extracting useful business intelligence.</p>
            </section>
          ) : (
            <ResultPanel analysis={analysis} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
