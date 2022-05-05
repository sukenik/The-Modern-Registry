import React, { ReactElement } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { MissionRow } from "../Components/MissionRow";
import { addToLocalStorage, parseMissionToString } from "./localStorageLogic";

export const divideSubMissionToParentMission = (missions: Array<Mission>) => {
    missions.forEach(
        currentMission => { 
            currentMission.subMissions = missions.filter(mission => mission.parentID === currentMission.id)
            addToLocalStorage(currentMission.id.toString(), parseMissionToString(currentMission));
    });
};
export const setMissionElementWidth = (parentMissionID: number | null, missionID: number) => {
    const parentMissionElement = document.getElementById(`Mission-${parentMissionID}`);
    const missionElement = document.getElementById(`Mission-${missionID}`);
    if (parentMissionElement) {
        const widthPixelNum = getParentMissionWidthPixelNum(parentMissionElement);
        if (missionElement) {
            missionElement.style.width = widthPixelNum - 30 + 'px';
        }
    }
};
const getParentMissionWidthPixelNum = (parentMissionElement: HTMLElement): number => {
    return parseInt(getComputedStyle(parentMissionElement).getPropertyValue('width').split('px')[0]);
};
export const setPrimaryMissionElementWidth = (missionID: number) => {
    const globalWidth = getComputedStyle(document.body).getPropertyValue('--width').split(' ')[1];
    const missionElement = document.getElementById(`Mission-${missionID}`);
    if (missionElement) missionElement.style.width = globalWidth;
}
export const getSubMissionComponentList = (subMissions: Mission[],
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>): Array<ReactElement> => {
    const subMissionComponentList: Array<ReactElement> = [];
    subMissions.forEach(subMission => {
        subMissionComponentList.push(
            <MissionRow
                key={subMission.id}
                mission={subMission}
                setShowModal={setShowModal} />
        )
    });
    return subMissionComponentList;
};