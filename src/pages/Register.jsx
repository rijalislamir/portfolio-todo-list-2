import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/auth/action'
import { reset as authReset } from '../store/auth/reducer'
import Header from '../components/Header'
import { BeatLoader} from 'react-spinners'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, message } = useSelector(state => state.auth)
    const [showPassword, setShowPassword] = useState('password')

    useEffect(() => {
        dispatch(authReset())
    }, [])

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

    const toggleShowPassword = () => {
        setShowPassword(prevState => prevState === 'password' ? 'text' : 'password')
    }

    return (
        <>
            <Header />

            <section className='container'>
                <h2 className='page-title'>Register</h2>

                <form className='input-form' onSubmit={onFormSubmit}>
                    <div className='input-group'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' name='name' value={name} onChange={onInputChange} />
                    </div>
                    
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
                    
                    <div className='input-group'>
                        <label htmlFor="password2">Confirm Password</label>
                        <input type={showPassword} id='password2' name='password2' value={password2} onChange={onInputChange} />
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
                                : 'Register'
                            }
                        </button>
                        <p>Have an account? <Link to='/login'><b>Login</b></Link></p>
                    </div>
                </form>

            </section>
        </>
    )
}

export default Register