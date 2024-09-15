import React, { useState } from 'react'
import { useJourneysContext } from '../hooks/useJourneysContext'
import { useAuthContext } from '../hooks/useAuthContext'

const JourneyForm = () => {
    const { dispatch } = useJourneysContext()
    const { user } = useAuthContext()

    const [destination, setDestination] = useState('')
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const journey = {destination, distance, duration}

        const response = await fetch("/api/journeys", {
            method: 'POST',
            body: JSON.stringify(journey),
            headers: {
                'Content-Type' : 'application/json',
                  "Authorization" : `Bearer ${user.token}`
                
            }
        })
        const json = await response.json()

        if(!response.ok) {
           setError(json.error)
           setEmptyFields(json.emptyFields)
        }else{
            setDestination("")
            setDistance("")
            setDuration("")
            setError(null)
            setEmptyFields([])
            console.log("new journey records has been added", json);
            dispatch({type: 'CREATE_JOURNEY', payload:json})
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Record</h3>

        <label>Name of destination:</label>
        <input type="text"  value={destination} onChange={(e) => setDestination(e.target.value)}
        className={emptyFields?.includes('destination') ? 'error' : ''}/>

        <label>Dist(KM):</label>
        <input type="number" value={distance} onChange={(e)=> setDistance(e.target.value)}
        className={emptyFields?.includes('distance') ? 'error' : ''}/>

        <label>time(hrs):</label>
        <input type="number" value={duration} onChange={(e)=> setDuration(e.target.value)}
        className={emptyFields?.includes('duration') ? 'error' : ''}/>

        <button>Add Journey</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default JourneyForm