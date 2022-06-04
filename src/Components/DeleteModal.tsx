import React, { useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { filterSelfAndLinkedChildrenMissions } from "../Logic/filterLinkToMissionFieldLogic";
import { modalAction } from "../Logic/helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString, removeFromLocalStorage } from "../Logic/localStorageLogic";
import { getMissionsWithSubMissions, setLocalStorageParentSubMission, unlinkLocalStorageParentSubMission } from "../Logic/subMissionLogic";
import { Checkbox } from "./Checkbox";

export const DeleteModal = () => {
    const [checked, setChecked] = useState(false);
    const { setShowDeleteModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    const { setLocalStorageMissions } = useLocalStorageMissions();
    const labelText = "Delete linked children missions";
    const handleOutsideClick = () => modalAction(setShowDeleteModal, setCurrentMission);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    const handleDelete = () => {
        removeFromLocalStorage(currentMission.id.toString());
        if (currentMission.parentID) unlinkLocalStorageParentSubMission(currentMission.id, currentMission.parentID);
        if (currentMission.subMissions.length) {
            if (checked) {
                const missionsToDelete = filterSelfAndLinkedChildrenMissions(currentMission, []);
                missionsToDelete.forEach(mission => removeFromLocalStorage(mission.id.toString()));
            } else {
                const parentID = currentMission.parentID;
                if (parentID) currentMission.subMissions.forEach(subMission => setLocalStorageParentSubMission(subMission, parentID));
                currentMission.subMissions.forEach(subMission => {
                    addToLocalStorage(subMission.id.toString(), 
                        parseMissionToString({ ...subMission, parentID: currentMission.parentID }));
                });
            }
        }
        const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
        setLocalStorageMissions(missionsWithSubMissions);
        modalAction(setShowDeleteModal, setCurrentMission);
    }
    const handleCancelClick = () => modalAction(setShowDeleteModal, setCurrentMission);
    const handleCheckboxChange = () => setChecked(!checked);

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <p className="modal-title" id="delete-modal-title">
                        Sure You Want To Delete
                        <br />
                        "<b>{currentMission.description}</b>"?
                    </p>
                </div>
                <div className="modal-body">
                    {!!currentMission.subMissions.length &&
                        <Checkbox label={labelText} checked={checked} handleCheckboxChange={handleCheckboxChange} />}
                    <div className="modal-footer">
                        <button onClick={handleDelete} className="button" id="SaveButton">Delete</button>
                        <button onClick={handleCancelClick} className="button" id="CancelButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}