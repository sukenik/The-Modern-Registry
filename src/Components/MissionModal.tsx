import React, { useEffect } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { getLocalStorageKeys, getLocalStorageMissions } from "../Logic/localStorageLogic";
import { MissionForm } from "./MissionForm";

export const MissionModal: React.FC = () => {
    const { setShowMissionModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    const handleOutsideClick = () => {
        setShowMissionModal(false);
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
                    <MissionForm mission={currentMission} />
                </div>
            </div>
        </div>
    );
};