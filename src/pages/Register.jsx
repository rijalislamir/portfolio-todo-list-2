import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/auth/reducer'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            setFormData({
                name: '',
                email: '',
                password: '',
                password2: ''
            })
            navigate('/')
        }
    }, [user, navigate])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData
    
    const onFormSubmit = e => {
        e.preventDefault()

        if (password === password2) {
            dispatch(registerUser({ name, email, password }))
        } else {
            alert('Password don\'t match')
        }        
    }

    const onInputChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            <div>
                <h1>Register</h1>

                <form onSubmit={onFormSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' value={name} onChange={onInputChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password' name='password' value={password} onChange={onInputChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="text" id='password2' name='password2' value={password2} onChange={onInputChange} />
                    </div>

                    {isError && <div>{message}</div>}

                    <div>
                        <button type='submit'>Register</button>
                    </div>
                </form>

                <div>Have an account? <Link to='/login'><b>Login</b></Link></div>
            </div>
        </div>
    )
}

export default Register