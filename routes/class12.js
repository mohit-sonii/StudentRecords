const { class_12 } = require("../models/schema")
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
     try {
          const data = req.body;
          const newStudent = new class_12(data)
          const response = await newStudent.save()
          res.status(201).json(response)
     } catch (err) {
          console.log("There is an error in post of ")
          res.status(500).json({ err: "Internal server error in class12" })
     }
})

router.get('/', async (req, res) => {
     try {
          const class12Data = await class_12.find()
          if (class12Data.length === 0) {
               res.status(200).json({ message: "Nothing is entered yet" })
          }
          else {
               res.status(200).json(class12Data)
          }
     } catch (err) {
          res.status(500).json({ err: "Internal server error in class 12" })
     }
})

router.get('/:stream', async (req, res) => {
     try {
          const stream = req.params.stream
          if (['Commerce', 'Non-Medical', 'Medical', 'Arts'].includes(stream)) {
               const streamData = await class_12.find({ subject: stream })
               if (streamData.length === 0) {
                    res.status(200).json({ message: 'No one has this subject in class 12' })
               }
               else {
                    res.status(200).json(streamData)
               }
          } else {
               res.status(400).json({ message: "Invalid Stream" })
          }
     } catch (err) {
          res.status(500).json({ err: 'Internal server error' })
     }
})
router.put('/:rollNo', async (req, res) => {
     try {
          const rollNo = req.params.rollNo
          const updatedData = req.body
          const response = await class_12.findOneAndUpdate({ rollNo: rollNo }, updatedData, {
               new: true,
               runValidators: true
          })
          if (!response) {
               return res.status(400).json({ message: 'Does not exits' })
          }
          res.status(200).json(response)

     } catch (err) {
          res.status(500).json({ err: 'Internal Server Error' })
     }
})
router.delete('/:rollNo', async (req, res) => {
     try {
          const rollNo = req.params.rollNo
          const response = await class_12.findOneAndDelete({ rollNo: rollNo })
          if (!response) {
               return res.status(400).json({ message: "Does not exits" })
          }
          res.status(200).json(response)
     } catch (err) {
          res.status(500).json({ err: "Internal Server Error" })
     }
})


module.exports = router