import React, { useState, useEffect } from 'react'
import { getProjects, createProject, deleteProject } from '../services/api'
import '../styles/Projects.css'

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const response = await getProjects()
            setProjects(response.data)
        } catch (err) {
            setError('Failed to load projects')
            console.error('Projects error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!title.trim()) {
            setError('Please enter a project title')
            return
        }

        setCreating(true)
        try {
            await createProject({ title, description })
            setTitle('')
            setDescription('')
            setShowForm(false)
            setError('')
            fetchProjects()
        } catch (err) {
            setError('Failed to create project')
            console.error('Create project error:', err)
        } finally {
            setCreating(false)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id)
                fetchProjects()
            } catch (err) {
                setError('Failed to delete project')
                console.error('Delete project error:', err)
            }
        }
    }

    if (loading) return <div className="container"><p>Loading...</p></div>

    return (
        <div className="container">
            <div className="projects-page">
                <div className="page-header">
                    <h1>Projects</h1>
                    <button 
                        onClick={() => setShowForm(!showForm)} 
                        className="btn-primary"
                    >
                        {showForm ? 'Cancel' : '+ New Project'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {showForm && (
                    <div className="form-card">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Project Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter project title"
                                    disabled={creating}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter project description (optional)"
                                    rows="4"
                                    disabled={creating}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary" disabled={creating}>
                                {creating ? 'Creating...' : 'Create Project'}
                            </button>
                        </form>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="empty-state">
                        <p>No projects yet. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {projects.map((project) => (
                            <div key={project._id} className="project-card">
                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <button 
                                        onClick={() => handleDelete(project._id)}
                                        className="btn-delete"
                                        title="Delete project"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="project-description">{project.description}</p>
                                <div className="project-meta">
                                    <span className="members-count">👥 {project.members.length} member(s)</span>
                                    <span className="creator">by {project.createdBy.name}</span>
                                </div>
                                <button 
                                    onClick={() => window.location.href = `/projects/${project._id}`}
                                    className="btn-secondary"
                                >
                                    View Project
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects
