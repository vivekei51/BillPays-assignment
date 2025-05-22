const express = require('express')
const router = express.Router();
const {signUp,login}=require('../controller/authController')
router.post('/signup',signUp)
router.post('/login',login)
module.exports=router