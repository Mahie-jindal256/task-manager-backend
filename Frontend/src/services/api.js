import axios from 'axios'

const API = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Auth endpoints
export const signup = (data) => API.post('/auth/signup', data)
export const login = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')

// Project endpoints
export const createProject = (data) => API.post('/projects', data)
export const getProjects = () => API.get('/projects')
export const getProjectById = (id) => API.get(`/projects/${id}`)
export const updateProject = (id, data) => API.put(`/projects/${id}`, data)
export const addMember = (id, data) => API.post(`/projects/${id}/members`, data)
export const deleteProject = (id) => API.delete(`/projects/${id}`)

// Task endpoints
export const createTask = (data) => API.post('/tasks', data)
export const getTasksByProject = (projectId) => API.get(`/tasks/project/${projectId}`)
export const getMyTasks = () => API.get('/tasks/my/tasks')
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data)
export const deleteTask = (id) => API.delete(`/tasks/${id}`)

// Dashboard endpoints
export const getDashboardStats = () => API.get('/dashboard')
export const getTasksByStatus = (status) => API.get(`/dashboard/status/${status}`)

export default API