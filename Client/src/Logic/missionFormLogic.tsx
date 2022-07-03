import React from "react";
import { Mission, MISSION_STATUS } from "../Custom-Typings/Mission";
import { getNewMission, getNewMissionUpdate } from "./createMissionLogic";
import { getSelfPlusChildrenMissions } from "./filterLinkToMissionFieldLogic";
import { getMissionChildren, hasChildren } from "./helperFunctions";
import { addToLocalStorage, getLocalStorageKeys, getLocalStorageMissions, parseMissionToString, removeFromLocalStorage } from "./localStorageLogic";
import { getMissionsData } from "./subMissionLogic";

export interface iFormFields {
    name?: string,
    status?: string,
    linkToMission?: string | null
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
            <option key={status} value={status} hidden={formValues.status === status}>{status}</option>
        );
};
export const getMissionsToLinkElements = (linkToMissionOptions: Array<Mission>) => 
    linkToMissionOptions.map(mission => 
        <option key={mission.id} value={mission.id}>
            {mission.description}
        </option>
    );
export const getDefaultLinkToMissionElement = (mission: Mission, missions: Array<Mission>) => {
    if (mission.parentId) {
        return (
                <>
                    {getUnlinkOptionElement()} 
                    <option value={mission.parentId} disabled hidden>
                        {getMissionNameByID(mission.parentId, missions)}
                    </option>
                </>
        )
    }
    return (<option value="default" disabled hidden></option>);
};
const getMissionNameByID = (id: string, missions: Array<Mission>) => missions.filter(
    mission => mission.id === id)[0].description;

const getUnlinkOptionElement = () => <option style={{ color: 'red' }} value="default">Unlink from parent</option>;

export const onUpdate = (name: string, status: string, linkToMission: string | null, mission: Mission): Array<Mission> => {
    const newMissionUpdate = getNewMissionUpdate(mission.id, name, status as MISSION_STATUS, linkToMission)
    addToLocalStorage(mission.id.toString(), parseMissionToString(newMissionUpdate))
    return getMissionsData(getLocalStorageMissions(getLocalStorageKeys()))
}
export const onCreate = (name: string, status: string, linkToMission: string | null): Array<Mission> => {
    const newMission = getNewMission(name, status as MISSION_STATUS, linkToMission)
    addToLocalStorage(newMission.id.toString(), parseMissionToString(newMission))
    return getMissionsData(getLocalStorageMissions(getLocalStorageKeys()))
}
export const onDelete = (mission: Mission, missions: Array<Mission>, deleteChildren: boolean) => {
    removeFromLocalStorage(mission.id.toString())
    if (hasChildren(mission.id, missions)) {
        if (deleteChildren) {
            const missionsToDelete = getSelfPlusChildrenMissions(mission, missions)
            missionsToDelete.forEach(childMission => removeFromLocalStorage(childMission.id.toString()))
        } else {
            getMissionChildren(mission.id, missions).forEach(subMission => {
                addToLocalStorage(
                    subMission.id.toString(),
                    parseMissionToString({ ...subMission, parentId: mission.parentId })
                ) 
            })
        }
    }
}