import React, { CSSProperties, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { filterSelfAndLinkedChildrenMissions } from "../Logic/filterLinkToMissionFieldLogic";
import { modalAction } from "../Logic/helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString, removeFromLocalStorage } from "../Logic/localStorageLogic";
import { getMissionsWithSubMissions, setLocalStorageParentSubMission, unlinkLocalStorageParentSubMission } from "../Logic/subMissionLogic";
import { Checkbox } from "./Checkbox";

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
    fontSize: 30
};
const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #eee'
};

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
        <div style={MODAL_STYLES} onClick={handleOutsideClick}>
            <div style={MODAL_CONTENT_STYLES} onClick={handleContentClick}>
                <div style={{ padding: 10 }}>
                    <p style={MODAL_TITLE_STYLES} id="delete-modal-title">
                        Sure You Want To Delete
                        <br />
                        "<b>{currentMission.description}</b>"?
                    </p>
                </div>
                <div style={MODAL_BODY_STYLES}>
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