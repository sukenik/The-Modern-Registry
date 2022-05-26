import React, { Dispatch, SetStateAction, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { filterSelfAndLinkedChildrenMissions } from "../Logic/filterLinkToMissionFieldLogic";
import { closeModal } from "../Logic/helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString, removeFromLocalStorage } from "../Logic/localStorageLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { Checkbox } from "./Checkbox";

export const DeleteModal = () => {
    const [checked, setChecked] = useState(false);
    const { setShowDeleteModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMission();
    const { setLocalStorageMissions } = useLocalStorageMissions();
    const labelText = "Delete linked children missions";
    const handleOutsideClick = () => closeModal(setShowDeleteModal, setCurrentMission);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        removeFromLocalStorage(currentMission.id.toString());
        if (currentMission.subMissions.length) {
            if (checked) {
                const missionsToDelete = filterSelfAndLinkedChildrenMissions(currentMission, []);
                missionsToDelete.forEach(mission => removeFromLocalStorage(mission.id.toString()));
            } else {
                currentMission.subMissions.forEach(subMission => {
                    addToLocalStorage(subMission.id.toString(), parseMissionToString({ ...subMission, parentID: null }));
                });
            }
        }
        const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
        setLocalStorageMissions(missionsWithSubMissions);
        setShowDeleteModal(false);
        setCurrentMission(defaultMission);
    }
    const handleCancelClick = () => closeModal(setShowDeleteModal, setCurrentMission);
    const handleCheckboxChange = () => setChecked(!checked);

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <p className="modal-title" id="delete-modal-title">
                        {'Sure You Want To Delete'}
                        <br />
                        {`"${currentMission.description}"?`}
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