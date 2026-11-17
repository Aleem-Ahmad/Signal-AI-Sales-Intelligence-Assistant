const { z } = require('zod');

const { genAI, GEMINI_MODEL } = require('../config/gemini');
const buildAnalysisPrompt = require('../utils/prompts');

const resultSchema = z.object({
  summary: z.string(),
  mainProblem: z.string(),
  budget: z.string(),
  timeline: z.string(),
  suggestedReply: z.string(),
  nextSteps: z.array(z.string()),
});

const cleanJsonText = (raw) => {
  if (!raw) return '{}';
  let text = raw.trim();
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim();
  }
  return text;
};

const analyzeWithGemini = async (inputText, analysisType) => {
  const prompt = buildAnalysisPrompt(inputText, analysisType);
  const modelsToTry = Array.from(new Set([GEMINI_MODEL, 'gemini-3.5-flash-lite', 'gemini-3.8-flash'].filter(Boolean)));

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      if (!response || !response.text) {
        throw new Error('Gemini returned an empty response');
      }

      const cleanedText = cleanJsonText(response.text);
      const parsedResult = JSON.parse(cleanedText);

      return resultSchema.parse(parsedResult);
    } catch (error) {
      console.error(`Gemini Service Error (model: ${model}):`, error.message);
      lastError = error;
    }
  }

  const apiError = new Error(
    lastError?.message || 'AI analysis failed. Please try again.'
  );
  apiError.statusCode = 502;
  throw apiError;
};

module.exports = analyzeWithGemini;
