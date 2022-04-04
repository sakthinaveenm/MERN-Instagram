const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config')

// New Ways
// require('./models/user.model')
// mongoose.model('user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.connect(
    config.mongodb_url)

mongoose.connection.on('connected',()=>{
    console.log('Mongo Connected Successfully')
})

mongoose.connection.on('error',(err)=>{
    console.log('Error Connecting Mongo'+err)
})

app.use('/',(req,res)=>{
    res.send('Hello,World');
})


app.listen(3000)