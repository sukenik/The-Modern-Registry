import { Mission } from "../Custom-Typings/Mission";
import { missions } from "../data";

export const getLinkToMissionOptions = (missionID: number): Array<Mission> => {
    const currentMission = missions.filter(mission => mission.id === missionID)[0];
    let filteredOptionsList = [] as Array<Mission>;

    if (isGrandparent(currentMission)) return [];
    filteredOptionsList = isChild(currentMission) ?
        removeLinkedParentMission(currentMission) : missions;
    filteredOptionsList = filterLinkMissionToItself(filteredOptionsList, missionID);
    if (isParent(currentMission)) 
        return filteredOptionsList.filter(mission => typeof mission.parentID !== 'number');
    filteredOptionsList = filterLowestHierarchyMissions(filteredOptionsList);
    return filterParentSubMissions(filteredOptionsList, missionID);
};
const filterLowestHierarchyMissions = (missions: Array<Mission>): Array<Mission> => {
    const lowestHierarchyMissions = [] as Array<Mission>;
    missions.forEach(
        mission => mission.subMissions.length > 0 ?
            mission.subMissions.forEach(
                subMission => subMission.subMissions.length > 0 ?
                    subMission.subMissions.forEach(
                        subSubMission => lowestHierarchyMissions.push(subSubMission)
                    )
                    : null
            )
            : null
    );
    return missions.filter(mission => !lowestHierarchyMissions.includes(mission));
};
const filterLinkMissionToItself = (missions: Array<Mission>, missionID: number): Array<Mission> => 
    missions.filter(mission => mission.id !== missionID);
const filterParentSubMissions = (missions: Array<Mission>, missionID: number): Array<Mission> => 
    missions.filter(mission => mission.parentID !== missionID);
const isGrandparent = (mission: Mission): boolean => {
    let hasSubSubMissions = false;
    if (mission.subMissions.length > 0)
        hasSubSubMissions = mission.subMissions.some(subMission => isParent(subMission));
    return hasSubSubMissions;
};
const isParent = (mission: Mission): boolean => mission.subMissions.length > 0;
const removeLinkedParentMission = (mission: Mission) => 
    missions.filter(parentMission => parentMission.id !== mission.parentID);
const isChild = (mission: Mission): boolean => typeof mission.parentID === 'number';
export const getLinkToNewMissionOptions = () => filterLowestHierarchyMissions(missions);