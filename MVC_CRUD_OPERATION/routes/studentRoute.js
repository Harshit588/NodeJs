const express = require('express');
const { GetAllStudentData, GetStudentDataByID, insertStudentRecord, deleteStudentRecord, updateStudentRecord } = require('../controllers/studentController');

//create Router Object
const routes = express.Router();

// create Routes
// get All Student :: GET

routes.route('/:id')
    .delete(deleteStudentRecord)
    .get(GetStudentDataByID)
    .patch(updateStudentRecord)

routes.route('/')
    .get(GetAllStudentData)
    .post(insertStudentRecord)

module.exports = routes