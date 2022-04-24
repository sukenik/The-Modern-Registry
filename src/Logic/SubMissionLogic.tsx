import React, { ReactElement } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { missions } from "../data";
import { MissionRow } from "../Components/MissionRow";

export const divideSubMissionToParentMission = () => {
    missions.forEach(
        currentMission => currentMission.subMissions = missions.filter(
            mission => mission.parentID === currentMission.id
        )
    );
};
export const setMissionElementWidth = (parentMissionID: number, missionID: number) => {
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
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>, 
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>): Array<ReactElement> => {
    const subMissionComponentList: Array<ReactElement> = [];
    subMissions.forEach(subMission => {
        subMissionComponentList.push(
            <MissionRow
                key={subMission.id}
                id={subMission.id}
                description={subMission.description}
                status={subMission.status}
                parentID={subMission.parentID}
                subMissions={subMission.subMissions}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        )
    });
    return subMissionComponentList;
};
// TODO: Make this readable A$AP :)
export const getMissionsExceptLowestHierarchy = () => {
    const missionsFitLink = missions;
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
    )
    return missionsFitLink.filter(mission => !lowestHierarchyMissions.includes(mission));
} 
export const getLinkToMissionOptions = (missionID: number) => {
    const missionsToLink = missions.filter(mission => mission.id !== missionID);
    console.log(missionsToLink);
}
export const filterParentSubMissionsFromLink = (missions: Array<Mission>, missionID: number) => {
    const subMissionToRemove = missions.filter(mission => mission.parentID === missionID);
    subMissionToRemove.forEach(
        subMission => subMission.subMissions.forEach(
            subSubMission => subMissionToRemove.push(subSubMission)
        )
    );
    console.log(subMissionToRemove);
}