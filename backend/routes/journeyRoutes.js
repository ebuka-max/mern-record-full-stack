const express = require("express")
const{createJourney, getAllJourneys, getJourney, deleteJourney, updateJourney} = require('../controllers/journeyController')

const requireAuth = require("../middleware/requireAuth")


const router = express.Router()

// require auth for all journey routes
router.use(requireAuth)


// GET all journeys
router.get('/', getAllJourneys)

// GET a single Journey
router.get('/:id', getJourney)

// POST a new Journey
router.post('/', createJourney)

// DELETE a Journey
router.delete('/:id', deleteJourney)

// UPDATE a Journey
router.patch('/:id', updateJourney)

module.exports = router