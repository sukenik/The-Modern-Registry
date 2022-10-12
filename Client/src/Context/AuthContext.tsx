import { createUserWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import React, { useContext, useEffect, useState } from "react"
import { auth } from "../firebase"

interface iAuthContext {
    currentUser: User | null,
    signUp: (email: string, password: string) => Promise<UserCredential>,
    loading: boolean
}
const AuthContext = React.createContext<iAuthContext | null>(null)

export const useAuth = () => useContext(AuthContext) as iAuthContext

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [loading, setLoading] = useState(true)
    
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, signUp, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}