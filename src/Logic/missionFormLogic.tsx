import React from "react";
import { Mission } from "../Custom-Typings/Mission";
import { getNewMission, getNewMissionUpdate, validateLinkToMission } from "./createMissionLogic";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString } from "./localStorageLogic";
import { getMissionsWithSubMissions, setLocalStorageParentSubMission, unlinkLocalStorageParentSubMission } from "./subMissionLogic";

export interface iFormFields {
    name?: string,
    status?: string,
    linkToMission?: string | null | number
};
export const validateFormFields = (values: iFormFields) => {
    const errors = {} as iFormFields;
    const regex = /\bActive\b|\bComplete\b/;
    if (!values.name) {
        errors.name = 'Name is required!';
    }
    if (!values.status) {
        errors.status = 'Status is required!';
    } else if (!regex.test(values.status)) {
        errors.status = 'This is not a valid status';
    }
    return errors;
};
export const getStatusElements = (modalType: string, formValues: iFormFields) => {
    return modalType === 'Create' ? 
        ['Active', 'Complete'].map(status => <option key={status} value={status}>{status}</option>) : 
        ['Active', 'Complete'].map(status => 
            <option key={status} value={status} hidden={formValues.status === status}>{status}</option>);
};
export const getMissionsToLinkElements = (linkToMissionOptions: Array<Mission>) => 
    linkToMissionOptions.map(mission => <option key={mission.id} value={mission.id}>
            {mission.description}
        </option>);
export const getDefaultLinkToMissionElement = (mission: Mission, missions: Array<Mission>) => {
    if (mission.parentID) {
        return (<>{getUnlinkOptionElement()} <option value={mission.parentID} disabled hidden>
            {getMissionNameByID(mission.parentID, missions)}
        </option></>)
    }
    return (<option value="default" disabled hidden></option>);
};
const getMissionNameByID = (id: number, missions: Array<Mission>) => missions.filter(
    mission => mission.id === id)[0].description;
const getUnlinkOptionElement = () => <option style={{ color: 'red' }} value="default">Unlink from parent</option>;

export const onUpdate = (name: string, status: string, linkToMission: string | number | null, mission: Mission): Array<Mission> => {
    if (linkToMission && mission.parentID) unlinkLocalStorageParentSubMission(mission.id, mission.parentID);
    const newMissionUpdate = getNewMissionUpdate(mission.id, name, status, linkToMission, mission.subMissions);
    const parentID = validateLinkToMission(linkToMission);
    if (parentID) setLocalStorageParentSubMission(newMissionUpdate, parentID);
    addToLocalStorage(mission.id.toString(), parseMissionToString(newMissionUpdate));
    return getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
}
export const onCreate = (name: string, status: string, linkToMission: string | number | null): Array<Mission> => {
    const newMission = getNewMission(name, status, linkToMission);
    const parentID = validateLinkToMission(linkToMission);
    if (parentID) setLocalStorageParentSubMission(newMission, parentID);
    addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission));
    return getMissionsWithSubMissions(getLocalStorageMissions(getLocalStorageKeys()));
}