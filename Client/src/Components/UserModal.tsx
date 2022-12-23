import React, { CSSProperties, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useStylesContext } from "../Context/StylesContext";
import avatar from "../../Assets/profile.png";

const MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
}

const MODAL_CONTENT_STYLES: CSSProperties = {
    width: 300,
    backgroundColor: '#fff',
    position: 'fixed',
    marginTop: '90px',
    marginLeft: '15px',
    border: '1px solid #000000',
    borderRadius: '10px',
}

const MODAL_CONTENT_DARK_STYLES: CSSProperties = {
    ...MODAL_CONTENT_STYLES,
    backgroundColor: '#121212',
    border: '1px solid #BB86FC',
}


const MODAL_CONTENT_MOBILE_STYLES: CSSProperties = {
    width: '95%',
    marginRight: 'auto', 
    marginLeft: 'auto',
    position: 'initial',
    marginTop: '16%'
}

const MODAL_TITLE_STYLES: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 20,
    wordWrap: 'break-word',
    padding: '10px 0 0',
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

const ICON_STYLES: CSSProperties = {
    height: '64px',
    width: '64px',
    borderRadius: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
}

const TEXT_STYLE: CSSProperties = {
    textAlign: 'center',
    opacity: 0.7
}

const TEXT_DARK_STYLE: CSSProperties = {
    ...TEXT_STYLE,
    color: '#BB86FC',
    fontWeight: 300,
    opacity: 1
}

const X_BTN_STYLE: CSSProperties = {
    width: '5%',
    marginLeft: 'auto'
}

export const EMAIL_AUTH = 'password'

interface iUserModalProps {
    closeModal: () => void
}

const UserModal: React.FC<iUserModalProps> = ({ closeModal }) => {
    const [error, setError] = useState('')
    const { darkTheme, isMobile } = useStylesContext()
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()

    const displayName = currentUser?.displayName
    const isEmailUser = currentUser?.providerData[0].providerId === EMAIL_AUTH
    
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        closeModal()
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
        <div 
            style={isMobile ? { ...MODAL_STYLES, backgroundColor: 'rgba(0, 0, 0, 0.5)' } : MODAL_STYLES} 
            onClick={handleOutsideClick}
        >
            <div 
                style={
                    darkTheme ? 
                        isMobile ? 
                            { ...MODAL_CONTENT_DARK_STYLES, ...MODAL_CONTENT_MOBILE_STYLES } : MODAL_CONTENT_DARK_STYLES
                        : 
                        isMobile ? 
                            { ...MODAL_CONTENT_STYLES, ...MODAL_CONTENT_MOBILE_STYLES } : MODAL_CONTENT_STYLES
                } 
                onClick={handleContentClick}
            >
                {error && <Alert variant="danger">{error}</Alert>}
                <div style={{ padding: 10 }}>
                    {
                        isMobile && 
                        <div 
                            style={darkTheme ? { ...X_BTN_STYLE, color: '#ffffffab' } : X_BTN_STYLE} 
                            id="close-user-modal-btn" 
                            onClick={handleOutsideClick}
                        />
                    }
                    <img style={ICON_STYLES} src={currentUser?.photoURL ?? avatar} alt="Avatar icon" referrerPolicy="no-referrer" />
                    <p style={darkTheme ? MODAL_TITLE_DARK_STYLES : MODAL_TITLE_STYLES}>
                        {displayName ?? currentUser?.email ?? ''}
                    </p>
                    {
                        displayName &&
                        <p style={darkTheme ? TEXT_DARK_STYLE : TEXT_STYLE}>
                            {currentUser?.email ?? ''}
                        </p>
                    }
                </div>
                <div style={darkTheme ? MODAL_BODY_DARK_STYLES : MODAL_BODY_STYLES}>
                    <div>
                        {
                            isEmailUser &&
                            <Link to={"/update-profile"} className="btn btn-outline-primary w-100 mb-2">Update Profile</Link>
                        }
                        <Button className="w-100" variant={`outline-${darkTheme ? 'secondary' : 'dark'}`} onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserModal