const express = require('express');
const { GetAllStudentData, GetStudentDataByID, insertStudentRecord } = require('../controllers/studentController');

//create Router Object
const routes = express.Router();

// create Routes
// get All Student :: GET
routes.get('/', GetAllStudentData)
routes.get('/:id', GetStudentDataByID)
routes.post('/', insertStudentRecord)



module.exports = routes