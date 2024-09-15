require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const journeyRoutes = require('./routes/journeyRoutes')
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")

//  express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(cors({
    origin: ["http://localhost:3000", "https://mern-record-app.onrender.com"]
}));

// routes
app.use('/api/Journeys', journeyRoutes)
app.use('/api/user', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to database & listen on port', process.env.PORT);
        })

    })
    .catch((error) => {
        console.log(error);
    })

