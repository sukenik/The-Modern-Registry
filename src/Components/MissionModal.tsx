import React, { useContext } from "react";
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { MissionForm } from "./MissionForm";

export const MissionModal: React.FC = ({ children }) => {
    const { showModal, setShowModal } = useShowModalContext();
    const { currentMission } = useCurrentMission();
    if (!showModal) {
        return null;
    }

    const modalType = typeof currentMission.id === 'number' ? 'Create' : 'Edit';

    const handleOutsideClick = () => setShowModal(false);
    const handleCancelClick = () => setShowModal(false);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    
    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h4 className="modal-title">
                        {modalType === 'Create' ? 'Create a Mission' : 'Edit a Mission'}
                    </h4>
                </div>
                <div className="modal-body">
                    <MissionForm mission={currentMission} />
                </div>
                <div className="modal-footer">
                    <button 
                        className="button"
                        id="SaveButton">Save</button>
                    <button
                        onClick={handleCancelClick} 
                        className="button"
                        id="CancelButton">Cancel</button>
                </div>
            </div>
        </div>
    );
};