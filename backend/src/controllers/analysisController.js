
const Analysis = require('../models/Analysis');

const analyzeWithGemini = require('../services/geminiService');

const analyzeInput = async (req, res, next) => {
  try {
    const { inputText, analysisType } = req.body;

    // Call the actual Gemini API
    const result = await analyzeWithGemini(
      inputText,
      analysisType
    );

    // Save successful analysis in MongoDB
    const analysis = await Analysis.create({
      inputText,
      analysisType,
      result,
    });

    res.status(201).json({
      success: true,
      message: 'Analysis completed successfully',
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeInput,
};
