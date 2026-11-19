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

const callModelWithTimeout = (model, prompt, timeoutMs = 8000) => {
  return Promise.race([
    genAI.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    }),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Model ${model} timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
};

const analyzeWithGemini = async (inputText, analysisType) => {
  const prompt = buildAnalysisPrompt(inputText, analysisType);
  // Prioritize high-speed, reliable flash-lite models first
  const modelsToTry = Array.from(
    new Set(['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', GEMINI_MODEL].filter(Boolean))
  );

  let lastError = null;

  for (const model of modelsToTry) {
    const startTime = Date.now();
    try {
      const response = await callModelWithTimeout(model, prompt, 8000);

      if (!response || !response.text) {
        throw new Error('Gemini returned an empty response');
      }

      const cleanedText = cleanJsonText(response.text);
      const parsedResult = JSON.parse(cleanedText);
      const validated = resultSchema.parse(parsedResult);

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`[Gemini] Model ${model} responded successfully in ${elapsed}s`);

      return validated;
    } catch (error) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.warn(`[Gemini] Model ${model} failed after ${elapsed}s: ${error.message}`);
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
