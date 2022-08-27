import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityDetail } from '../store/activity/action'
import { reset as activityReset } from '../store/activity/reducer'
import { createTodo, deleteTodo } from '../store/todo/action'


const ActivityDetail = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { detail } = useSelector(state => state.activity)

    useEffect(() => {
        dispatch(getActivityDetail({ id: location.pathname.split('/').pop() }))
    }, [])
    
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

    const handleDeleteTodo = id => {
        dispatch(deleteTodo({ id }))
    }

    const handleGoBack = () => {
        dispatch(activityReset())
        navigate('/')
    }

    return (
        <section className='container'>
            <div className='activity-header'>
                <span className='back-icon' onClick={handleGoBack}></span>
                <h2>{detail.name}</h2>
                <span className='plus-icon' onClick={handleCreateTodo}></span>
            </div>

            <div className="todo-list">
                {detail.todos.map((todo, i) => 
                    <div className='todo-item' key={i}>
                        <div className='todo-item-edit'>
                            <input type="checkbox" name="done" />
                            <span className={handlePriority(todo.priority)}></span>
                            <h3>{todo.name}</h3>
                        </div>

                        <span className='trash-icon' onClick={() => handleDeleteTodo(todo._id)}></span>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ActivityDetail