import { useEffect, useState } from 'react';
import HistoryList from '../components/HistoryList';
import { getHistory } from '../services/api';
import { initMagnets, initCardAnimations, initTextAnimations } from '../utils/sheryAnimations';

const History = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initTextAnimations('.shery-title');
    initMagnets();

    const loadHistory = async () => {
      try {
        const response = await getHistory();
        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    if (!loading && items.length > 0) {
      const timer = setTimeout(() => {
        initMagnets();
        initCardAnimations();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [loading, items]);

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <span className="eyebrow">WORKSPACE / ARCHIVE</span>
          <h1 className="shery-title">Analysis history.</h1>
          <p>Every conversation, one searchable archive.</p>
        </div>

        <div className="history-count magnet-target">
          {items.length} RECORDS
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="loading-text">Loading history...</p>
      ) : (
        <HistoryList items={items} />
      )}
    </main>
  );
};

export default History;
