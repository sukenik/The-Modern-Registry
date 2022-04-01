import React from "react";
import createMissionIcon from "../../Assets/add-tasks-g68f2c05f3_640.png";

interface Props {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
};

export const CreateMissionButton: React.FC<Props> = ({setShow}) => {
    return (
        <button 
            onClick={() => setShow(true)}
            type="submit" 
            id="CreateMissionButton">
            <img id="CreateMission" 
                src={createMissionIcon} 
                alt="Create a mission button" />
        </button>
    );
};