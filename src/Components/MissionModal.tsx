import React from "react";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { MissionForm } from "./MissionForm";

export const MissionModal: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();
    if (!showModal) {
        return null;
    };
    const { currentMission, setCurrentMission } = useCurrentMission();
    const handleOutsideClick = () => {
        setShowModal(false);
        setCurrentMission(defaultMission);
    };
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    
    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h4 className="modal-title">
                        {currentMission.id === defaultMission.id ? 'Create a Mission' : 'Edit a Mission'}
                    </h4>
                </div>
                <div className="modal-body">
                    <MissionForm mission={currentMission} setShowModal={setShowModal} setCurrentMission={setCurrentMission} />
                </div>
            </div>
        </div>
    );
};