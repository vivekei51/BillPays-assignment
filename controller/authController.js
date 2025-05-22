const User = require('../models/User')
const jwt = require('jsonwebtoken')
const generateToken = (user)=>{
    return jwt.sign(
        {user:{id:user._id,username:user.username}},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
};
const signUp = async(req,res)=>{
    try {
        const{username ,password}=req.body;
        let existinguser = await User.findOne({username})
        if(existinguser)
        {
            return res.status(400).json({message:"user already exist"})
        }
        existinguser = new User({username,password})
         await existinguser.save()
         const token=generateToken(existinguser)
         res.status(201).json({token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
         let olduser = await User.findOne(username)
         if(!olduser)
         {
            return res.status(400).json({message:"user not exsit"})
         }
         let isMatch = await User.findOne(password)
         if(!isMatch)
         {
            return res.status(400).json({message:"password is invalid"})
         }
         const token = generateToken(olduser);
         res.status(200).json({token});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports={signUp,login}