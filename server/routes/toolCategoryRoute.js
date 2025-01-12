const express = require('express');
const router = express.Router();
const {
  createToolCategory,
  getAllToolCategories,
  getToolCategoryById,
  updateToolCategory,
  deleteToolCategory,
} = require('../controllers/toolCategoryController');

router.post('/', createToolCategory);

router.get('/', getAllToolCategories);

router.get('/:id', getToolCategoryById);

router.put('/:id', updateToolCategory);

router.delete('/:id', deleteToolCategory);

module.exports = router;
