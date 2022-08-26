import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/auth/reducer'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onFormSubmit = e => {
        e.preventDefault()
        dispatch(login(formData))
        setFormData({
            email: '',
            password: ''
        })
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
                <h1>Login</h1>

                <form onSubmit={onFormSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password' name='password' value={password} onChange={onInputChange} />
                    </div>

                    {isError && <div>{message}</div>}

                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>

                <div>Don't have an account? <b><Link to='/register'>Register</Link></b></div>
            </div>
        </div>
    )
}

export default Login