import React, { CSSProperties, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useDarkThemeContext } from "../Context/DarkThemeContext";

const MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
}
const MODAL_DARK_STYLES: CSSProperties = {
    ...MODAL_STYLES,
}
const MODAL_CONTENT_STYLES: CSSProperties = {
    width: 200,
    backgroundColor: '#fff',
    position: 'fixed',
    left: 165,
    top: 75,
    border: '1px solid #000000'
}
const MODAL_CONTENT_DARK_STYLES: CSSProperties = {
    ...MODAL_CONTENT_STYLES,
    backgroundColor: '#121212',
    border: '1px solid #BB86FC',
    borderTop: 'transparent',
    top: 78
}
const MODAL_TITLE_STYLES: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 20,
    wordWrap: 'break-word',
    padding: 10,
}
const MODAL_TITLE_DARK_STYLES: CSSProperties = {
    ...MODAL_TITLE_STYLES,
    color: '#BB86FC'
}
const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #000000'
}
const MODAL_BODY_DARK_STYLES: CSSProperties = {
    ...MODAL_BODY_STYLES,
    borderTop: '1px solid #BB86FC'
}

export const EMAIL_AUTH = 'password'

interface iUserModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal: React.FC<iUserModalProps> = ({ setIsModalOpen }) => {
    const [error, setError] = useState('')
    const { darkTheme } = useDarkThemeContext()
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsModalOpen(false)
    }
    
    const handleLogout = async () => {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div style={darkTheme ? MODAL_DARK_STYLES : MODAL_STYLES} onClick={handleOutsideClick}>
            <div style={darkTheme ? MODAL_CONTENT_DARK_STYLES : MODAL_CONTENT_STYLES} onClick={handleContentClick}>
                {error && <Alert variant="danger">{error}</Alert>}
                <div style={{ padding: 10 }}>
                    <p style={darkTheme ? MODAL_TITLE_DARK_STYLES : MODAL_TITLE_STYLES}>
                        Hello, {currentUser?.displayName ?? currentUser?.email ?? ''}
                    </p>
                </div>
                <div style={darkTheme ? MODAL_BODY_DARK_STYLES : MODAL_BODY_STYLES}>
                    <div>
                        {
                            currentUser?.providerData[0].providerId === EMAIL_AUTH &&
                            <Link to={"/update-profile"} className="btn btn-primary mt-3">Update Profile</Link>
                        }
                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal