const ToolCategory = require('../models/ToolCategory');

exports.createToolCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await ToolCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists.' });
    }

    const newCategory = new ToolCategory({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Tool category created successfully.', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tool category.', error: error.message });
  }
};

exports.getAllToolCategories = async (req, res) => {
  try {
    const categories = await ToolCategory.find();
    res.status(200).json({ message: 'Tool categories fetched successfully.', categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tool categories.', error: error.message });
  }
};

exports.getToolCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ToolCategory.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Tool category not found.' });
    }

    res.status(200).json({ message: 'Tool category fetched successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tool category.', error: error.message });
  }
};

exports.updateToolCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await ToolCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Tool category not found.' });
    }

    res.status(200).json({ message: 'Tool category updated successfully.', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating tool category.', error: error.message });
  }
};

exports.deleteToolCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await ToolCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Tool category not found.' });
    }

    res.status(200).json({ message: 'Tool category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tool category.', error: error.message });
  }
};
