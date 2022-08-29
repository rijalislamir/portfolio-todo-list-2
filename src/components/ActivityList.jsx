import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    createActivity,
    deleteActivity
} from '../store/activity/action'
import Backdrop from './Backdrop'
import { MoonLoader } from 'react-spinners'

const ActivityList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { activities, isLoading } = useSelector(state => state.activity)
    const [show, setShow] = useState(false)
    const [activityToDelete, setActivityToDelete] = useState({
        id: null,
        name: ''
    })

    const handleCreateActivity = () => {
        dispatch(createActivity())
    }

    const handleOpenModal = (e, id, name) => {
        e.stopPropagation()
        setActivityToDelete({
            id,
            name
        })
        setShow(true)
    }
    
    const handleClickDetail = id => {
        navigate(`/activity/${id}`)
    }
    
    const handleCloseModal = () => {
        setActivityToDelete({
            id: null,
            name: ''
        })
        setShow(false)
    }
    
    const handleDeleteActivity = id => {
        dispatch(deleteActivity({ id }))
        handleCloseModal()
    }

    return (
        <section className='container'>
            {isLoading
                ? <MoonLoader cssOverride={{ margin: "0 auto" }} loading />
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
                                    onClick={e => handleOpenModal(e, activity._id, activity.name)}
                                ></span>
                            </div>)
                        }
                    </div>
                </>
            }

            <Backdrop
                show={show}
                onClose={handleCloseModal}
            >
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Delete Activity</h2>
                    </div>
                    <div className="modal-body">Are you sure want to delete <b>{activityToDelete.name}</b>?</div>
                    <div className="modal-footer">
                        <button className='dark-btn' onClick={handleCloseModal}>Cancel</button>
                        <button className='light-btn' onClick={() => handleDeleteActivity(activityToDelete.id)}>Delete</button>
                    </div>
                </div>
            </Backdrop>
        </section>
    )
}

export default ActivityList