import React, { CSSProperties } from "react";
import { useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { iModalActionParams, modalAction } from "../Logic/helperFunctions";
import { onCreate, onUpdate } from "../Logic/missionFormLogic";
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
};
const MODAL_CONTENT_STYLES: CSSProperties = {
    width: 500,
    backgroundColor: '#fff',
};
const MODAL_TITLE_STYLES: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 30,
    wordWrap: 'break-word',
    padding: 10
};
const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #eee'
};

export const MissionModal: React.FC = () => {
    const { showDeleteModal, setShowMissionModal, setShowDeleteModal } = useShowModalContext()
    const { currentMission, setCurrentMission } = useCurrentMissionContext()

    const handleOutsideClick = () => modalAction({ 
        setCurrentMission: setCurrentMission, 
        setShowModal: setShowMissionModal,
        setIsDelete: setShowDeleteModal
    } as iModalActionParams)

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()

    return (
        <div style={MODAL_STYLES} onClick={handleOutsideClick}>
            <div style={MODAL_CONTENT_STYLES} onClick={handleContentClick}>
                <div style={{ padding: 10 }}>
                    {showDeleteModal ? 
                        <p style={MODAL_TITLE_STYLES}>
                            Sure You Want To Delete
                            <br />
                            "<b>{currentMission.description}</b>"?
                        </p> :
                        <h4 style={MODAL_TITLE_STYLES}>
                            {currentMission.id ? `Edit ${currentMission.description}` : 'Create a Mission'}
                        </h4>
                    }
                </div>
                <div style={MODAL_BODY_STYLES}>
                    <MissionForm mission={currentMission} handleSave={currentMission.id ? onUpdate : onCreate} />
                </div>
            </div>
        </div>
    );
};