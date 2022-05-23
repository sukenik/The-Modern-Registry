import React from "react";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";

interface iDeleteButtonProps {
    mission: Mission
};

export const DeleteButton: React.FC<iDeleteButtonProps> = ({ mission }) => {
    const { setShowDeleteModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMission();
    const handleDeleteButtonClick = () => {
        setShowDeleteModal(true);
        setCurrentMission(mission);
    };

    return (
        <button className="MissionInfoField optionBtn" onClick={handleDeleteButtonClick}>
            <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
        </button>
    );
};