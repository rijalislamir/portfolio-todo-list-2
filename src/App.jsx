import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ActivityDetail from './pages/ActivityDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/activity/:id' element={<ActivityDetail />} />
		</Routes>
	)
}

export default App
