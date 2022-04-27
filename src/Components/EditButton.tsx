import React from "react";
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';
import { Mission } from "../Custom-Typings/Mission";

interface Props {
    mission: Mission,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditButton: React.FC<Props> = ({mission, setShowEditModal, setShowModal}) => {
    const handleEditButtonClick = () => {
        setShowModal(true);
        setShowEditModal(true);
    }

    // Change context here to current mission

    return (
        <button className="MissionInfoField optionBtn" onClick={handleEditButtonClick}>
            <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
        </button>
    );
};