import React from "react";
import createMissionIcon from "../../Assets/add-tasks-g68f2c05f3_640.png";

interface Props {

};

export const CreateMission: React.FC<Props> = () => {
    return (
        <button type="submit" id="CreateMissionButton">
            <img id="CreateMission" 
                src={createMissionIcon} 
                alt="Create a mission button" />
        </button>
    );
};