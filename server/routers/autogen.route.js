const express = require('express');
const router = express.Router();
const autogenController = require('../controllers/autogen.controller');      
// Add other controllers as needed  
// Define routes
router.get('/answer', autogenController.answer);       

module.exports = router;