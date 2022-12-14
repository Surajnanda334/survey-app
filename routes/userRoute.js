const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler.js');
const { signUp, login } = require('../controllers/userController')

router.post("/signup", errorHandler(signUp))
router.post("/login", errorHandler(login))

module.exports = router