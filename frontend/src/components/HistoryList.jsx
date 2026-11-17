
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3 } from 'lucide-react';

const HistoryList = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="empty-history">
        <Clock3 size={25} />
        <h3>No analysis history yet</h3>
        <p>Your completed analyses will appear here.</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {items.map((item) => (
        <Link
          to={`/history/${item._id}`}
          className="history-item magnet-target"
          key={item._id}
        >
          <div className="history-item-content">
            <span className="eyebrow">
              {item.analysisType.replace('_', ' ')}
            </span>

            <h3>{item.result?.summary || 'Untitled analysis'}</h3>

            <span className="history-date">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>

          <ArrowUpRight size={19} />
        </Link>
      ))}
    </div>
  );
};

export default HistoryList;
