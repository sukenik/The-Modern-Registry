import { Mission } from "../Custom-Typings/Mission";
import { getMissionFromLocalStorage } from "./localStorageLogic";

const getPrimaryParent = (mission: Mission): Mission =>
    mission.parentId ? 
        getPrimaryParent(getMissionFromLocalStorage(mission.parentId.toString())) :
        mission;
export const getSelfAndParentMissions = (mission: Mission, linkedParentStack: Array<Mission> = []) => {
    const linkedParents = linkedParentStack;
    if (!linkedParentStack.includes(mission))
        linkedParents.push(mission);
    if (mission.parentId) 
        getSelfAndParentMissions(getMissionFromLocalStorage(mission.parentId.toString()), linkedParentStack);
    return linkedParents;
};