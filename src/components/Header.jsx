import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../store/auth/action'

const Header = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <header>
            <nav>
                <h1>Todo List</h1>

                <div>
                    {user 
                        ? <button className='light-btn' onClick={onLogout}>Logout</button>
                        : <div className='sign-menu'>
                            {
                                location.pathname.split('/').pop() !== 'login' && 
                                <Link to='/login'><button className='light-btn'>Login</button></Link>
                            }

                            {
                                location.pathname.split('/').pop() !== 'register' &&
                                <Link to='/register'><button className='light-btn'>Register</button></Link>
                            } 
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header