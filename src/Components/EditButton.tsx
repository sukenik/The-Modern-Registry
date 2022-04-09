import React from "react";
import pencilIcon from '../../Assets/pencil-gef11d3429_640.png';

interface Props {
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const EditButton: React.FC<Props> = ({setShowEditModal, setShowModal}) => {
    const handleEditButtonClick = () => {
        setShowModal(true);
        setShowEditModal(true);
    }

    return (
        <button className="MissionInfoField optionBtn" onClick={handleEditButtonClick}>
            <img id="PencilIcon" src={pencilIcon} alt="Edit button" />
        </button>
    );
};