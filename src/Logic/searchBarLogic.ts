import { Mission } from "../Custom-Typings/Mission";
import { getMissionFromLocalStorage } from "./localStorageLogic";

const getPrimaryParent = (mission: Mission): Mission =>
    mission.parentID ? 
        getPrimaryParent(getMissionFromLocalStorage(mission.parentID.toString())) :
        mission;
export const getSelfAndParentMissions = (mission: Mission, linkedParentStack: Array<Mission> = []) => {
    const linkedParents = linkedParentStack;
    if (!linkedParentStack.includes(mission))
        linkedParents.push(mission);
    if (mission.parentID) 
        getSelfAndParentMissions(getMissionFromLocalStorage(mission.parentID.toString()), linkedParentStack);
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