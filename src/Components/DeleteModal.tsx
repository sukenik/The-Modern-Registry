import React from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { addToLocalStorage, getChildrenFromDeletedMission, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString, removeFromLocalStorage } from "../Logic/localStorageLogic";

export const DeleteModal = () => {
    const { setShowDeleteModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissions();
    const handleOutsideClick = () => {
        setShowDeleteModal(false);
        setCurrentMission(defaultMission);
    };
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeFromLocalStorage(currentMission.id.toString());
        if (currentMission.subMissions.length) {
            currentMission.subMissions.forEach(subMission => {
                addToLocalStorage(subMission.id.toString(), parseMissionToString({ ...subMission, parentID: null }));
            });
        }
        setLocalStorageMissions(getLocalStorageMissions(getLocalStorageKeys()));
        setShowDeleteModal(false);
        setCurrentMission(defaultMission);
    }
    const handleCancelClick = () => {
        setShowDeleteModal(false);
        setCurrentMission(defaultMission);
    };

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h5 className="modal-title">
                        {`Sure You Want To Delete "${currentMission.description}"?`}
                    </h5>
                </div>
                <div className="modal-body">
                    <div className="modal-footer">
                        <button onClick={handleDelete} className="button" id="SaveButton">Delete</button>
                        <button onClick={handleCancelClick} className="button" id="CancelButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}