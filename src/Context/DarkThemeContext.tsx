import React, { useContext } from "react"
import { useState } from "react"

interface iDarkThemeContext {
    darkTheme: boolean,
    toggleDarkTheme: (value: React.SetStateAction<boolean>) => void
}

const DarkThemeContext = React.createContext<iDarkThemeContext | null>(null)
export const useDarkThemeContext = () => useContext(DarkThemeContext) as iDarkThemeContext

export const DarkThemeProvider: React.FC = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)
    const toggleDarkTheme = () => setDarkTheme(prevState => !prevState)

    return (
        <DarkThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
            {children}
        </DarkThemeContext.Provider>
    )
}