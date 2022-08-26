import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/auth/reducer'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>Dashboard <button onClick={onLogout}>Logout</button></div>
    )
}

export default Dashboard