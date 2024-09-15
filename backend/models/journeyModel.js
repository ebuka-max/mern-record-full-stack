const mongoose = require('mongoose')

const Schema = mongoose.Schema

const journeySchema = new Schema({
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    }, 
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Journey', journeySchema)

