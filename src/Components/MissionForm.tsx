import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { defaultMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";
import { getNewMission, getNewMissionUpdate } from "../Logic/createMissionLogic";
import { getLinkToMissionOptions, getLinkToNewMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { addToLocalStorage, getMissionsFromLocalStorage, parseMissionToString } from "../Logic/localStorageLogic";
import { getDefaultLinkToMissionElement, getMissionsToLinkElements, getStatusElements, iFormFields, validateFormFields } from "../Logic/missionFormLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";

interface iMissionFormProps {
    mission: Mission,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setCurrentMission: Dispatch<SetStateAction<Mission>>,
    localStorageMissions: Array<Mission>,
    setLocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>,
    localStorageKeys: Array<string>
};

export const MissionForm: React.FC<iMissionFormProps> = ({ mission, setShowModal, setCurrentMission, 
        localStorageMissions, setLocalStorageMissions, localStorageKeys }) => {
    const modalType = mission.id === defaultMission.id ? 'Create' : 'Edit';
    const initialValues = { 
        name: mission.description, 
        status: modalType === 'Create' ? 'default' : mission.status, 
        linkToMission: modalType === 'Create' ? 'default' : mission.parentID
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({} as iFormFields);
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (modalType === 'Create') {
                const newMission = getNewMission(formValues.name, formValues.status, formValues.linkToMission);
                addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission));
                localStorageKeys.push(newMission.id.toString());
                setLocalStorageMissions(prevState => prevState.concat([newMission]));
            } else {
                const newMissionUpdate = getNewMissionUpdate(mission.id, formValues.name, formValues.status, formValues.linkToMission, 
                    mission.subMissions);
                addToLocalStorage(mission.id.toString(), parseMissionToString(newMissionUpdate));
                const missionsWithSubMissions = getMissionsWithSubMissions(getMissionsFromLocalStorage(localStorageKeys));
                setLocalStorageMissions(missionsWithSubMissions);
            }
            setShowModal(false);
            setCurrentMission(defaultMission);
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
    const handleCancelClick = (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(false);
        setCurrentMission(defaultMission);
    };
    const statusElements = getStatusElements(modalType, formValues);
    const linkToMissionOptions = modalType === 'Create' ? 
        getLinkToNewMissionOptions(localStorageMissions) :
        getLinkToMissionOptions(mission.id, localStorageMissions);
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