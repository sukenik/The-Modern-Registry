import React from "react";
import { Mission } from "../../../Entities/Mission";
import { getSelfPlusChildrenMissions } from "./filterLinkToMissionFieldLogic";
import { getMissionChildren, hasChildren } from "./helperFunctions";
import { getMissionsData } from "./subMissionLogic";

export interface iFormFields {
    name?: string,
    status?: string,
    linkToMission?: string | null
};
export const validateFormFields = (values: iFormFields) => {
    const errors = {} as iFormFields
    const regex = /\bActive\b|\bComplete\b/

    if (!values.name) {
        errors.name = 'Name is required!'
    }
    if (!values.status) {
        errors.status = 'Status is required!'
    } else if (!regex.test(values.status)) {
        errors.status = 'This is not a valid status'
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

export const dbDelete = (mission: Mission, missions: Array<Mission>, deleteChildren: boolean) => {
    
    if (hasChildren(mission.id, missions)) {
        if (deleteChildren) {
            const missionsIdsToDelete = getSelfPlusChildrenMissions(mission, missions)
                .filter(deleteMission => mission.id !== deleteMission.id).map(mission => mission.id)
            // useDeleteMissionChildren(missionsIdsToDelete)
        } else {
            // usePassMissionParent(mission.id, mission.parentId)
        }
    }
    // useDeleteMission(mission.id)
}

export const clientDelete = (mission: Mission, missions: Array<Mission>, deleteChildren: boolean): Array<Mission> => {
    if (hasChildren(mission.id, missions)) {
        if (deleteChildren) {

            const missionsIdsToDelete = getSelfPlusChildrenMissions(mission, missions).map(mission => mission.id)
            return getMissionsData(missions.filter(missionToKeep => !missionsIdsToDelete.includes(missionToKeep.id)))

        } else {
            const childMissionIds = getMissionChildren(mission.id, missions).map(subMission => subMission.id)

            return getMissionsData(missions.reduce((accum, missionToKeep) => {
                if (childMissionIds.some(childMissionId => missionToKeep.id === childMissionId)) {
                    accum.push({ ...missionToKeep, parentId: mission.parentId })
                } 
                else if (missionToKeep.id !== mission.id) {
                    accum.push(missionToKeep)
                }

                return accum
            }, [] as Array<Mission>))
        }
    } else {
        return getMissionsData(missions.filter(missionToKeep => missionToKeep.id !== mission.id))
    }
}