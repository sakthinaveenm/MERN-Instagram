const express = require('express');
const router = express.Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const config = require('../config')
const requireLogin = require('../middleware/requireLogin')


router.post('/user/signin',(req,res)=>{
    let {username,password} = req.body;
    if(!username || !password) { 
        return res.status(400).json({success: false,error : 'Please Enter all the Fields',});
     }
     User.findOne({username}).then((user)=>{
         if(!user){
            return res.status(400).json({success: false,error : 'Invalid Username or Password',});
         }else{
         bcrypt.compare(password,user.password).then(userSuccess=>{

             if(userSuccess){
                 const token = jwt.sign({
                     _id:user._id
                 },config.jwt_token)
                 return res.status(200).json({
                     success:true,
                     message : 'User Signed Successfully',
                     user : user,
                     token :token
                 })
             }else{
                return res.status(400).json({success: false,error : 'Invalid Username or Password',});
             }
         }
         ).catch(err=>{
            return res.status(400).json({
                success:false,
                message :'Something went Wrong '+err
            })
         })

         }
     })
});

router.post('/user/create',(req,res)=>{
let{name,username,email,password} = req.body;
if(!name || !username || !email || !password) {  return res.status(400).json({success: false,error : 'Please Enter all the Fields',});}
 User.findOne({email:email}).then((olduser)=>{
 if(olduser.length > 0)
    {    
        return res.json({
            success:false,
            error:'User Already Exists'
        })
    }else{
        bcrypt.hash(password,12).then(
            encryptpassword =>{      const user = new User({ name,username,email,password : encryptpassword})
                user.save().then(user=>{
                    return res.status(201).json({
                        success:true,
                        message :'User Created Successfully',
                        user :user
                    })
                   }).catch(err=>{
                    return res.status(400).json({
                        success:false,
                        message :'Something went Wrong '+err
                    })
                   })
            }
        ).catch(err=>{
            return res.status(400).json({
                success:false,
                message :'Something went Wrong '+err
            })
        
       })

    }
 }) .catch(err=>{
    return res.status(400).json({
        success:false,
        message :'Something went Wrong '+err
    })
   })


})



module.exports = router;