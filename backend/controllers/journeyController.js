const Journey = require('../models/journeyModel')
const mongoose = require('mongoose')

// get all Journeys
const getAllJourneys = async(req, res) => {
    const user_id =req.user._id

    const journeys = await Journey.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(journeys)
}

// get a single Journey
const getJourney = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such journey'})
    }

    const journey = await Journey.findById(id)

    if (!journey) {
        res.status(404).json({error: "No Such Journey"})
    }
    res.status(200).json(journey)
}

// create new Journey
const createJourney = async (req, res) =>{
    const {destination, distance, duration} = req.body

    let emptyFields = []

    if(!destination) {
        emptyFields.push('destination')
    }
    if(!distance) {
        emptyFields.push('distance')
    }
    if(!duration) {
        emptyFields.push('duration')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all the fields", emptyFields })
    }

    // add document to database
    try {
        const user_id = req.user._id
        const journey = await Journey.create({destination, distance, duration, user_id})
        res.status(200).json(journey)
    } catch (error) {
        res.status(400).json({error: error.message})
       
    }
}

// delete a Journey
const deleteJourney = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such journey'})
    }

    const journey = await Journey.findByIdAndDelete({_id: id})

    if (!journey) {
        res.status(404).json({error: "No Such Journey"})
    }
    res.status(200).json(journey)
}

// update a Journey
const updateJourney = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:'No such journey'})
    }

    const journey = await Journey.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!journey) {
        res.status(404).json({error: "No Such Journey"})
    }
    res.status(200).json(journey)
}

module.exports = {
    getAllJourneys,
    getJourney,
    createJourney,
    deleteJourney,
    updateJourney
}