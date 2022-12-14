const express = require('express')
const userSchema = require('../models/userModel')

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new userSchema({
        name,
        email,
        password
    })
    let userData = await user.save()
    console.log(userData)
    res.status(200).json({
        status: true,
        message: "user created successfully",
        data: userData
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let userData = await userSchema.findOne({email});
    if(userData){
        if(userData.password === password){
            res.status(200).json({
                status: true,
                message: "user logged in successfully",
                data: userData
            })
        }else{
            res.status(400).json({
                status: false,
                message: "password is incorrect"
            })
        }
    }else{
        res.status(400).json({
            status: false,
            message: "user not found please signup first"
        })
    }
}



module.exports = { signUp, login }
