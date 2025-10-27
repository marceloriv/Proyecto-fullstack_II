import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

const USERS_KEY = 'tg_users'
const SESSION_KEY = 'tg_session'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
            if (s && s.id && s.username) setUser(s)
            else localStorage.removeItem(SESSION_KEY)
        } catch { localStorage.removeItem(SESSION_KEY) }
    }, [])

    const getUsers = () => {
        try { return JSON.parse(localStorage.getItem(USERS_KEY)) || [] }
        catch { return [] }
    }
    const saveUsers = (list) => localStorage.setItem(USERS_KEY, JSON.stringify(list))

    const vName = v => (typeof v === 'string' && v.trim().length >= 3) || 'El nombre debe tener al menos 3 caracteres'
    const vUser = v => {
        const s = String(v || '').trim()
        if (!s) return 'El nombre de usuario no puede estar vacío'
        if (s.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres'
        if (/\s/.test(s)) return 'El nombre de usuario no puede contener espacios'
        return true
    }
    const vPass = v => (typeof v === 'string' && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres'

    const register = ({ nombre, username, password }) => {
        const n = String(nombre || '').trim()
        const u = String(username || '').trim()
        const p = String(password || '')

        const vn = vName(n); if (vn !== true) throw new Error(vn)
        const vu = vUser(u); if (vu !== true) throw new Error(vu)
        const vp = vPass(p); if (vp !== true) throw new Error(vp)

        const users = getUsers()
        if (users.some(x => x.username.toLowerCase() === u.toLowerCase()))
            throw new Error('El nombre de usuario ya está en uso.')

        const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2,9)}`
        const newUser = { id, nombre: n, username: u, password: p }
        users.push(newUser)
        saveUsers(users)
        return { id, nombre: n, username: u }
    }

    const login = ({ username, password }) => {
        const u = String(username || '').trim()
        const p = String(password || '')
        if (!u || !p) throw new Error('Usuario y contraseña son requeridos.')

        const users = getUsers()
        const match = users.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p)
        if (!match) throw new Error('Usuario o contraseña inválidos.')

        const sessionUser = { id: match.id, nombre: match.nombre, username: match.username }
        setUser(sessionUser)
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser)) } catch {}
        return sessionUser
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(SESSION_KEY)
    }

    return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
}