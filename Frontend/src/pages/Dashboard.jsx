import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboardStats } from '../services/api'
import { useAuth } from '../context/AuthContext'
import '../styles/Dashboard.css'

const Dashboard = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDashboardStats()
                setStats(response.data)
            } catch (err) {
                setError('Failed to load dashboard stats')
                console.error('Dashboard error:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="container"><p>Loading...</p></div>
    if (error) return <div className="container error-message">{error}</div>

    return (
        <div className="container">
            <div className="dashboard">
                <h1>Welcome, {user?.name}!</h1>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-content">
                            <h3>Total Projects</h3>
                            <p className="stat-value">{stats?.totalProjects || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📋</div>
                        <div className="stat-content">
                            <h3>Total Tasks</h3>
                            <p className="stat-value">{stats?.totalTasks || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h3>Completed</h3>
                            <p className="stat-value">{stats?.completedTasks || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-content">
                            <h3>In Progress</h3>
                            <p className="stat-value">{stats?.inProgressTasks || 0}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <h3>Overdue</h3>
                            <p className="stat-value">{stats?.overdueTasks || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Task Status Overview</h2>
                    <div className="task-status">
                        <div className="status-item">
                            <span className="status-label">To Do</span>
                            <div className="status-bar">
                                <div className="status-fill todo" style={{width: `${stats?.tasksByStatus?.todo || 0}%`}}></div>
                            </div>
                            <span className="status-count">{stats?.tasksByStatus?.todo || 0}</span>
                        </div>
                        <div className="status-item">
                            <span className="status-label">In Progress</span>
                            <div className="status-bar">
                                <div className="status-fill inProgress" style={{width: `${stats?.tasksByStatus?.inProgress || 0}%`}}></div>
                            </div>
                            <span className="status-count">{stats?.tasksByStatus?.inProgress || 0}</span>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Done</span>
                            <div className="status-bar">
                                <div className="status-fill done" style={{width: `${stats?.tasksByStatus?.done || 0}%`}}></div>
                            </div>
                            <span className="status-count">{stats?.tasksByStatus?.done || 0}</span>
                        </div>
                    </div>
                </div>

                {stats?.recentTasks && stats.recentTasks.length > 0 && (
                    <div className="dashboard-section">
                        <h2>Recent Tasks</h2>
                        <div className="tasks-list">
                            {stats.recentTasks.map((task) => (
                                <div key={task._id} className="task-item">
                                    <span className="task-title">{task.title}</span>
                                    <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="dashboard-actions">
                    <button onClick={() => navigate('/projects')} className="btn-primary">
                        View All Projects
                    </button>
                    <button onClick={() => navigate('/tasks')} className="btn-secondary">
                        View All Tasks
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
