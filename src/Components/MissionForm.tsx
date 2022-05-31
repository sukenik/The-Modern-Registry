import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { getNewMission, getNewMissionUpdate, validateLinkToMission } from "../Logic/createMissionLogic";
import { getLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { modalAction } from "../Logic/helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString } from "../Logic/localStorageLogic";
import { getDefaultLinkToMissionElement, getMissionsToLinkElements, getStatusElements, iFormFields, validateFormFields } from "../Logic/missionFormLogic";
import { getMissionsWithSubMissions, setParentSubMission, unlinkParentSubMission } from "../Logic/subMissionLogic";

interface iMissionFormProps {
    mission: Mission
};

export const MissionForm: React.FC<iMissionFormProps> = ({ mission }) => {
    const modalType = mission.id === defaultMission.id ? 'Create' : 'Edit';
    const initialValues = { 
        name: mission.description, 
        status: modalType === 'Create' ? 'default' : mission.status, 
        linkToMission: modalType === 'Create' ? 'default' : mission.parentID
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({} as iFormFields);
    const [isSubmit, setIsSubmit] = useState(false);
    const { setShowMissionModal } = useShowModalContext();
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissions();
    const { setCurrentMission } = useCurrentMission();
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (modalType === 'Create') {
                const newMission = getNewMission(formValues.name, formValues.status, formValues.linkToMission);
                const parentID = validateLinkToMission(formValues.linkToMission);
                console.log(parentID);
                if (parentID) setParentSubMission(newMission, parentID);
                addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission));
                const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
                setLocalStorageMissions(missionsWithSubMissions);
            } else {
                if (formValues.linkToMission && mission.parentID) unlinkParentSubMission(mission.id, mission.parentID);
                const newMissionUpdate = getNewMissionUpdate(mission.id, formValues.name, formValues.status, formValues.linkToMission, 
                    mission.subMissions);
                const parentID = validateLinkToMission(formValues.linkToMission);
                if (parentID) setParentSubMission(newMissionUpdate, parentID);
                addToLocalStorage(mission.id.toString(), parseMissionToString(newMissionUpdate));
                const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
                setLocalStorageMissions(missionsWithSubMissions);
            }
            modalAction(setShowMissionModal, setCurrentMission);
        }
    }, [formErrors]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors(validateFormFields(formValues));
        setIsSubmit(true);
    };
    const handleCancelClick = (e: React.FormEvent) => modalAction(setShowMissionModal, setCurrentMission)
    const statusElements = getStatusElements(modalType, formValues);
    const linkToMissionOptions = getLinkToMissionOptions(mission, localStorageMissions);
    const missionsFitToLinkOptionElements = getMissionsToLinkElements(linkToMissionOptions);
    const hasMissionsForLink = missionsFitToLinkOptionElements.length === 0;
    const defaultLinkToMissionOption = getDefaultLinkToMissionElement(mission, localStorageMissions);

    return (
        <form id="mission-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input name="name" type="text" placeholder="Name" value={formValues.name} onChange={handleChange} maxLength={50} />
            <p>{ formErrors.name }</p>
            <label>Status:</label>
            <select name="status" id="StatusFilter" defaultValue={formValues.status} onChange={handleChange}>
                <option value="default" disabled hidden>
                    Choose a status...
                </option>
                {statusElements}
            </select>
            <p>{ formErrors.status }</p>
            <label>Link to mission:</label>
            <select 
                name="linkToMission" 
                defaultValue={mission.parentID === null ? 'default' : mission.parentID} 
                onChange={handleChange} 
                disabled={mission.parentID !== null ? false : hasMissionsForLink}>
                {defaultLinkToMissionOption}
                {missionsFitToLinkOptionElements}
            </select>
            <div className="modal-footer">
                <button onClick={handleSubmit} className="button" id="SaveButton" type="submit">Save</button>
                <button onClick={handleCancelClick} className="button" id="CancelButton">Cancel</button>
            </div>
        </form>
    );
}