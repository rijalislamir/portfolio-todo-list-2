import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ActivityList = () => {
    const { activities } = useSelector(state => state.activity)

    return (
        <section className='container'>
            <h2>Activity</h2>

            <div className='activity-list'>
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