import { createContext, useReducer } from "react";

export const JourneysContext = createContext()

export const journeysReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOURNEYS':
            return {
                journeys: action.payload
            }
        case 'CREATE_JOURNEY':
            return {
                journeys: [action.payload, ...state.journeys]
            }
        case 'DELETE_JOURNEY':
            return {
                journeys: state.journeys.filter((w) => w._id !== action.payload._id)
            }    
        default:
            return state
    }
}

export const JourneysContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(journeysReducer, {
        journeys: null
    })

    return (
        <JourneysContext.Provider value={{ ...state, dispatch }}>
            {children}
        </JourneysContext.Provider>
    )
}