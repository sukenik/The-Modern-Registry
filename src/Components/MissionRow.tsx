import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getMissionsWithSubMissions, setMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

interface iMissionRowProps {
    mission: Mission
};

export const MissionRow: React.FC<iMissionRowProps> = ({ mission }) => {
    const [showSubMissionList, setShowSubMissionList] = useState(false);
    const [showOptionButtons, setShowOptionButtons] = useState(false);
    const [showArrowButton, setShowArrowButton] = useState(false);
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissions();
    useEffect(() => {
        setMissionElementWidth(mission.parentID, mission.id);
        const missionsWithSubMissions = getMissionsWithSubMissions(localStorageMissions);
        setLocalStorageMissions(missionsWithSubMissions);
        mission.subMissions.length ? setShowArrowButton(true) : setShowArrowButton(false);
    }, [mission]);
    const handleOnMouseEnter = () => setShowOptionButtons(true);
    const handleOnMouseLeave = () => setShowOptionButtons(false);
    const isSubMissionListShown = showSubMissionList && !!mission.subMissions.length;

    return (
        <li 
            className='Mission'
            id={`Mission-${mission.id}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            {showArrowButton && <ArrowButton setShowSubMissionList={setShowSubMissionList} />}
            <div className="MissionField name" id="MissionName">{mission.description}</div>
            <div className="MissionInfoField" id="MissionStatus">
                <div id="status">{mission.status}</div>
            </div>
            <div className="MissionField" id="MissionInfo">
                {showOptionButtons && <><EditButton mission={mission} /><DeleteButton mission={mission} /></>}
            </div>
            {isSubMissionListShown && <SubMissionList setAreButtonsShown={setShowOptionButtons} currentMission={mission} />}
        </li>
    );
};