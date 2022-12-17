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
    alignItems: 'flex-end',
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
    fontSize: 'calc(1.2rem + 1.5vw)',
}

const BUTTON_STYLES: CSSProperties = {
    border: 'none',
    background: 'transparent',
}

const ICON_STYLES: CSSProperties = {
    height: 32,
    width: 32,
    cursor: 'pointer'
}

interface iHeaderProps {
    titleName: string
    openUserModal: () => void
}

export const Header: React.FC<iHeaderProps> = ({ titleName, openUserModal }) => {
    const { darkTheme, toggleDarkTheme, isMobile } = useStylesContext()
    const { currentUser } = useAuth()

    const handleDarkModeButtonClick = () => toggleDarkTheme()
    const handleUserModalClick = () => openUserModal()

    return (
        <header style={darkTheme ? HEADER_DARK_STYLES : HEADER_STYLES}>
            <button style={BUTTON_STYLES} onClick={handleDarkModeButtonClick}>
                <img style={ICON_STYLES} src={darkTheme ? sunIcon : moonIcon} alt="Theme button" />
            </button>
            <button style={darkTheme ? USER_DARK_STYLES : USER_STYLES} onClick={handleUserModalClick}>
                <img style={ICON_STYLES} src={currentUser?.photoURL ?? avatar} alt="Avatar icon" referrerPolicy="no-referrer" />
            </button>
            <h1 style={isMobile ? TITLE_STYLES : { ...TITLE_STYLES, paddingRight: '100px' }}>
                {titleName}
            </h1>
        </header>
    )
}