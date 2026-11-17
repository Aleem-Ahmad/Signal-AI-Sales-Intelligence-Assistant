import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';

import ResultPanel from '../components/ResultPanel';
import { getAnalysisById, deleteAnalysis } from '../services/api';
import { initMagnets, initCardAnimations, initTextAnimations } from '../utils/sheryAnimations';

const AnalysisDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initTextAnimations('.shery-title');
    initMagnets();

    const loadAnalysis = async () => {
      try {
        const response = await getAnalysisById(id);
        setAnalysis(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, [id]);

  useEffect(() => {
    if (analysis) {
      const timer = setTimeout(() => {
        initMagnets();
        initCardAnimations();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [analysis]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this analysis permanently?')) return;

    try {
      await deleteAnalysis(id);
      navigate('/history');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <main className="page-content">Loading analysis...</main>;
  }

  if (error || !analysis) {
    return (
      <main className="page-content">
        <div className="error-message">
          {error || 'Analysis not found'}
        </div>
        <Link to="/history" className="back-link magnet-target">
          <ArrowLeft size={16} /> Back to history
        </Link>
      </main>
    );
  }

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <Link to="/history" className="back-link magnet-target">
            <ArrowLeft size={16} /> Back to history
          </Link>
          <span className="eyebrow">ARCHIVE / DETAIL</span>
          <h1 className="shery-title">Analysis detail.</h1>
          <p>{new Date(analysis.createdAt).toLocaleString()}</p>
        </div>

        <button className="delete-button magnet-target" onClick={handleDelete}>
          <Trash2 size={16} /> Delete
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="detail-layout">
        <section className="original-input">
          <span className="eyebrow">ORIGINAL INPUT</span>
          <p>{analysis.inputText}</p>
        </section>

        <ResultPanel analysis={analysis} />
      </div>
    </main>
  );
};

export default AnalysisDetail;
