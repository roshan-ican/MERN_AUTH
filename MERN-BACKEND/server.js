require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const path = require('path')    
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const {logger, logEvents} = require('./middleware/logger')
// FOR CORS POLICY ERROR

// connectDb
const connectDb = require('./config/dbConn')
// mongoose
const mongoose = require('mongoose')
// logEvents

const cors = require('cors')
const corsOptions = require('./config/corsOptions')
// LETS OUR APP RECEIEVE AND PARSE OUR DATA
app.use(express.json())
app.use(cookieParser())
app.use(logger) 
connectDb()



// TELLING EXPRESS WHERE TO FIND LOCAL IMAGES AND STYLES
app.use('/', express.static(path.join(__dirname, 'public')))
// ROUTES
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/auth', require('./routes/authRoutes'))
// CORS POLICY ERROR
app.use(cors(corsOptions))
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: '404 Not Found'})
    }else {
        res.type('txt').send('404 Not Found')
    }
})
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('CONNECTED TO MONGO DB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})