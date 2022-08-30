import React from 'react'
import Backdrop from './Backdrop'
import { useDispatch } from 'react-redux/es/exports'
import { deleteActivity } from '../store/activity/action'

const ModalActivityDelete = ({ show, onClose, activity }) => {
  const dispatch = useDispatch()

  const handleDeleteActivity = id => {
    dispatch(deleteActivity({ id }))
    handleCloseModal()
  }
  
  const handleCloseModal = () => onClose()

  return (
    <Backdrop
      show={show}
      onClose={handleCloseModal}
    >
      <div className="modal">
        <div className="modal-header">
            <h2>Delete Activity</h2>
        </div>

        <div className="modal-body">Are you sure want to delete <b>{activity.name}</b>?</div>

        <div className="modal-footer">
          <button className='dark-btn' onClick={handleCloseModal}>Cancel</button>
          <button className='light-btn' onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
        </div>
      </div>
    </Backdrop>
  )
}

export default ModalActivityDelete