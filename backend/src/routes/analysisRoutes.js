
const express = require('express');
const { z } = require('zod');

const { analyzeInput } = require('../controllers/analysisController');

const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const analysisSchema = z.object({
  inputText: z.string().trim().min(10).max(10000),
  analysisType: z.enum([
    'customer_message',
    'sales_call_notes',
  ]),
});

router.post(
  '/',
  validateRequest(analysisSchema),
  analyzeInput
);

module.exports = router;
