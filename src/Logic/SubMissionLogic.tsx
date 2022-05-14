import { Mission } from "../Custom-Typings/Mission";

export const getMissionsWithSubMissions = (missions: Array<Mission>) => {
    const missionsWithSubMissions = missions;
    missionsWithSubMissions.forEach(currentMission => currentMission.subMissions = getMissionSubMissions(currentMission, missions));
    return missionsWithSubMissions;
};
const getMissionSubMissions = (currentMission: Mission, missions: Array<Mission>) => 
    missions.filter(mission => mission.parentID === currentMission.id);
export const setMissionElementWidth = (parentMissionID: number | null, missionID: number) => {
    if (parentMissionID === null) return setPrimaryMissionWidth(missionID);
    const missionPixelWidthMinimum = 380;
    const parentMissionElement = document.getElementById(`Mission-${parentMissionID}`) as HTMLElement;
    const missionElement = document.getElementById(`Mission-${missionID}`) as HTMLElement;
    const parentWidthPixelNum = getParentMissionWidthPixelNum(parentMissionElement);
    let missionElementWidth: string;
    
    if (parentWidthPixelNum === missionPixelWidthMinimum) {
        missionElementWidth = setMinimalMissionElementWidth(missionElement, missionPixelWidthMinimum);
        if (missionElement.parentElement) {
            setSubMissionElementPadding(missionElement.parentElement, '0');
        }
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
const setSubMissionElementPadding = (subMissionElement: HTMLElement, padding: string) => 
    subMissionElement.style.padding = padding;
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