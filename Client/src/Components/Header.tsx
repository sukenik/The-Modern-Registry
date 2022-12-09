import React, { CSSProperties } from "react";
import { useAuth } from "../Context/AuthContext";
import { useStylesContext } from "../Context/StylesContext";
import moonIcon from "../../Assets/heaven-g329dd6da3_640.png";
import sunIcon from "../../Assets/sun-g977e87184_640.png";
import avatar from "../../Assets/profile.png";

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
    border: 'none',
    background: 'transparent',
    color: 'white',
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
    flex: 1,
    margin: 0,
    fontSize: 'calc(1.275rem + 1.5vw)'
}

const BUTTON_STYLES: CSSProperties = {
    border: 'none',
    background: 'transparent',
    alignSelf: 'flex-end'
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
    const { darkTheme, toggleDarkTheme, isMobile } = useStylesContext()
    const { currentUser } = useAuth()

    const handleDarkModeButtonClick = () => toggleDarkTheme()
    const handleUserModalClick = () => setIsModalOpen(prevState => !prevState)

    return (
        <header style={darkTheme ? HEADER_DARK_STYLES : HEADER_STYLES}>
            <button style={BUTTON_STYLES} onClick={handleDarkModeButtonClick}>
                <img style={ICON_STYLES} src={darkTheme ? sunIcon : moonIcon} alt="Theme button" />
            </button>
            <button 
                style={
                    darkTheme ? 
                        isMobile ? USER_DARK_STYLES : { ...USER_DARK_STYLES, marginLeft: '20px' }
                        : 
                        isMobile ? USER_STYLES : { ...USER_STYLES, marginLeft: '20px' }
                } 
                onClick={handleUserModalClick}
            >
                {
                    isMobile ? 
                        <img style={ICON_STYLES} src={currentUser?.photoURL ?? avatar} alt="Avatar icon" /> : 
                        (currentUser?.email || '')
                }
            </button>
            <h1 style={isMobile ? TITLE_STYLES : { ...TITLE_STYLES, paddingRight: '17%' }}>
                {titleName}
            </h1>
        </header>
    )
}