import { Mission } from "../Custom-Typings/Mission";

const getUniqueID = (): number => (Date.now() + Math.random());
export const getNewMission = (name: string, status: string, linkToMissionID: string | null | number): Mission => {
    return {
        id: getUniqueID(),
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID)
    };
};
export const getNewMissionUpdate = (id: number, name: string, status: string, linkToMissionID: string | null | number): Mission => {
    return {
        id: id,
        description: name,
        status: status,
        parentID: validateLinkToMission(linkToMissionID)
    };
}
export const validateLinkToMission = (linkToMissionID: string | null | number): null | number => {
    if (linkToMissionID === 'default' || !linkToMissionID) return null;
    return (typeof linkToMissionID === 'number' ? linkToMissionID : parseFloat(linkToMissionID));
}