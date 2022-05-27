import { Dispatch, SetStateAction } from "react";
import { defaultMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";

export const modalAction = 
    (setShowModal: Dispatch<SetStateAction<boolean>>, setCurrentMission: Dispatch<SetStateAction<Mission>>, mission?: Mission) => {
        if (mission) {
            setShowModal(true);
            setCurrentMission(mission);
        } else {
            setShowModal(false);
            setCurrentMission(defaultMission);
        }
    }