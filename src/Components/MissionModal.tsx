import React, { useContext } from "react";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { MissionForm } from "./MissionForm";

export const MissionModal: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    if (!showModal) {
        return null;
    }

    const handleOutsideClick = () => {
        setShowModal(false);
        setCurrentMission(defaultMission);
    }
    const handleCancelClick = () => {
        setShowModal(false);
        setCurrentMission(defaultMission);
    }
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    
    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h4 className="modal-title">
                        {currentMission.id === 0 ? 'Create a Mission' : 'Edit a Mission'}
                    </h4>
                </div>
                <div className="modal-body">
                    <MissionForm mission={currentMission}/>
                </div>
                <div className="modal-footer">
                    <button className="button" id="SaveButton">Save</button>
                    <button onClick={handleCancelClick} className="button" id="CancelButton">Cancel</button>
                </div>
            </div>
        </div>
    );
};