import { Mission } from "../Custom-Typings/Mission";

export const getLinkToMissionOptions = (mission: Mission, missions: Array<Mission>): Array<Mission> => {
    let filteredOptionsList = [] as Array<Mission>;
    filteredOptionsList = isChild(mission) ? removeLinkedParentMission(mission, missions) : missions;
    const linkedChildren = filterSelfAndLinkedChildrenMissions(mission);
    return filterChildrenFromMissionList(linkedChildren, filteredOptionsList);
};
const removeLinkedParentMission = (mission: Mission, missions: Array<Mission>) => 
    missions.filter(parentMission => parentMission.id !== mission.parentID);
const isChild = (mission: Mission): boolean => typeof mission.parentID === 'number';
export const filterSelfAndLinkedChildrenMissions = (mission: Mission, linkedChildrenStack: Array<Mission> = []) => {
    const linkedChildren = linkedChildrenStack;
    if (!linkedChildrenStack.includes(mission))
        linkedChildren.push(mission);
    if (mission.subMissions.length > 0)
        mission.subMissions.forEach(subMission => filterSelfAndLinkedChildrenMissions(subMission, linkedChildren));
    return linkedChildren;
};
const filterChildrenFromMissionList = (linkedChildrenMissions: Array<Mission>, missions: Array<Mission>) => 
    missions.filter(mission => !linkedChildrenMissions.includes(mission));