import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'


const initialState = {
    email: "",
    password: ""
}

const Login = () => {
    const [formData, setFormData] = useState(initialState)
    const { email, password } = formData
    const {login,error,isLoading} = useLogin()


    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email,password)   

    }


    return (
        <form className='login' onSubmit={ handleSubmit}>
            <h3>Login yourself</h3>

            <label>email:</label>
            <input type="email" name='email'
                value={email} onChange={handleInputChange} />

            <label>password:</label>
            <input type="password" name='password'
                value={password} onChange={handleInputChange} />

                <button disabled={isLoading}>Login</button>
                {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login