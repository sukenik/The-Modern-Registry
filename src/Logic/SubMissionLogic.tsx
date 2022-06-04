import { Mission } from "../Custom-Typings/Mission";
import { validateLinkToMission } from "./createMissionLogic";
import { addToLocalStorage, getMissionFromLocalStorage, parseMissionToString } from "./localStorageLogic";

export const getMissionsWithSubMissions = (missions: Array<Mission>) => {
    const missionsWithSubMissions = missions;
    missionsWithSubMissions.forEach(currentMission => currentMission.subMissions = getMissionSubMissions(currentMission, missions));
    return missionsWithSubMissions;
};
const getMissionSubMissions = (currentMission: Mission, missions: Array<Mission>) => 
    missions.filter(mission => mission.parentID === currentMission.id);
export const setMissionElementWidth = (parentMissionID: number | null, missionID: number) => {
    if (!parentMissionID) return setPrimaryMissionWidth(missionID);
    const missionWidthPixelMinimum = 380;
    const parentMissionElement = document.getElementById(`Mission-${parentMissionID}`) as HTMLElement;
    const missionElement = document.getElementById(`Mission-${missionID}`) as HTMLElement;
    const parentWidthPixelNum = getParentMissionWidthPixelNum(parentMissionElement);
    let missionElementWidth: string;
    
    if (parentWidthPixelNum === missionWidthPixelMinimum) {
        missionElementWidth = setMinimalMissionElementWidth(missionElement, missionWidthPixelMinimum);
        setSubMissionElementPadding(missionElement, '0');
    }
    else {
        missionElementWidth = setMissionElementWidthRelativeToParent(missionElement, parentWidthPixelNum);
    }
    const missionName = getMissionNameElement(missionElement);
    setMissionNameMaxWidthRelativeToMissionWidth(missionName, missionElementWidth);
};
const setPrimaryMissionWidth = (missionID: number) => {
    const missionElement = document.getElementById(`Mission-${missionID}`) as HTMLElement;
    missionElement.style.width = getGlobalMissionElementWidth();
};
const getGlobalMissionElementWidth = () => window.getComputedStyle(document.body).getPropertyValue('--width');
const setElementPadding = (element: HTMLElement, padding: string) => 
    element.style.padding = padding;
const getMissionNameElement = (missionElement: HTMLElement) => 
    missionElement.getElementsByClassName('name')[0] as HTMLElement;
const setMinimalMissionElementWidth = (missionElement: HTMLElement, missionPixelWidthMinimum: number) => 
    missionElement.style.width = missionPixelWidthMinimum + 'px';
const setMissionElementWidthRelativeToParent = (missionElement: HTMLElement, parentMissionWidthPixelNum: number) => 
    missionElement.style.width = parentMissionWidthPixelNum - 30 + 'px';
const setMissionNameMaxWidthRelativeToMissionWidth = (missionNameElement: HTMLElement, missionElementWidth: string) => 
    missionNameElement.style.maxWidth = (parseInt(missionElementWidth) / 3) + 'px';
const getParentMissionWidthPixelNum = (parentMissionElement: HTMLElement): number =>
    parseInt(getComputedStyle(parentMissionElement).getPropertyValue('width').split('px')[0]);
const setSubMissionElementPadding = (missionElement: HTMLElement, padding: string) => {
    if (missionElement.parentElement) setElementPadding(missionElement.parentElement, padding);
}
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