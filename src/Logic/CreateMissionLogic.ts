import { Mission } from "../Custom-Typings/Mission";
import { missions } from "../data";

const getUniqueID = (): number => {
    return (Date.now() + Math.random());
};
export const getNewMission = (name: string, status: string, linkToMissionID: string): Mission => {
    return {
        id: getUniqueID(),
        description: name,
        status: status,
        parentID: linkToMissionID === 'default' ? null : parseInt(linkToMissionID),
        subMissions: [] as Array<Mission>
    };
};
const getParentID = (mission: Mission) => mission.parentID;
export const getMissionFromParentID = (parentID: number | null): string => {
    if (parentID === null) return 'default';
    const editMissionParentName = missions.filter(mission => mission.id === parentID)[0].description;
    return editMissionParentName;
};
