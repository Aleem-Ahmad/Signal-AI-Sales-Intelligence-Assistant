
import { useState } from 'react';
import { Send, FileText } from 'lucide-react';

const InputPanel = ({ onAnalyze, loading }) => {
  const [inputText, setInputText] = useState('');
  const [analysisType, setAnalysisType] = useState('customer_message');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.trim().length < 10 || loading) return;

    onAnalyze({
      inputText: inputText.trim(),
      analysisType,
    });
  };

  return (
    <section className="input-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">01 / INPUT</span>
          <h2>Conversation source</h2>
        </div>
        <FileText size={20} className="muted-icon" />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="field-label">ANALYSIS TYPE</label>

        <div className="type-selector">
          <button
            type="button"
            className={analysisType === 'customer_message' ? 'type-option magnet-target selected' : 'type-option magnet-target'}
            onClick={() => setAnalysisType('customer_message')}
          >
            Customer message
          </button>

          <button
            type="button"
            className={analysisType === 'sales_call_notes' ? 'type-option magnet-target selected' : 'type-option magnet-target'}
            onClick={() => setAnalysisType('sales_call_notes')}
          >
            Sales call notes
          </button>
        </div>

        <label className="field-label" htmlFor="customer-input">
          PASTE YOUR CONTENT
        </label>

        <textarea
          id="customer-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste a customer message, sales conversation, or meeting notes here..."
          rows={11}
          maxLength={10000}
          required
          minLength={10}
        />

        <div className="input-footer">
          <span>{inputText.length.toLocaleString()} / 10,000</span>
          <span>Minimum 10 characters</span>
        </div>

        <button
          type="submit"
          className="primary-button magnet-target"
          disabled={loading || inputText.trim().length < 10}
        >
          {loading ? 'Analyzing...' : 'Analyze conversation'}
          <Send size={16} />
        </button>
      </form>
    </section>
  );
};

export default InputPanel;
