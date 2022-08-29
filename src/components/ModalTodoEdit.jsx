import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../store/todo/action'

import Switch from 'react-switch'
import Modal from './Modal'

const ModalTodoEdit = ({ show, onClose, todo }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [priority, setPriority] = useState('')
  const [showPriorityOptions, setShowPriorityOptions] = useState(false)
  const [done, setDone] = useState(false)
  const priorityRef = useRef(null)

  useEffect(() => {
    setName(todo.name)
    setPriority(todo.priority)
    setDone(todo.done)
  }, [todo])

  useEffect(() => {
    document.addEventListener('click', handleOnclickOutsidePriority, true)

    return () => {
      document.removeEventListener('click', handleOnclickOutsidePriority, true)
    }
  }, [])

  const handleOnclickOutsidePriority = e => {
    console.log('masik')
    if (priorityRef.current !== null && !priorityRef.current.contains(e.target)) {
      setShowPriorityOptions(false)
    }
  }

  const handleOnchangeName = e => {
    setName(e.target.value)
  }

  const handleUpdateTodo = () => {
    dispatch(updateTodo({
      id: todo._id,
      activity: todo.activity,
      priority,
      name,
      done
    }))
    setShowPriorityOptions(false)
    onClose()
  }

  const handleCloseModal = () => {
    setName('')
    setPriority('')
    setDone(false)
    setShowPriorityOptions(false)
    onClose()
  }

  const handlePrintPriority = () => {
    if (priority === 'very-high') return <><span className="priority-indicator red"></span><span>Very High</span></>
    if (priority === 'high') return <><span className="priority-indicator orange"></span><span>High</span></>
    if (priority === 'medium') return <><span className="priority-indicator green"></span><span>Medium</span></>
    if (priority === 'low') return <><span className="priority-indicator blue"></span><span>Low</span></>
    if (priority === 'very-low') return <><span className="priority-indicator purple"></span><span>Very Low</span></>
    return <span className='error-message'>Choose One</span>
  }

  const handleOnclickPriorityDropdown = () => {
    setShowPriorityOptions(prevState => !prevState)
  }

  const handleOnclikPriorityItem = priority => {
    setPriority(priority)
    setShowPriorityOptions(false)
  }

  const handleSelectedPriority = priorityVal => {
    return (priorityVal === priority) ? 'priority-item selected-priority' : 'priority-item'
  }

  const handleOnchangeDone = prevState => {
    setDone(prevState)
  }

  return (
    <Modal show={show} onClose={handleCloseModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">Edit Todo</div>
        <div className="modal-body">
          <form className='edit-form-modal'>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id='name' name='name' value={name} onChange={handleOnchangeName} />
            </div>

            <div className="input-group">
              <label htmlFor="priority">Priority</label>
              <div className='priority-container' ref={priorityRef}>
                <div
                  className={showPriorityOptions ? 'priority-dropdown-open' : 'priority-dropdown'}
                  onClick={handleOnclickPriorityDropdown}
                >
                  {showPriorityOptions ? 'Choose One' : handlePrintPriority()}
                </div>

                {showPriorityOptions && 
                  <div className="priority-options">
                    <div className={handleSelectedPriority('very-high')} onClick={() => handleOnclikPriorityItem('very-high')}>
                      <span className="priority-indicator red"></span>
                      <span>Very High</span>
                    </div>
                    <div className={handleSelectedPriority('high')} onClick={() => handleOnclikPriorityItem('high')}>
                      <span className="priority-indicator orange"></span>
                      <span>High</span>
                    </div>
                    <div className={handleSelectedPriority('medium')} onClick={() => handleOnclikPriorityItem('medium')}>
                      <span className="priority-indicator green"></span>
                      <span>Medium</span>
                    </div>
                    <div className={handleSelectedPriority('low')} onClick={() => handleOnclikPriorityItem('low')}>
                      <span className="priority-indicator blue"></span>
                      <span>Low</span>
                    </div>
                    <div className={handleSelectedPriority('very-low')} onClick={() => handleOnclikPriorityItem('very-low')}>
                      <span className="priority-indicator purple"></span>
                      <span>Very Low</span>
                    </div>
                  </div>
                }
              </div>
            </div>
            
            <div className="input-group">
              <label>is Done?</label>
              <Switch
                onChange={handleOnchangeDone}
                checked={done}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#000000"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className='dark-btn' onClick={handleCloseModal}>Cancel</button>
          <button className='light-btn' onClick={handleUpdateTodo}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalTodoEdit