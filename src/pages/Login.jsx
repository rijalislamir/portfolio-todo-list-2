import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/auth/action'
import { reset as authReset } from '../store/auth/reducer'
import Header from '../components/Header'
import { BeatLoader } from 'react-spinners'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, message } = useSelector(state => state.auth)
    const [showPassword, setShowPassword] = useState('password')

    useEffect(() => {
        dispatch(authReset())
    }, [])

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

    const toggleShowPassword = () => {
        setShowPassword(prevState => prevState === 'password' ? 'text' : 'password')
    }

    return (
        <>
            <Header />

            <section className='container'>
                <h2 className='page-title'>Login</h2>

                <form className='input-form' onSubmit={onFormSubmit}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={email} onChange={onInputChange} />
                    </div>
                    
                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <input type={showPassword} id='password' name='password' value={password} onChange={onInputChange} />
                        <span
                            className={showPassword === 'password' ? 'eye-icon' : 'eye-slash-icon'}
                            onClick={toggleShowPassword}>
                        </span>
                    </div>

                    {isError && <div className='error-message'>{message}</div>}

                    <div className='submit-form'>
                        <button className={isLoading ? 'dark-btn-disabled' : 'dark-btn'} type='submit'>
                            {isLoading 
                                ? <BeatLoader 
                                    cssOverride={{ 
                                        margin: 'auto',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    color='#ffffff'
                                    loading
                                />
                                : 'Login'
                            }
                        </button>
                        <p>Don't have an account? <b><Link to='/register'>Register</Link></b></p>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login