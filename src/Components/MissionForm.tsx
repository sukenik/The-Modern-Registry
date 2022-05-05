import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { defaultMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";
import { getMissionFromParentID, getNewMission } from "../Logic/createMissionLogic";
import { getLinkToMissionOptions, getLinkToNewMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { addToLocalStorage, parseMissionToString } from "../Logic/localStorageLogic";
import { getDefaultLinkToMissionElement, getMissionsToLinkElements, getStatusElements, iFormFields, validateFormFields } from "../Logic/missionFormLogic";

interface iMissionFormProps {
    mission: Mission,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setCurrentMission: Dispatch<SetStateAction<Mission>>,
    localStorageMissions: Array<Mission>,
    setlocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>,
    keys: Array<string>
};

export const MissionForm: React.FC<iMissionFormProps> = ({ mission, setShowModal, setCurrentMission, 
        localStorageMissions, setlocalStorageMissions, keys }) => {
    const modalType = mission.id === defaultMission.id ? 'Create' : 'Edit';
    const initialValues = { 
        name: mission.description, 
        status: modalType === 'Create' ? 'default' : mission.status, 
        linkToMission: getMissionFromParentID(mission.parentID, localStorageMissions)
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({} as iFormFields);
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const newMission = getNewMission(formValues.name, formValues.status, formValues.linkToMission);
            addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission));
            keys.push(newMission.id.toString());
            setlocalStorageMissions(prevState => prevState.concat([newMission]));
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
    const defaultLinkToMissionOption = getDefaultLinkToMissionElement(formValues, hasMissionsForLink);

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
                defaultValue={formValues.linkToMission} 
                onChange={handleChange} 
                disabled={hasMissionsForLink}>
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