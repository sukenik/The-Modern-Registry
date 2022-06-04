import { Mission } from "../Custom-Typings/Mission";

const getUniqueID = (): number => (Date.now() + Math.random());
export const getNewMission = (name: string, status: string, linkToMissionID: string | null | number): Mission => {
    return {
        id: getUniqueID(),
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID),
        subMissions: [] as Array<Mission>
    };
};
export const getNewMissionUpdate = (id: number, name: string, status: string, linkToMissionID: string | null | number, 
    subMissions: Array<Mission>): Mission => {
    return {
        id: id,
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID),
        subMissions: subMissions
    };
}
const getParentID = (mission: Mission) => mission.parentID;
const getMissionNameFromParentID = (parentID: number | null, missions: Array<Mission>): string => {
    if (!parentID) return 'default';
    const editMissionParentName = missions.filter(mission => mission.id === parentID)[0].description;
    return editMissionParentName;
};
export const validateLinkToMission = (linkToMissionID: string | null | number): null | number => {
    if (linkToMissionID === 'default' || !linkToMissionID) return null;
    return (typeof linkToMissionID === 'number' ? linkToMissionID : parseFloat(linkToMissionID));
}