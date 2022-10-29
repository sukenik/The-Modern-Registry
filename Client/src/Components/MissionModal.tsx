import React, { CSSProperties } from "react";
import { useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useDarkThemeContext } from "../Context/DarkThemeContext";
import { useShowModalContext } from "../Context/ModalContext";
import { iModalActionParams, modalAction } from "../Logic/helperFunctions";
import { MissionForm } from "./MissionForm";

const MODAL_STYLES: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}
const MODAL_DARK_STYLES: CSSProperties = {
    ...MODAL_STYLES,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
}
const MODAL_CONTENT_STYLES: CSSProperties = {
    width: 500,
    backgroundColor: '#fff',
}
const MODAL_CONTENT_DARK_STYLES: CSSProperties = {
    ...MODAL_CONTENT_STYLES,
    backgroundColor: '#121212',
    border: '1px solid #BB86FC'
}
const MODAL_TITLE_STYLES: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 30,
    wordWrap: 'break-word',
    padding: 10
}
const MODAL_TITLE_DARK_STYLES: CSSProperties = {
    ...MODAL_TITLE_STYLES,
    color: '#BB86FC'
}
const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #eee'
}
const MODAL_BODY_DARK_STYLES: CSSProperties = {
    ...MODAL_BODY_STYLES,
    borderTop: '1px solid #BB86FC'
}

export const MissionModal: React.FC = () => {
    const { showDeleteModal, setShowMissionModal, setShowDeleteModal } = useShowModalContext()
    const { currentMission, setCurrentMission } = useCurrentMissionContext()
    const { darkTheme } = useDarkThemeContext()

    const handleOutsideClick = () => modalAction({ 
        setCurrentMission: setCurrentMission, 
        setShowModal: setShowMissionModal,
        setIsDelete: setShowDeleteModal
    } as iModalActionParams)

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()

    return (
        <div style={darkTheme ? MODAL_DARK_STYLES : MODAL_STYLES} onClick={handleOutsideClick}>
            <div style={darkTheme ? MODAL_CONTENT_DARK_STYLES : MODAL_CONTENT_STYLES} onClick={handleContentClick}>
                <div style={{ padding: 10 }}>
                    {showDeleteModal ? 
                        <p style={darkTheme ? MODAL_TITLE_DARK_STYLES : MODAL_TITLE_STYLES}>
                            Sure You Want To Delete
                            <br />
                            {darkTheme ? `"${currentMission.description}"?` : `"${currentMission.description}"?`}
                        </p> 
                        :
                        <p style={darkTheme ? MODAL_TITLE_DARK_STYLES : MODAL_TITLE_STYLES}>
                            {currentMission.id ? `Edit ${currentMission.description}` : 'Create a Mission'}
                        </p>
                    }
                </div>
                <div style={darkTheme ? MODAL_BODY_DARK_STYLES : MODAL_BODY_STYLES}>
                    <MissionForm />
                </div>
            </div>
        </div>
    )
}