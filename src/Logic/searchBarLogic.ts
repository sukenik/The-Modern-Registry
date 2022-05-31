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
        console.log(getMissionFromLocalStorage(mission.parentID.toString()));
        getSelfAndParentMissions(getMissionFromLocalStorage(mission.parentID.toString()), linkedParentStack);
    }
    return linkedParents;
};