import React, { CSSProperties, useEffect, useState } from "react";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { defaultMission, useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useShowModalContext } from "../Context/ShowModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { getNewMission, getNewMissionUpdate, validateLinkToMission } from "../Logic/createMissionLogic";
import { getLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { modalAction } from "../Logic/helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString } from "../Logic/localStorageLogic";
import { getDefaultLinkToMissionElement, getMissionsToLinkElements, getStatusElements, iFormFields, validateFormFields } from "../Logic/missionFormLogic";
import { getMissionsWithSubMissions, setLocalStorageParentSubMission, unlinkLocalStorageParentSubMission } from "../Logic/subMissionLogic";

const MISSION_FORM_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
};
const LABEL_INPUT_STYLES: CSSProperties = {
    margin: 5,
    width: '80%'
};
const SELECT_STYLES: CSSProperties = {
    width: '35%',
    textAlign: 'center',
    margin: 5,
    cursor: 'pointer'
};
const ERROR_STYLES: CSSProperties = {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: 'lighter',
    color: 'red'
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
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissionsContext();
    const { setCurrentMission } = useCurrentMissionContext();
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            if (modalType === 'Create') {
                const newMission = getNewMission(formValues.name, formValues.status, formValues.linkToMission);
                const parentID = validateLinkToMission(formValues.linkToMission);
                if (parentID) setLocalStorageParentSubMission(newMission, parentID);
                addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission));
                const missionsWithSubMissions = getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
                setLocalStorageMissions(missionsWithSubMissions);
            } else {
                if (formValues.linkToMission && mission.parentID) unlinkLocalStorageParentSubMission(mission.id, mission.parentID);
                const newMissionUpdate = getNewMissionUpdate(mission.id, formValues.name, formValues.status, formValues.linkToMission, 
                    mission.subMissions);
                const parentID = validateLinkToMission(formValues.linkToMission);
                if (parentID) setLocalStorageParentSubMission(newMissionUpdate, parentID);
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
        <form style={MISSION_FORM_STYLES} onSubmit={handleSubmit}>
            <label style={LABEL_INPUT_STYLES}>Name:</label>
            <input 
                name="name" 
                type="text" 
                placeholder="Name" 
                value={formValues.name} 
                onChange={handleChange} 
                maxLength={50}
                autoComplete="off"
                style={LABEL_INPUT_STYLES} />
            <p style={ERROR_STYLES}>{ formErrors.name }</p>
            <label style={LABEL_INPUT_STYLES}>Status:</label>
            <select 
                name="status" 
                id="StatusFilter" 
                defaultValue={formValues.status} 
                onChange={handleChange}
                style={SELECT_STYLES}>
                <option value="default" disabled hidden>
                    Choose a status...
                </option>
                {statusElements}
            </select>
            <p style={ERROR_STYLES}>{ formErrors.status }</p>
            <label style={LABEL_INPUT_STYLES}>Link to mission:</label>
            <select 
                name="linkToMission" 
                defaultValue={mission.parentID === null ? 'default' : mission.parentID} 
                onChange={handleChange} 
                disabled={mission.parentID !== null ? false : hasMissionsForLink}
                style={SELECT_STYLES}>
                {defaultLinkToMissionOption}
                {missionsFitToLinkOptionElements}
            </select>
            <div style={{ marginTop: 20 }}>
                <button style={{...BUTTON_STYLES, paddingRight : 20, paddingLeft: 20}} onClick={handleSubmit} type="submit">Save</button>
                <button style={{...BUTTON_STYLES, backgroundColor : 'rgb(49, 49, 49)'}} onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
};