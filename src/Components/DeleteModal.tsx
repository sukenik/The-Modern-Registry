import React, { CSSProperties, useState } from "react";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { useCurrentMissionContext } from "../Context/MissionContext";
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
    fontSize: 25
};
const MODAL_BODY_STYLES: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #eee'
};
const BUTTON_STYLES: CSSProperties = {
    backgroundColor: 'cornflowerblue',
    border: 'none',
    color: 'white',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    fontSize: 16,
    cursor: 'pointer',
    margin: 5
};

export const DeleteModal = () => {
    const [checked, setChecked] = useState(false);
    const { setShowDeleteModal } = useShowModalContext();
    const { currentMission, setCurrentMission } = useCurrentMissionContext();
    const { setLocalStorageMissions } = useLocalStorageMissionsContext();

    const labelText = "Delete linked children missions";
    const handleOutsideClick = () => modalAction(setShowDeleteModal, setCurrentMission);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    const handleCancelClick = () => modalAction(setShowDeleteModal, setCurrentMission);
    const handleCheckboxChange = () => setChecked(!checked);

    const handleDelete = () => {
        removeFromLocalStorage(currentMission.id.toString());
        if (currentMission.parentID) unlinkLocalStorageParentSubMission(currentMission.id, currentMission.parentID);
        if (currentMission.hasChildren) {
            if (checked) {
                const missionsToDelete = filterSelfAndLinkedChildrenMissions(currentMission, []);
                missionsToDelete.forEach(mission => removeFromLocalStorage(mission.id.toString()));
            } else {
                const parentID = currentMission.parentID;
                // if (parentID) currentMission.subMissions.forEach(subMission => setLocalStorageParentSubMission(subMission, parentID));
                // currentMission.subMissions.forEach(subMission => {
                //     addToLocalStorage(subMission.id.toString(), 
                //     parseMissionToString({ ...subMission, parentID: currentMission.parentID }));
                // });
            }
        }
        const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
        setLocalStorageMissions(missionsWithSubMissions);
        modalAction(setShowDeleteModal, setCurrentMission);
    }

    return (
        <div style={MODAL_STYLES} onClick={handleOutsideClick}>
            <div style={MODAL_CONTENT_STYLES} onClick={handleContentClick}>
                <div style={{ padding: 10 }}>
                    <p style={MODAL_TITLE_STYLES}>
                        Sure You Want To Delete
                        <br />
                        "<b>{currentMission.description}</b>"?
                    </p>
                </div>
                <div style={MODAL_BODY_STYLES}>
                    {currentMission.hasChildren &&
                        <Checkbox label={labelText} checked={checked} handleCheckboxChange={handleCheckboxChange} />
                    }
                    <div style={{ marginTop: 20 }}>
                        <button style={BUTTON_STYLES} onClick={handleDelete}>Delete</button>
                        <button style={{...BUTTON_STYLES, backgroundColor : 'rgb(49, 49, 49)'}} onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}