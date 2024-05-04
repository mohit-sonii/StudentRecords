
const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
     name: {
          required: true,
          type: String
     },
     class: {
          required: true,
          type: Number
     },
     rollNo: {
          unique: true,
          required: true,
          type: Number
     },
     subject: {
          enum: ['Medical', 'Non-Medical', 'Commerce', 'Arts'],
          required: true,
          type: String
     }
})


const class_11 = mongoose.model('class11', Schema)
const class_12 = mongoose.model('class12', Schema)

module.exports = { class_11, class_12 }