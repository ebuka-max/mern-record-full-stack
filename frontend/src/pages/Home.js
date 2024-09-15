import React, { useEffect } from 'react'
import { useJourneysContext } from '../hooks/useJourneysContext'

//  components
import JourneyDetails from '../components/JourneyDetails'
import JourneyForm from '../components/JourneyForm'
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {

  const {journeys, dispatch} = useJourneysContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchJourneys = async () => {
      const response = await fetch('/api/journeys', {
        headers: {
          "Authorization" : `Bearer ${user.token}`
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_JOURNEYS', payload: json})
      }
    }

    if (user) {
      fetchJourneys()
    }
  }, [dispatch,user])
  return (
    <div className='home'>
      <div className='journeys'>
        {journeys && journeys.map((journey) => (
          <JourneyDetails key={journey._id} journey={journey} />

        ))}
      </div>
      <JourneyForm />
    </div>
  )
}

export default Home