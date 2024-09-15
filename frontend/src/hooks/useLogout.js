import { useAuthContext } from "./useAuthContext"
import { useJourneysContext } from "./useJourneysContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: journeysDispatch } = useJourneysContext()
    

    const logout = () => {
      

        // remove user from storage
        localStorage.removeItem("user")

        // dispatch logout action
        dispatch({type: "LOGOUT"})
        journeysDispatch({type: "SET_JOURNEYS", payload: null})
    }
    return { logout }
}