import { Dispatch, SetStateAction } from "react";
import { defaultMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";

export const closeModal = (setShowModal: Dispatch<SetStateAction<boolean>>, setCurrentMission: Dispatch<SetStateAction<Mission>>) => {
    setShowModal(false);
    setCurrentMission(defaultMission);
};