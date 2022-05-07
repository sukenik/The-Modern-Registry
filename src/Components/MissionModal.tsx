import React from "react";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { MissionForm } from "./MissionForm";

interface iMissionModalProps {
    localStorageMissions: Array<Mission>,
    setLocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>,
    localStorageKeys: Array<string>
}

export const MissionModal: React.FC<iMissionModalProps> = ({ localStorageMissions, setLocalStorageMissions, localStorageKeys }) => {
    const { showModal, setShowModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    if (!showModal) {
        return null;
    };
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
                    <MissionForm 
                        mission={currentMission} 
                        setShowModal={setShowModal} 
                        setCurrentMission={setCurrentMission}
                        localStorageMissions={localStorageMissions} 
                        setLocalStorageMissions={setLocalStorageMissions}
                        localStorageKeys={localStorageKeys} />
                </div>
            </div>
        </div>
    );
};