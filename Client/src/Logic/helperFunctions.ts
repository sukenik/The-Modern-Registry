import { Dispatch, SetStateAction } from "react";
import { defaultMission } from "../Context/CurrentMissionContext";
import { Mission } from "../Custom-Typings/Mission";

export interface iModalActionParams {
    setShowModal: Dispatch<SetStateAction<boolean>>, 
    setCurrentMission: Dispatch<SetStateAction<Mission>>, 
    mission?: Mission,
    setIsDelete?: React.Dispatch<React.SetStateAction<boolean>>
}

export const modalAction = ({ setShowModal, setCurrentMission, mission, setIsDelete }: iModalActionParams) => {
    if (mission) {
        setShowModal(true)
        setCurrentMission(mission)
        if (setIsDelete) setIsDelete(true) 
    } else {
        setShowModal(false)
        setCurrentMission(defaultMission)
        if (setIsDelete) setIsDelete(false) 
    }
}
export const getMissionChildren = (missionID: string, missions: Array<Mission>): Array<Mission> => 
    missions.filter(mission => mission.parentId === missionID)
export const hasChildren = (missionID: string, missions: Array<Mission>): boolean =>
    !!getMissionChildren(missionID, missions).length