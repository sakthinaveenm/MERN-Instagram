const jwt = require('jsonwebtoken')
const config = require('../config')
const mongoose = require('mongoose')
const User = require('../models/user.model')
module.exports = (req,res,next) =>{
    const {Authorization} = req.headers;
    if(!Authorization){
        return res.status(401).send('UnAuthorized')
    }else{
        const token = Authorization.replace('Bearer ','');
        jwt.verify(token,config.jwt_token,(err,payload)=>{
            if(err){
                return res.status(401).send('UnAuthorized')
            }
            const {_id} = payload;
            User.findById(_id).then((user)=>{
                req.user = user

               next();
            }).catch((err)=>{
                return res.status(401).send('UnAuthorized')
            })
        })
    }
}