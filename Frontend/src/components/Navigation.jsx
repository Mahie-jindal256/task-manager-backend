import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navigation.css'

const Navigation = () => {
    const { user, logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    📊 ProjectHub
                </Link>
                {isAuthenticated ? (
                    <div className="nav-menu">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/projects" className="nav-link">Projects</Link>
                        <Link to="/tasks" className="nav-link">My Tasks</Link>
                        <div className="nav-user">
                            <span className="user-name">{user?.name}</span>
                            <span className="user-role">{user?.role}</span>
                        </div>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <div className="nav-menu">
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link signup-link">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navigation
