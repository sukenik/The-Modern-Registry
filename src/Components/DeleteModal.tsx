import React from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { getLocalStorageKeys, getLocalStorageMissions, getMissionsWithoutDeletedParent } from "../Logic/localStorageLogic";

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
        // removeFromLocalStorage
        if (currentMission.subMissions.length) {
            // If mission has children, make their parentID null
            const missionsWithoutDeletedParent = 
                getMissionsWithoutDeletedParent(currentMission.id, getLocalStorageMissions(getLocalStorageKeys()));
            // console.log(missionsWithoutDeletedParent);
            // setLocalStorageMissions()
            // setLocalStorageMissions(prevState => {
            //     prevState.map(mission => {
            //         mission.parentID === currentMission.id ?
            //         {}
            //     })
            // })
        }
        // missionsWithSubMissions = getMissionsWithSubMissions

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