const express = require('express')
const controller = require('../controllers/userController')
const router = express.Router()

router.get('/', (req, res) => {
    controller.getAllUser(req, res)
})

router.post('/', (req, res) => {
    controller.insertRecord(req, res);
})

router.get('/:id', (req, res) => {
    controller.getAllUserById(req, res)
})

module.exports = router;
