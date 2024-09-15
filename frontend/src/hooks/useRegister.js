import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const  BACKEND_URL = "http://localhost:7000"

    const register = async(name, email, password) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${ BACKEND_URL}/api/user/register`, {
            method: "POST",
            headers: {"content-Type" : "application/json"},
            body: JSON.stringify({name,email,password})
        })
        const data = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(data.error)
        }
        if(response.ok) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(data))

            // update the auth context
            dispatch({type: "LOGIN", payload: data})

            setIsLoading(false)
        }
    }

    return { register, isLoading, error}
}