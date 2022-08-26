import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createActivity } from '../store/activity/action'

const ActivityList = () => {
    const dispatch = useDispatch()

    const { activities } = useSelector(state => state.activity)

    const handleCreateActivity = () => {
        dispatch(createActivity())
    }

    return (
        <section className='container'>
            <h2>Activity</h2>

            <div className='activity-list'>
                <div className='activity-item-btn' onClick={handleCreateActivity}>
                    <h3>Add Activity</h3>
                </div>

                {activities.map((activity, i) => 
                    <Link to={`/activity/${activity._id}`} key={i}>
                        <div className='activity-item'>
                            <h3>{activity.name}</h3>
                        </div>
                    </Link>)
                }
            </div>
        </section>
    )
}

export default ActivityList