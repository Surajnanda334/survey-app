const express = require('express')
const userSchema = require('../models/userModel')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    let hash = bcrypt.genSaltSync(10)
    console.log("Hash:",hash)
    let hashedPassword = bcrypt.hashSync(password,hash)
    const user = new userSchema({
        name,
        email,
        password:hashedPassword
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
        if(bcrypt.compareSync(password,userData.password)){
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
