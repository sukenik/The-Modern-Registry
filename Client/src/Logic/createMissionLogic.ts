import { Mission, MISSION_STATUS } from "../Custom-Typings/Mission";
import { v4 as uuidv4 } from 'uuid'

const getUniqueID = (): number => (Date.now() + Math.random());
const getUUID = (): string => uuidv4()
export const getNewMission = (name: string, status: MISSION_STATUS, linkToMissionID: string | null): Mission => {
    return {
        id: getUUID(),
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID)
    };
};
export const getNewMissionUpdate = (id: string, name: string, status: MISSION_STATUS, linkToMissionID: string | null): 
    Mission => {
    
    return {
        id: id,
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID)
    };
}
export const validateLinkToMission = (linkToMissionID: string | null): null | string => {
    return (linkToMissionID === 'default' || !linkToMissionID) ? null : linkToMissionID
}