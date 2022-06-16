import { Mission } from "../Custom-Typings/Mission";
import { getMissionChildren } from "./helperFunctions";

export const getLinkToMissionOptions = (mission: Mission, missions: Array<Mission>): Array<Mission> => {
    const filteredOptionsList = isChild(mission) ? removeLinkedParentMission(mission, missions) : missions
    const linkedChildren = getSelfPlusChildrenMissions(mission, missions)
    return filterChildrenFromMissionList(linkedChildren, filteredOptionsList)
}
const removeLinkedParentMission = (mission: Mission, missions: Array<Mission>) => 
    missions.filter(parentMission => parentMission.id !== mission.parentID)

const isChild = (mission: Mission): boolean => typeof mission.parentID === 'number'

const filterChildrenFromMissionList = (linkedChildrenMissions: Array<Mission>, missions: Array<Mission>) => 
    missions.filter(mission => !linkedChildrenMissions.some(linkedChild => linkedChild.id === mission.id))

export const getSelfPlusChildrenMissions = (mission: Mission, missions: Array<Mission>, linkedChildrenStack: Array<Mission> = []): 
    Array<Mission> => {
    
    const linkedChildren = linkedChildrenStack
    if (!linkedChildrenStack.includes(mission)) {
        linkedChildren.push(mission)
    }
    if (mission.hasChildren) {
        getMissionChildren(mission.id, missions).forEach(
             childMission => getSelfPlusChildrenMissions(childMission, missions, linkedChildren)
        )
    } else {
        if (!linkedChildren.includes(mission)) linkedChildren.push(mission)
    }
    
    return linkedChildren
}