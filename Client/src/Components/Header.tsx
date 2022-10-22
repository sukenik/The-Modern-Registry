import React, { CSSProperties } from "react";
import { useAuth } from "../Context/AuthContext";
import { useDarkThemeContext } from "../Context/DarkThemeContext";
import moonIcon from "../../Assets/heaven-g329dd6da3_640.png";
import sunIcon from "../../Assets/sun-g977e87184_640.png";

const HEADER_STYLES: CSSProperties = {
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'white',
    cursor: 'default',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center'
}
const HEADER_DARK_STYLES: CSSProperties = {
    ...HEADER_STYLES,
    color: '#BB86FC', 
    borderBottom: '2px solid #BB86FC'
}
const USER_STYLES: CSSProperties = {
    marginLeft: 35,
    border: 'none',
    background: 'transparent',
    color: 'white',
    width: 200,
    fontSize: 17,
    height: 45,
    borderLeft: '1px solid #FFFFFF',
    borderRight: '1px solid #FFFFFF',
}
const USER_DARK_STYLES: CSSProperties = {
    ...USER_STYLES,
    borderLeft: '1px solid #BB86FC',
    borderRight: '1px solid #BB86FC',
    color: '#BB86FC',
}
const TITLE_STYLES: CSSProperties = {
    flexGrow: 1, 
    paddingRight: 330
}
const BUTTON_STYLES: CSSProperties = {
    border: 'none',
    background: 'transparent',
    marginLeft: 75,
    alignSelf: 'center'
}
const ICON_STYLES: CSSProperties = {
    height: 32,
    width: 32,
    cursor: 'pointer'
}

interface iHeaderProps {
    titleName: string
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<iHeaderProps> = ({ titleName, setIsModalOpen }) => {
    const { darkTheme, toggleDarkTheme } = useDarkThemeContext()
    const { currentUser } = useAuth()

    const handleDarkModeButtonClick = () => toggleDarkTheme()
    const handleUserModalClick = () => setIsModalOpen(prevState => !prevState)

    return (
        <>
            <header style={darkTheme ? HEADER_DARK_STYLES : HEADER_STYLES}>
                <button style={BUTTON_STYLES} onClick={handleDarkModeButtonClick}>
                    <img style={ICON_STYLES} src={darkTheme ? sunIcon : moonIcon} alt="Theme button" />
                </button>
                <button 
                    id='user-profile' 
                    style={darkTheme ? USER_DARK_STYLES : USER_STYLES } 
                    onClick={handleUserModalClick}
                >
                    {currentUser?.email}
                </button>
                <h1 style={TITLE_STYLES}>
                    {titleName}
                </h1>
            </header>
        </>
    )
}