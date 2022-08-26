import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/auth/action'
import { getActivities } from '../store/activity/action'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    useEffect(() => {
        dispatch(getActivities())
    }, [])

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>Dashboard <button onClick={onLogout}>Logout</button></div>
    )
}

export default Dashboard