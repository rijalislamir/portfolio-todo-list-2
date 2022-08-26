import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    createActivity,
    deleteActivity
} from '../store/activity/action'

const ActivityList = () => {
    const dispatch = useDispatch()

    const { activities } = useSelector(state => state.activity)

    const handleCreateActivity = () => {
        dispatch(createActivity())
    }

    const handleDeleteActivity = (e, id) => {
        e.preventDefault()
        dispatch(deleteActivity({ id }))
    }

    return (
        <section className='container'>
            <h2>Activity</h2>

            <div className='activity-list'>
                <div className='activity-item-btn' onClick={handleCreateActivity}>
                    <h3>+ Create Activity</h3>
                </div>

                {activities.map((activity, i) => 
                    <Link to={`/activity/${activity._id}`} key={i}>
                        <div className='activity-item'>
                            <h3>{activity.name}</h3>
                            <span onClick={e => handleDeleteActivity(e, activity._id)}>X</span>
                        </div>
                    </Link>)
                }
            </div>
        </section>
    )
}

export default ActivityList