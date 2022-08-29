import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityDetail, updateActivity } from '../store/activity/action'
import { reset as activityReset } from '../store/activity/reducer'
import { createTodo, deleteTodo } from '../store/todo/action'
import Backdrop from './Backdrop'

const ActivityDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { detail, isLoading } = useSelector(state => state.activity)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [show, setShow] = useState(false)
    const [todoToDelete, setTodoToDelete] = useState({
        id: null,
        name: ''
    })

    const inputRef = useRef(null)

    useEffect(() => {
        if (detail !== null && !isLoading) setName(detail.name)
    }, [detail])

    useEffect(() => {
        dispatch(getActivityDetail({ id: location.pathname.split('/').pop() }))
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideInput, true)

        return () => {
            document.removeEventListener('click', handleClickOutsideInput, true)
        }
    })

    useEffect(() => {
        if (edit) inputRef.current.focus()
    }, [edit])
    
    const handleOnchangeName = e => {
        setName(e.target.value)
    }

    const handleClickOutsideInput = e => {
        if (inputRef.current !== null && !inputRef.current.contains(e.target)) {
            setEdit(prevState => !prevState)
            dispatch(updateActivity({ id: detail._id, name }))
        }
    }

    const handleCreateTodo = () => {
        dispatch(createTodo({
            name: 'New Todo',
            activity: detail._id,
            priority: 'very-high'
        }))
    }

    const handlePriority = priority => {
        if (priority === 'very-high') return 'priority-indicator red'
        if (priority === 'high') return 'priority-indicator orange'
        if (priority === 'medium') return 'priority-indicator green'
        if (priority === 'low') return 'priority-indicator blue'
        if (priority === 'very-low') return 'priority-indicator purple'
    }

    const handleGoBack = () => {
        dispatch(activityReset())
        navigate('/')
    }

    const handleOpenModal = (e, id, name) => {
        e.stopPropagation()
        setTodoToDelete({
            id,
            name
        })
        setShow(true)
    }

    const handleCloseModal = () => {
        setTodoToDelete({
            id: null,
            name: ''
        })
        setShow(false)
    }

    const handleDeleteTodo = id => {
        dispatch(deleteTodo({ id }))
        handleCloseModal()
    }

    return (
        <section className='container'>
            {!isLoading &&
            <div className='activity-header'>
                <span className='back-icon' onClick={handleGoBack}></span>
                {edit
                    ? <input type='text' className='activity-name-input' value={name} onChange={handleOnchangeName} ref={inputRef} />
                    : <h2 onClick={() => setEdit(prevState => !prevState)}>{detail.name}</h2>
                }
                <span className='plus-icon' onClick={handleCreateTodo}></span>
            </div>
            }

            <div className="todo-list">
                {detail.todos.map((todo, i) => 
                    <div className='todo-item' key={i}>
                        <div className='todo-item-edit'>
                            <input type="checkbox" name="done" />
                            <span className={handlePriority(todo.priority)}></span>
                            <h3>{todo.name}</h3>
                        </div>

                        <span
                            className='trash-icon'
                            onClick={e => handleOpenModal(e, todo._id, todo.name)}
                        ></span>
                    </div>
                )}
            </div>

            <Backdrop
                show={show}
                onClose={handleCloseModal}
            >
                <div className='modal' onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Delete Todo</h2>
                    </div>
                    <div className="modal-body">Are you sure want to delete <b>{todoToDelete.name}</b>?</div>
                    <div className="modal-footer">
                        <button className='dark-btn' onClick={handleCloseModal}>Cancel</button>
                        <button className='light-btn' onClick={() => handleDeleteTodo(todoToDelete.id)}>Delete</button>
                    </div>
                </div>
            </Backdrop>
        </section>
    )
}

export default ActivityDetail