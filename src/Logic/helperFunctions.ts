import { Dispatch, SetStateAction } from "react";
import { defaultMission } from "../Context/CurrentMissionContext";
import { Mission } from "../Custom-Typings/Mission";
import { arrowBorderCSS } from "../Components/ArrowButton";

export const modalAction = (
    setShowModal: Dispatch<SetStateAction<boolean>>, 
    setCurrentMission: Dispatch<SetStateAction<Mission>>, 
    mission?: Mission) => {
        if (mission) {
            setShowModal(true);
            setCurrentMission(mission);
        } else {
            setShowModal(false);
            setCurrentMission(defaultMission);
        }
};
export const setArrowBorder = (missionID: number, isArrowUp: boolean) => {
    const element = document.getElementById(`Mission-${missionID}`)?.querySelector('div');
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
export const getSelfAndLinkedChildrenMissions = (mission: Mission, linkedChildrenStack: Array<Mission> = []) => {
    const linkedChildren = linkedChildrenStack;
    if (!linkedChildrenStack.includes(mission)) linkedChildren.push(mission);
    if (mission.subMissions.length > 0)
        mission.subMissions.forEach(subMission => getSelfAndLinkedChildrenMissions(subMission, linkedChildren));
    return linkedChildren;
};