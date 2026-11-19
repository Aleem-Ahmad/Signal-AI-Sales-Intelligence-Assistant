const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    inputText: {
      type: String,
      required: true,
      trim: true,
    },

    analysisType: {
      type: String,
      enum: ['customer_message', 'sales_call_notes'],
      required: true,
    },

    result: {
      summary: {
        type: String,
        required: true,
      },

      mainProblem: {
        type: String,
        default: 'Not specified',
      },

      budget: {
        type: String,
        default: 'Not specified',
      },

      timeline: {
        type: String,
        default: 'Not specified',
      },

      suggestedReply: {
        type: String,
        default: '',
      },

      nextSteps: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
