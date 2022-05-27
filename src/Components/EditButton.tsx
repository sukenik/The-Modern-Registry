import React from "react";
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';
import { Mission } from "../Custom-Typings/Mission";
import { useCurrentMission } from '../Context/MissionContext';
import { useShowModalContext } from "../Context/ModalContext";
import { openModalWithMission } from "../Logic/helperFunctions";

interface iEditButtonProps {
    mission: Mission,
};

export const EditButton: React.FC<iEditButtonProps> = ({ mission }) => {
    const { setShowMissionModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMission();
    const handleEditButtonClick = () => openModalWithMission(setShowMissionModal, setCurrentMission, mission);

    return (
        <button className="MissionInfoField optionBtn" onClick={handleEditButtonClick}>
            <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
        </button>
    );
};