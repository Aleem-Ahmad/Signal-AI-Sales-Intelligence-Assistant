
import {
  CheckCircle2,
  Copy,
  Wallet,
  CalendarDays,
  MessageSquare,
  ListChecks,
  Target,
} from 'lucide-react';

const ResultPanel = ({ analysis }) => {
  const result = analysis?.result;

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch {
      alert('Unable to copy text');
    }
  };

  if (!result) {
    return (
      <section className="result-panel empty-result">
        <div className="empty-icon">
          <Target size={27} />
        </div>
        <span className="eyebrow">02 / INTELLIGENCE</span>
        <h2>Waiting for a signal.</h2>
        <p>
          Submit a conversation to reveal its key insights,
          customer needs, budget, timeline and recommended actions.
        </p>
      </section>
    );
  }

  return (
    <section className="result-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">02 / INTELLIGENCE</span>
          <h2>Analysis results</h2>
        </div>
        <span className="success-label">
          <CheckCircle2 size={15} /> COMPLETE
        </span>
      </div>

      <div className="summary-block">
        <span className="field-label">EXECUTIVE SUMMARY</span>
        <h3>{result.summary}</h3>
      </div>

      <div className="insight-grid">
        <div className="insight-card">
          <Target size={18} />
          <span>MAIN PROBLEM</span>
          <strong>{result.mainProblem}</strong>
        </div>

        <div className="insight-card">
          <Wallet size={18} />
          <span>BUDGET</span>
          <strong>{result.budget}</strong>
        </div>

        <div className="insight-card">
          <CalendarDays size={18} />
          <span>TIMELINE</span>
          <strong>{result.timeline}</strong>
        </div>
      </div>

      <div className="result-section">
        <div className="result-section-heading">
          <MessageSquare size={18} />
          <h3>Suggested reply</h3>
          <button
            className="icon-button magnet-target"
            onClick={() => copyText(result.suggestedReply)}
            title="Copy reply"
          >
            <Copy size={16} />
          </button>
        </div>

        <p className="reply-text">{result.suggestedReply}</p>
      </div>

      <div className="result-section">
        <div className="result-section-heading">
          <ListChecks size={18} />
          <h3>Recommended next steps</h3>
        </div>

        <ul className="next-steps">
          {result.nextSteps.map((step, index) => (
            <li key={index}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResultPanel;
