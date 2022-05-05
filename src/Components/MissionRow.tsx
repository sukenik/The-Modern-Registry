import React, { useEffect, useState } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { setMissionElementWidth, setPrimaryMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

interface Props {
    mission: Mission,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionRow: React.FC<Props> = ({ mission, setShowModal }) => {    
    const [isSubMissionListShown, setIsSubMissionListShown] = useState(false);
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const handleOnMouseEnter = () => setAreButtonsShown(true);
    const handleOnMouseLeave = () => setAreButtonsShown(false);
    useEffect(() => {
        setMissionElementWidth(mission.parentID, mission.id);
    });

    return (
        <li 
            className='Mission'
            id={`Mission-${mission.id}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <ArrowButton setIsSubMissionListShown={setIsSubMissionListShown} />
            <div className="MissionField" id="MissionName">{mission.description}</div>
            <div className="MissionInfoField" id="MissionStatus">
                <div id="status">{mission.status}</div>
            </div>
            <div className="MissionField" id="MissionInfo">
                {areButtonsShown && <><EditButton mission={mission} /><DeleteButton /></>}
            </div>
            {isSubMissionListShown && 
                <SubMissionList
                    subMissions={mission.subMissions}
                    setShowModal={setShowModal}
                    setAreButtonsShown={setAreButtonsShown} />}
        </li>
    );
};