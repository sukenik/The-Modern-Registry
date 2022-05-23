import React from "react";
import createMissionIcon from "../../Assets/add-tasks-g68f2c05f3_640.png";
import { useShowModalContext } from "../Context/ModalContext";

export const CreateMissionButton: React.FC = () => {
    const { setShowMissionModal } = useShowModalContext();
    const handleCreateMissionButtonClick = () => setShowMissionModal(true);

    return (
        <button onClick={handleCreateMissionButtonClick} type="submit" id="CreateMissionButton">
            <img id="CreateMission" src={createMissionIcon} alt="Create a mission button" />
        </button>
    );
};