import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { hasSearchedMission } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions, setMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

interface iMissionRowProps {
    mission: Mission,
    debounceText: string
};

export const MissionRow: React.FC<iMissionRowProps> = ({ mission, debounceText }) => {
    const [showSubMissionList, setShowSubMissionList] = useState(false);
    const [showOptionButtons, setShowOptionButtons] = useState(false);
    const [showArrowButton, setShowArrowButton] = useState(false);
    const [arrowButtonClicked, setArrowButtonClicked] = useState(false);
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissions();
    const showSubMissions = (show: boolean) => {
        setShowSubMissionList(show);
        setArrowButtonClicked(show);
    }
    useEffect(() => {
        setMissionElementWidth(mission.parentID, mission.id);
        const missionsWithSubMissions = getMissionsWithSubMissions(localStorageMissions);
        setLocalStorageMissions(missionsWithSubMissions);
        if (mission.subMissions.length) setShowArrowButton(true);
        else showSubMissions(false);
    }, [mission]);
    useEffect(() => {
        if (debounceText !== '') {
            if (mission.subMissions.length && hasSearchedMission(mission.subMissions, debounceText))
                showSubMissions(true);
            else showSubMissions(false);
        } else showSubMissions(false);
    }, [debounceText, mission]);
    const handleOnMouseEnter = () => setShowOptionButtons(true);
    const handleOnMouseLeave = () => setShowOptionButtons(false);

    return (
        <li className='Mission' id={`Mission-${mission.id}`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {showArrowButton && <ArrowButton 
                setShowSubMissionList={setShowSubMissionList}
                setArrowButtonClicked={setArrowButtonClicked} 
                arrowButtonClicked={arrowButtonClicked}
                mission={mission} />}
            <div className="MissionField name" id="MissionName">{mission.description}</div>
            <div className="MissionInfoField" id="MissionStatus">
                <div id="status">{mission.status}</div>
            </div>
            <div className="MissionField" id="MissionInfo">
                {showOptionButtons && <><EditButton mission={mission} /><DeleteButton mission={mission} /></>}
            </div>
            {showSubMissionList && <SubMissionList 
                setAreButtonsShown={setShowOptionButtons} 
                currentMission={mission} 
                debounceText={debounceText} />}
        </li>
    );
};