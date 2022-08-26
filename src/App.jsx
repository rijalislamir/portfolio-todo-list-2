import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard />} />
			<Route path='/activity/:id' element={<Detail />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	)
}

export default App
