import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/auth/action'
import Header from '../components/Header'

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
        <>
            <Header />

            <section className='container'>
                <h2 className='page-title'>Login</h2>

                <form className='input-form' onSubmit={onFormSubmit}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    
                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password' name='password' value={password} onChange={onInputChange} />
                    </div>

                    {isError && <div>{message}</div>}

                    <div className='submit-form'>
                        <button className='dark-btn' type='submit'>Login</button>
                        <p>Don't have an account? <b><Link to='/register'>Register</Link></b></p>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login