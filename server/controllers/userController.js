const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerMechanic = async (req, res) => {
  try {
    const { name, email, mobile, password, picture, level } = req.body;

    const isExisting = await User.findOne({ email }); 
    if (isExisting) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    if (mobile.length > 10) {
      return res.status(400).json({
        message: 'Mobile number should not exceed 10 digits',
      });
    }

    

    const user = await User.create({ name, email, mobile, password, picture, level });
    res.status(201).json({ message: 'Mechanic registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getMechanics = async (req, res) => {
  try {
    const mechanics = await User.find({ role: 'mechanic' });
    res.status(200).json(mechanics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginMechanic = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'jdhcvjhfgreagfyguygvdbvc' ,
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};