import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityDetail, updateActivity } from '../store/activity/action'
import { reset as activityReset } from '../store/activity/reducer'
import {
    createTodo,
    updateTodo
} from '../store/todo/action'
import { MoonLoader } from 'react-spinners'
import ModalTodoEdit from './ModalTodoEdit'
import ModalTodoDelete from './ModalTodoDelete'

const ActivityDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { detail, isLoading } = useSelector(state => state.activity)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState({
        id: null,
        name: '',
        activity: null,
        priority: '',
        done: false
    })

    const inputRef = useRef(null)

    useEffect(() => {
        if (detail !== null) setName(detail.name)
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
            if (name !== detail.name) dispatch(updateActivity({ id: detail._id, name }))
        }
    }

    const handleCreateTodo = () => {
        dispatch(createTodo({
            name: 'New Todo',
            activity: detail._id,
            priority: 'very-high',
            done: false
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

    const handleOpenDeleteModal = (e, todo) => {
        e.stopPropagation()
        setSelectedTodo(todo)
        setShowDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setSelectedTodo({
            id: null,
            name: '',
            priority: '',
            done: false
        })
        setShowDeleteModal(false)
    }

    const handleOpenEditModal = (e, todo) => {
        e.stopPropagation()
        setSelectedTodo(todo)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setSelectedTodo({
            id: null,
            name: '',
            priority: '',
            done: false
        })
        setShowEditModal(false)
    }

    const handleOnchangeCheckBox = todo => {
        dispatch(updateTodo({ id: todo._id, activity: todo.activity, done: !todo.done }))
    }

    return (
        <section className='container'>
            {isLoading
                ? <MoonLoader cssOverride={{ margin: "0 auto" }} loading />
                : <>
                    <div className='activity-header'>
                        <span className='back-icon' onClick={handleGoBack}></span>
                        {edit
                            ? <input type='text' className='activity-name-input' value={name} onChange={handleOnchangeName} ref={inputRef} />
                            : <h2 onClick={() => setEdit(prevState => !prevState)}>{detail.name}</h2>
                        }
                        <span className='plus-icon' onClick={handleCreateTodo}></span>
                    </div>

                    <div className="todo-list">
                        {detail.todos.length === 0 &&
                            <div className="todo-item no-todo" onClick={handleCreateTodo}>
                                <h3>Add a Todo</h3>
                            </div>
                        }

                        {detail.todos.map((todo, i) => 
                            <div className='todo-item' key={i}>
                                <div className='todo-item-edit'>
                                    <input type="checkbox" name="done" checked={todo.done} onChange={() => handleOnchangeCheckBox(todo)} />
                                    <span className={handlePriority(todo.priority)}></span>
                                    <h3>{todo.name}</h3>
                                    <span className='edit-icon' onClick={e => handleOpenEditModal(e, todo)}></span>
                                </div>

                                <span
                                    className='trash-icon'
                                    onClick={e => handleOpenDeleteModal(e, todo)}
                                ></span>
                            </div>
                        )}
                    </div>
                </>
            }

            <ModalTodoEdit
                show={showEditModal}
                onClose={handleCloseEditModal}
                todo={selectedTodo}
            />
            
            <ModalTodoDelete
                show={showDeleteModal}
                onClose={handleCloseDeleteModal}
                todo={selectedTodo}
            />
        </section>
    )
}

export default ActivityDetail