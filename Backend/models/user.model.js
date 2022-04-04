const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    username: {
        type:String,
        required : true,
        lowercase:true
    },
    name : {
        type: String,
        reqired :true,
    },email : {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//New Ways 
// mongoose.Schema('user',userSchema)


const User = mongoose.model('user',userSchema);
module.exports = User;