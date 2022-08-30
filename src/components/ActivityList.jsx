import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createActivity } from '../store/activity/action'

import { MoonLoader } from 'react-spinners'
import ModalActivityDelete from './ModalActivityDelete'

const ActivityList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { activities, isLoading } = useSelector(state => state.activity)
    
    const [show, setShow] = useState(false)
    const [activityToDelete, setActivityToDelete] = useState({
        id: null,
        name: ''
    })

    const handleCreateActivity = () => dispatch(createActivity())

    const handleClickDetail = id => navigate(`/activity/${id}`)

    const handleOpenModalDeleteActivity = (e, activity) => {
        e.stopPropagation()
        setActivityToDelete({
            id: activity._id,
            name: activity.name
        })
        setShow(true)
    }
    
    const handleCloseModalDeleteActivity = () => {
        setActivityToDelete({
            id: null,
            name: ''
        })
        setShow(false)
    }

    return (
        <section className='container'>
            {isLoading
                ? <div className='spinner-container'><MoonLoader cssOverride={{ margin: "0 auto" }} loading /></div>
                : <>
                    <h2 className='page-title'>Activity</h2>
                    <div className="activity-list">
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
                                <span
                                    className='trash-icon'
                                    onClick={e => handleOpenModalDeleteActivity(e, activity)}
                                ></span>
                            </div>)
                        }
                    </div>
                    
                    <ModalActivityDelete 
                        show={show}
                        onClose={handleCloseModalDeleteActivity}
                        activity={activityToDelete}
                    />
                </>
            }
        </section>
    )
}

export default ActivityList