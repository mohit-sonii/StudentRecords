
const { class_11 } = require('../models/schema')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
     try {
          const data = req.body
          const newStudent = new class_11(data)
          const response = await newStudent.save()
          res.status(201).json(response)
     } catch (err) {
          console.log("There is an error in post of / ")
          res.status(400).json({ err: "Invalid Detail, ID must be unique" })
     }
})

router.get('/', async (req, res) => {
     try {
          const class_11Data = await class_11.find()
          if (class_11Data.length === 0) {
               res.status(200).json({ message: 'Nothing is entered yet' })
          }
          else {
               res.status(200).json(class_11Data)
          }

     } catch (err) {
          res.status(500).json({ err: "Internal server Error" })
     }
})
router.get('/:stream', async (req, res) => {
     try {
          const stream = req.params.stream
          if (stream == 'Medical' || stream == 'Non-Medical' || stream == 'Arts' || stream == 'Commerce') {
               const streamData = await class_11.find({ subject: stream })
               if (streamData.length === 0) {
                    res.status(200).json({ message: 'No one has this Subject in Class 11' })
               }
               else {
                    res.status(200).json(streamData)
               }
          }
          else {
               res.status(400).json({ message: 'Invalid Stream' })
          }
     } catch (err) {
          res.status(500).json({ err: "Internal Server Error" })
     }
})
router.put('/:rollNo', async (req, res) => {
     try {
          const rollNo = req.params.rollNo
          const updatedData = req.body;
          const response = await class_11.findOneAndUpdate({ rollNo: rollNo }, updatedData, {
               new: true,
               runValidators: true
          })
          if (!response) {
               return res.status(404).json({ message: "Does not exits" })
          }
          res.status(200).json(response)
     } catch (err) {
          res.status(500).json({ err: "Internal Server Error" })
     }
})
router.delete('/:rollNo', async (req, res) => {
     try {
          const rollNo = req.params.rollNo
          const response = await class_11.findOneAndDelete({ rollNo: rollNo })
          if (!response) {
               return res.status(404).json({ message: 'Does not exits' })
          }
          res.status(200).json(response)
     } catch (err) {
          res.status(500).json({ err: "Internal Server Error" })
     }
})

module.exports = router