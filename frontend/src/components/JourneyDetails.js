import React from 'react'
import { useJourneysContext } from '../hooks/useJourneysContext'

// date fns 
import  formatDistanceToNow  from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const JourneyDetails = ({journey}) => {
  const { dispatch } = useJourneysContext()
  const { user } = useAuthContext()

  const hanleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch("/api/journeys/" + journey._id, {
      method: 'DELETE',
      headers: {
          "Authorization" : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_JOURNEY', payload: json})
    }
  }
  return (
    <div className='journey-details'>
        <h4>{journey.destination}</h4>
        <p><strong>Dist (KM): </strong>{journey.distance}</p>
        <p><strong>time(hrs): </strong>{journey.duration}</p>
        <p>{journey.createdAt}</p>
        <p>{formatDistanceToNow(new Date(journey.createdAt), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={hanleClick}>delete</span>

    </div>
    
// formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  )
}

export default JourneyDetails