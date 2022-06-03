import { Mission } from "../Custom-Typings/Mission";
import { getMissionFromLocalStorage } from "./localStorageLogic";

const getPrimaryParent = (mission: Mission): Mission =>
    mission.parentID ? 
        getPrimaryParent(getMissionFromLocalStorage(mission.parentID.toString())) :
        mission;
const getUniqueMissionArray = (missions: Array<Mission>) => {
    let uniqueMissionsArray = [] as Array<Mission>;
    let keys = [] as Array<number>;
    missions.forEach(mission => {
        if (!keys.includes(mission.id)) {
            uniqueMissionsArray.push(mission);
            keys.push(mission.id);
        } 
    })
    return uniqueMissionsArray;
};
export const getSelfAndParentMissions = (mission: Mission, linkedParentStack: Array<Mission> = []) => {
    const linkedParents = linkedParentStack;
    if (!linkedParentStack.includes(mission)) {
        linkedParents.push(mission);
    }
    if (mission.parentID) {
        getSelfAndParentMissions(getMissionFromLocalStorage(mission.parentID.toString()), linkedParentStack);
    }
    return linkedParents;
};
export const hasSearchedMission = (subMissions: Array<Mission>, searchString: string): boolean => {
    let foundSearchedMission = false;
    subMissions.forEach(subMission => {
        if (subMission.description.toLowerCase().includes(searchString.toLowerCase())) 
            foundSearchedMission = true;
        else if (!foundSearchedMission && subMission.subMissions.length)
            foundSearchedMission = hasSearchedMission(subMission.subMissions, searchString);
    });
    return foundSearchedMission;
};