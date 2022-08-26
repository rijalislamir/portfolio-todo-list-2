import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset as activityReset } from '../store/activity/reducer'
import { getActivities } from '../store/activity/action'
import Header from '../components/Header'
import ActivityList from '../components/ActivityList'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    useEffect(() => {
        dispatch(activityReset())
        dispatch(getActivities())
    }, [])

    return (
        <>
            <Header />
            <ActivityList />
        </>
    )
}

export default Dashboard