const express = require("express");
const UserRoute = express.Router();
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

//---------------Signup Route-------------------
UserRoute.post("/signup", async(req,res)=>{
    try {
        const {email,password,confirmpassword} = req.body;
        const hashpwd = await bcrypt.hash(password,10)

        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(404).json("User Already Registered")
        }else{
            const newUser = new UserModel({email,password:hashpwd,confirmpassword:hashpwd})
            await newUser.save()
            res.status(200).json({"msg":"User registered successfully"})
        }
    } catch (error) {
        console.log(error)
        res.status(501).json({"error":"Error while creating a user"})
    }
})


//---------------Login Route-------------------
UserRoute.post("/login", async(req,res)=>{
    try {
        const{email,password} = req.body

        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({"msg":"Invalid Credentials"})
        }

        const isPwdValid = await bcrypt.compare(password,user.password);
        if(!isPwdValid){
            return res.status(404).json({"msg":"Invalid Password"})
        }

        const token = jwt.sign({userID: user._id}, "yourSecretKeyHere")
        res.status(200).json({"msg":"Login Successfull","token":token})
    } catch (error) {
        console.log(error)
        res.status(501).json({"error":"Error while logging in"})
    }
})
module.exports = {UserRoute}