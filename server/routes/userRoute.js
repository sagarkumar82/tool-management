const express = require('express');
const { registerMechanic, getMechanics , loginMechanic } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerMechanic);
router.get('/', getMechanics);
router.post('/login', loginMechanic); 


module.exports = router;
