const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing from environment variables');
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || 'gemini-3.8-flash';

module.exports = {
  genAI,
  GEMINI_MODEL,
};
