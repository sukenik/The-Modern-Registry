import { Mission } from "../Custom-Typings/Mission";
import { getMissionFromLocalStorage } from "./localStorageLogic";

export const getSelfAndParentMissions = (mission: Mission, linkedParentStack: Array<Mission> = [], dbMissions?: Array<Mission>) => {
    const linkedParents = linkedParentStack

    if (!linkedParentStack.includes(mission)) {
        linkedParents.push(mission)
    }
    if (mission.parentId) {
        dbMissions ?
            getSelfAndParentMissions(dbMissions.filter(dbMission => mission.parentId === dbMission.id)[0], linkedParentStack, dbMissions) :
            getSelfAndParentMissions(getMissionFromLocalStorage(mission.parentId), linkedParentStack)
    }

    return linkedParents;
};