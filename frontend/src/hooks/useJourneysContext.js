import { JourneysContext } from "../context/JourneyContext";
import { useContext } from "react";

export const useJourneysContext = () => {
    const context = useContext(JourneysContext)

    if (!context) {
        throw Error('useJourneysContext must be used inside an JourneysContextProvider')
    }

    return context
}