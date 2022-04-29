import React from "react";
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';
import { Mission } from "../Custom-Typings/Mission";
import { useCurrentMission } from '../Context/MissionContext';
import { useShowModalContext } from "../Context/ModalContext";

interface Props {
    mission: Mission,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditButton: React.FC<Props> = ({mission, setShowEditModal}) => {
    const { setShowModal } = useShowModalContext();
    const { setCurrentMission } = useCurrentMission();

    const handleEditButtonClick = () => {
        setShowModal(true);
        setShowEditModal(true);
        setCurrentMission(mission);
    }

    return (
        <button className="MissionInfoField optionBtn" onClick={handleEditButtonClick}>
            <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
        </button>
    );
};