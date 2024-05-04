const express = require('express')
const app = express()
const database = require('./database')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/',function (req,res){
     res.send('Server is Okay write data')
})

const class11Route = require('./routes/class11')
app.use('/class11',class11Route)


const class12Route = require('./routes/class12')
app.use('/class12',class12Route)



app.listen(3000)