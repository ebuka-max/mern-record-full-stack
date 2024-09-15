import React, { useState } from 'react'
import { useRegister } from '../hooks/useRegister'


const initialState = {
    name: "",
    email: "",
    password: ""
}

const Register = () => {
    const [formData, setFormData] = useState(initialState)
    const { name, email, password } = formData
    const {register, error, isLoading} = useRegister()


    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await register(name,email,password)
        

    }


    return (
        <form className='register' onSubmit={ handleSubmit}>
            <h3>Register yourself</h3>

            <label>name:</label>
            <input type="text" name='name'
                value={name} onChange={handleInputChange} />

            <label>email:</label>
            <input type="email" name='email'
                value={email} onChange={handleInputChange} />

            <label>password:</label>
            <input type="password" name='password'
                value={password} onChange={handleInputChange} />

                <button disabled={isLoading}>Register</button>
                {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Register