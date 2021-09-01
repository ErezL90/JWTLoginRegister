const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

//Routes endpoints from Client
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.put('/userUpdate', jwtHelper.verifyJwtToken, ctrlUser.userUpdate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;



