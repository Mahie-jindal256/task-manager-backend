import React, { createContext, useState, useContext, useEffect } from 'react'
import * as api from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await api.getMe()
                    setUser(response.data)
                } catch (err) {
                    console.error('Auth check failed:', err)
                    localStorage.removeItem('token')
                    setToken(null)
                }
            }
            setLoading(false)
        }
        checkAuth()
    }, [token])

    const signup = async (name, email, password) => {
        try {
            const response = await api.signup({ name, email, password })
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setUser(response.data.user)
            return response.data
        } catch (err) {
            throw err.response?.data || err
        }
    }

    const login = async (email, password) => {
        try {
            const response = await api.login({ email, password })
            localStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setUser(response.data.user)
            return response.data
        } catch (err) {
            throw err.response?.data || err
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    const value = {
        user,
        token,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!token
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
