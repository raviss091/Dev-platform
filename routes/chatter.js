const express = require('express');
const router = express.Router();
const User=require('../models/user')
const passport=require('passport')

router.get('/chatbox',passport.checkAuthentication,(req,res)=>{

    const user=req.user
    console.log(user)
    res.render('individual_chatbox',{user:user})
})

module.exports=router;