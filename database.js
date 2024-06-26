
const mongoose = require('mongoose')
require('dotenv').config()
// const CompassURL = 'mongodb://localhost:27017/StudentRecord'
// const CompassURL = 'mongodb+srv://mohitsoni:MohitSoni123!!!@studentrecord.6lgj57e.mongodb.net/studentrecord'
const mongoURL = process.env.COMPASSURL
mongoose.connect(mongoURL)


const database = mongoose.connection

database.on('connected',()=>{
     console.log("Database is connected")
})

database.on('error',()=>{
     console.log("Error in Database");
})

database.on('disconnected',()=>{
     console.log("Server is disconnected")
})


module.exports = database
