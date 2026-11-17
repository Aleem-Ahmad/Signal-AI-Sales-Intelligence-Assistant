
const buildAnalysisPrompt = (inputText, analysisType) => {
  return `
You are a professional sales intelligence assistant.

Analyze the following ${analysisType === 'customer_message'
    ? 'customer message'
    : 'sales call notes'}.

Extract useful business information.

Rules:
1. Do not invent information.
2. If budget is missing, return "Not specified".
3. If timeline is missing, return "Not specified".
4. Keep the summary clear and concise.
5. Suggest a professional customer reply.
6. Provide practical next steps.
7. Return valid JSON only.

Required JSON structure:

{
  "summary": "string",
  "mainProblem": "string",
  "budget": "string",
  "timeline": "string",
  "suggestedReply": "string",
  "nextSteps": ["string"]
}

Input:
${inputText}
`;
};

module.exports = buildAnalysisPrompt;
