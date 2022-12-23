import React, { useContext, useState } from "react"
import useMediaQuery, { MOBILE_SCREEN_WIDTH } from "../Hooks/useMediaQuery"

interface iStylesContext {
    darkTheme: boolean,
    toggleDarkTheme: () => void
    isMobile: boolean
}

const StylesContext = React.createContext<iStylesContext | null>(null)
export const useStylesContext = () => useContext(StylesContext) as iStylesContext

export const StylesProvider: React.FC = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(false)
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_SCREEN_WIDTH})`)

    const toggleDarkTheme = () => setDarkTheme(prevState => !prevState)

    return (
        <StylesContext.Provider value={{ darkTheme, toggleDarkTheme, isMobile }}>
            {children}
        </StylesContext.Provider>
    )
}