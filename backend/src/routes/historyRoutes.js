
const express = require('express');

const {
  getHistory,
  getAnalysisById,
  deleteAnalysis,
} = require('../controllers/historyController');

const router = express.Router();

router.get('/', getHistory);
router.get('/:id', getAnalysisById);
router.delete('/:id', deleteAnalysis);

module.exports = router;
