import React from 'react'
import Modal from './Modal'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../store/todo/action'

const ModalTodoDelete = ({ show, onClose, todo }) => {
  const dispatch = useDispatch()
  
  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id: todo._id, activity: todo.activity }))
    onClose()
  }

  return (
    <Modal show={show} onClose={() => onClose()}>
      <div className='modal' onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <h2>Delete Todo</h2>
        </div>
        <div className="modal-body">Are you sure want to delete <b>{todo.name}</b>?</div>
        <div className="modal-footer">
          <button className='dark-btn' onClick={() => onClose()}>Cancel</button>
          <button className='light-btn' onClick={handleDeleteTodo}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalTodoDelete