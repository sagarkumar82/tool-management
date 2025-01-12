const Tool = require('../models/Tool');
const IssueRegister = require('../models/IssueRegister');
const path = require('path');
const multer = require('multer');
const fs = require('fs')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, JPG, PNG, or GIF files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

exports.addTool = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const image = req.file ? req.file.path : null;
      const { name, category, quantity } = req.body;

      const tool = await Tool.create({ name, category, image, quantity });
      res.status(201).json({ message: 'Tool added successfully', tool });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getTools = async (req, res) => {
  console.log('Tools goes here')
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.issueTool = async (req, res) => {
  try {
    const { toolId, mechanicId, quantity } = req.body;
    const tool = await Tool.findById(toolId);

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    if (tool.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock to issue the tool' });
    }

    // Check if a record for the same toolId and mechanicId already exists
    const existingIssue = await IssueRegister.findOne({ tool: toolId, mechanic: mechanicId });

    if (existingIssue) {
      // Update the existing record's quantity
      existingIssue.quantity += quantity;
      await existingIssue.save();
    } else {
      // Create a new record if no existing one is found
      await IssueRegister.create({ tool: toolId, mechanic: mechanicId, quantity , status:"Issued"});
    }

    // Deduct the issued quantity from the tool's stock
    tool.quantity -= quantity;
    await tool.save();

    res.status(200).json({ message: 'Tool issued successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.returnTool = async (req, res) => {
  try {
    const { issueId, quantity } = req.body;

    // Find the issue record
    const issue = await IssueRegister.findById(issueId);

    if (!issue) {
      return res.status(404).json({ message: 'Issue record not found' });
    }

    // Ensure the returned quantity does not exceed the issued quantity
    if (quantity > issue.quantity) {
      return res.status(400).json({ message: 'Returned quantity exceeds issued quantity' });
    }

    // Find the associated tool
    const tool = await Tool.findById(issue.tool);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Update the tool's quantity
    tool.quantity += quantity;
    await tool.save();

    // Update or delete the issue record
    if (quantity === issue.quantity) {
      // If full quantity is returned, delete the issue record
      await IssueRegister.findByIdAndDelete(issueId);
    } else {
      // If partial quantity is returned, reduce the issued quantity
      issue.quantity -= quantity;
      await issue.save();
    }

    res.status(200).json({ message: 'Tool returned successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getIssuedTools = async(req,res)=>{
  try {
    const{userId} = req.body

  const data = await IssueRegister.find({mechanic:userId}).populate('tool')
  console.log(data)
  if(!data){
    return response.status(400).json({
      error:'data not found'
    })
  }

  res.status(200).json({
    data
  })
  } catch (error) {
    res.status(500).json({
      message:'Internel server error',
      error
    })
  }

}

exports.editTool = async (req, res) => {
  try {
    // Handle the file upload
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { name, category, quantity } = req.body;
      const { id } = req.params; // Tool ID from the request params

      // Find the tool by ID
      const tool = await Tool.findById(id);
      if (!tool) {
        return res.status(404).json({ message: 'Tool not found' });
      }

      // Handle image upload (if a new image is provided)
      let newImagePath = tool.image; // Keep old image path by default
      if (req.file) {
        // Delete the old image if a new one is uploaded
        if (tool.image) {
          const oldImagePath = path.join(__dirname, '../', tool.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete the old file
          }
        }
        newImagePath = req.file.path; // Set the new image path
      }

      // Update the tool in the database
      tool.name = name || tool.name;
      tool.category = category || tool.category;
      tool.quantity = quantity || tool.quantity;
      tool.image = newImagePath;

      // Save the updated tool
      await tool.save();

      res.status(200).json({ message: 'Tool updated successfully', tool });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the tool' });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const { id } = req.params; // Tool ID from the request params

    // Find the tool by ID
    const tool = await Tool.findById(id);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Delete the image file if it exists
    if (tool.image) {
      const imagePath = path.join(__dirname, '../', tool.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      }
    }

    // Delete the tool from the database
    await Tool.findByIdAndDelete(id);

    res.status(200).json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the tool' });
  }
};

exports.getIssueToolByAdmin = async (req, res) => {
  try {
    const tools = await IssueRegister.find().populate('tool mechanic');
    res.status(200).json(tools);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};