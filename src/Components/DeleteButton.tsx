import React, { useState } from "react";
import trashCanIcon from '../../Assets/garbage-g0e5e69325_640.png';
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { removeMissionFromLocalStorage } from "../Logic/localStorageLogic";

interface iDeleteButtonProps {
    mission: Mission
}

export const DeleteButton: React.FC<iDeleteButtonProps> = ({ mission }) => {
    const { setShowDeleteModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMission();
    const handleDeleteButtonClick = () => {
        // Pop a modal - "Are you sure you want to delete {mission.description}?"
        setShowDeleteModal(true);
        setCurrentMission(mission);
        // removeMissionFromLocalStorage(mission.id);
    };

    return (
        <button className="MissionInfoField optionBtn" onClick={handleDeleteButtonClick}>
            <img id="TrashCanIcon" src={trashCanIcon} alt="Delete button" />
        </button>
    );
};