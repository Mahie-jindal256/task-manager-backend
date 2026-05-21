import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="home">
            <div className="hero">
                <h1>📊 ProjectHub</h1>
                <p>Manage Your Projects & Tasks Efficiently</p>
                <div className="hero-buttons">
                    <button onClick={() => navigate('/login')} className="btn-primary">
                        Login
                    </button>
                    <button onClick={() => navigate('/signup')} className="btn-secondary">
                        Sign Up
                    </button>
                </div>
            </div>

            <div className="features">
                <div className="feature-card">
                    <div className="feature-icon">👥</div>
                    <h3>Team Collaboration</h3>
                    <p>Collaborate with team members on projects and tasks</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📋</div>
                    <h3>Task Management</h3>
                    <p>Create, assign, and track tasks with ease</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Progress Tracking</h3>
                    <p>Monitor project progress with detailed dashboards</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔐</div>
                    <h3>Role-Based Access</h3>
                    <p>Admin and Member roles for better control</p>
                </div>
            </div>
        </div>
    )
}

export default Home
