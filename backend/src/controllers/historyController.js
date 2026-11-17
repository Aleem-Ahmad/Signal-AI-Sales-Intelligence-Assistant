
const mongoose = require('mongoose');

const Analysis = require('../models/Analysis');

// GET all history
const getHistory = async (req, res, next) => {
  try {
    const history = await Analysis.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

// GET single analysis
const getAnalysisById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid analysis ID',
      });
    }

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE single analysis
const deleteAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid analysis ID',
      });
    }

    const analysis = await Analysis.findByIdAndDelete(id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory,
  getAnalysisById,
  deleteAnalysis,
};
