import { CSSProperties } from "react";
import { arrowBorderCSS } from "../Components/ArrowButton";
import { Mission } from "../Custom-Typings/Mission";
import { addToLocalStorage, getMissionFromLocalStorage, parseMissionToString } from "./localStorageLogic";
import { getSelfAndParentMissions } from "./searchBarLogic";

export const getMissionsWithSubMissions = (missions: Array<Mission>) => {
    const missionsWithSubMissions = missions;
    missionsWithSubMissions.forEach(currentMission => currentMission.subMissions = getMissionSubMissions(currentMission, missions));
    return missionsWithSubMissions;
};
const getMissionSubMissions = (currentMission: Mission, missions: Array<Mission>) => 
    missions.filter(mission => mission.parentID === currentMission.id);
export const setLocalStorageParentSubMission = (subMission: Mission, missionID: number) => {
    const parentMission = getMissionFromLocalStorage(missionID.toString());
    parentMission.subMissions.push(subMission);
    addToLocalStorage(missionID.toString(), parseMissionToString(parentMission));
};
export const unlinkLocalStorageParentSubMission = (subMissionID: number, parentID: number) => {
    const parentMission = getMissionFromLocalStorage(parentID.toString());
    parentMission.subMissions = parentMission.subMissions.filter(mission => mission.id !== subMissionID);
    addToLocalStorage(parentID.toString(), parseMissionToString(parentMission));
};
export const setArrowBorder = (missionID: number, isArrowUp: boolean) => {
    const element = document.getElementById(`Mission-${missionID}`)?.querySelector('div')?.querySelector('div');
    if (element) {
        if (isArrowUp) {
            element.style.borderBottom = arrowBorderCSS;
            element.style.borderTop = '0'; 
        } else {
            element.style.borderTop = arrowBorderCSS;
            element.style.borderBottom = '0';
        }
    }
};
export const getMissionsData = (missions: Array<Mission>, debounceText?: string) => {
    if (!debounceText) return setHasChildren(missions)
    const searchResults: Array<Mission> = missions.filter(
        mission => mission.description.toLowerCase().includes(debounceText.toLowerCase())
    )
    const missionTrees: Array<Array<Mission>> = searchResults.map(mission => getSelfAndParentMissions(mission))

    return setHasChildren(missionTrees.reduce((accum, iterator) => {                
        iterator.forEach(mission => {
            if (!accum.some(am => am.id === mission.id)) accum.push(mission)
        })
        return accum
    }, [] as Array<Mission>))
}
export const getMissionWidth = (css: CSSProperties, level: number) => {
    const missionWidthPixelMinimum = 380;
    if (level >= 6) return {...css, width: missionWidthPixelMinimum};
    const primaryWidth = 530;
    return {...css, width: primaryWidth - level * 25} as CSSProperties
}
export const getSubMissionPadding = (css: CSSProperties, level: number) => {
    if (level >= 7) return {...css, paddingLeft: 0} as CSSProperties
    return css
}
const setHasChildren = (missions: Array<Mission>) => {
    return missions.map((mission) => ({
        ...mission,
        hasChildren: missions.filter(m => m.parentID === mission.id).length > 0
    }))
}