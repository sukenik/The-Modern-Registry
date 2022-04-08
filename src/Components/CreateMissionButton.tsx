import React from "react";
import createMissionIcon from "../../Assets/add-tasks-g68f2c05f3_640.png";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const CreateMissionButton: React.FC<Props> = ({setShowModal, setShowEditModal}) => {
    const handleCreateMissionButtonClick = () => {
        setShowEditModal(false);
        setShowModal(true);
    }

    return (
        <button 
            onClick={handleCreateMissionButtonClick}
            type="submit" 
            id="CreateMissionButton">
            <img id="CreateMission" 
                src={createMissionIcon} 
                alt="Create a mission button" />
        </button>
    );
};