import React, { useState, useEffect } from 'react'
import { getMyTasks, updateTask, deleteTask } from '../services/api'
import '../styles/Tasks.css'

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const response = await getMyTasks()
            setTasks(response.data)
        } catch (err) {
            setError('Failed to load tasks')
            console.error('Tasks error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await updateTask(taskId, { status: newStatus })
            fetchTasks()
        } catch (err) {
            setError('Failed to update task')
            console.error('Update task error:', err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id)
                fetchTasks()
            } catch (err) {
                setError('Failed to delete task')
                console.error('Delete task error:', err)
            }
        }
    }

    const filteredTasks = filter === 'All' 
        ? tasks 
        : tasks.filter(t => t.status === filter)

    if (loading) return <div className="container"><p>Loading...</p></div>

    return (
        <div className="container">
            <div className="tasks-page">
                <h1>My Tasks</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="filter-section">
                    {['All', 'Todo', 'In Progress', 'Done'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`filter-btn ${filter === status ? 'active' : ''}`}
                        >
                            {status} ({tasks.filter(t => status === 'All' || t.status === status).length})
                        </button>
                    ))}
                </div>

                {filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks assigned to you yet.</p>
                    </div>
                ) : (
                    <div className="tasks-list">
                        {filteredTasks.map((task) => (
                            <div key={task._id} className="task-card">
                                <div className="task-header">
                                    <h3>{task.title}</h3>
                                    <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="btn-delete"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="task-description">{task.description}</p>
                                <div className="task-meta">
                                    <span className="project-name">📁 {task.project?.title || 'Project'}</span>
                                    {task.dueDate && (
                                        <span className="due-date">
                                            📅 {new Date(task.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <div className="task-status-selector">
                                    <label>Status:</label>
                                    <select 
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                    >
                                        <option>Todo</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tasks
