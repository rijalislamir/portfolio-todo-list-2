import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
    createActivity,
    deleteActivity
} from '../store/activity/action'

const ActivityList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { activities } = useSelector(state => state.activity)

    const handleCreateActivity = () => {
        dispatch(createActivity())
    }

    const handleDeleteActivity = (e, id) => {
        e.stopPropagation()
        dispatch(deleteActivity({ id }))
    }

    const handleClickDetail = id => {
        navigate(`/activity/${id}`)
    }

    return (
        <section className='container'>
            <h2 className='page-title'>Activity</h2>

            <div className='activity-list'>
                <div
                    className={
                        activities.length === 0
                            ? 'activity-item add-activity no-activity'
                            : 'activity-item add-activity'
                    }
                    onClick={handleCreateActivity}
                >
                    <h3>Create Activity</h3>
                </div>

                {activities.map((activity, i) => 
                    <div className='activity-item' onClick={() => handleClickDetail(activity._id)} key={i}>
                        <h3>{activity.name}</h3>
                        <span className='trash-icon' onClick={e => handleDeleteActivity(e, activity._id)}></span>
                    </div>)
                }
            </div>
        </section>
    )
}

export default ActivityList