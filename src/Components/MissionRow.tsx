import React, { CSSProperties, useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { hasSearchedMission } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions, setMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { SubMissionList } from "./SubMissionList";

const MISSION_STYLES: CSSProperties = {
    backgroundColor: 'rgb(92, 91, 91)',
    color: 'aliceblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: 'var(--width)',
    marginTop: 5
};
const MISSION_INFO_STYLES: CSSProperties = {
    display: 'block',
    width: 85,
    maxHeight: 20,
    order: 4
};
const MISSION_STATUS_STYLES: CSSProperties = {
    flexGrow: 1,
    marginTop: 8,
    marginRight: 0,
    marginBottom: 7,
    marginLeft: 0,
    cursor: 'default',
    order: 3,
    display: 'flex',
    justifyContent: 'flex-end'
};
const STATUS_STYLES: CSSProperties = {
    paddingTop: 2,
    paddingRight: 13,
    paddingBottom: 2,
    paddingLeft: 13,
    backgroundColor: 'rgb(39, 39, 39)'
};
const MISSION_NAME_STYLES: CSSProperties = {
    marginLeft: 20,
    order: 2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 265,
    whiteSpace: 'nowrap',
    cursor: 'default'
};

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
    const renderSubMissionsElement = !!mission.subMissions.length && showSubMissionList;
    const showSubMissions = (show: boolean) => {
        setShowSubMissionList(show);
        setArrowButtonClicked(show);
    };
    useEffect(() => {
        setMissionElementWidth(mission.parentID, mission.id);
        const missionsWithSubMissions = getMissionsWithSubMissions(localStorageMissions);
        setLocalStorageMissions(missionsWithSubMissions);
        if (mission.subMissions.length) setShowArrowButton(true);
        else setShowArrowButton(false);
    }, [mission]);
    useEffect(() => {
        if (debounceText !== '') {
            if (mission.subMissions.length && hasSearchedMission(mission.subMissions, debounceText))
                showSubMissions(true);
            else showSubMissions(false);
        } else showSubMissions(false);
    }, [debounceText]);
    const handleOnMouseEnter = () => setShowOptionButtons(true);
    const handleOnMouseLeave = () => setShowOptionButtons(false);

    return (
        <li 
            style={mission.parentID ? MISSION_STYLES : {...MISSION_STYLES, marginTop: 10}} 
            id={`Mission-${mission.id}`} 
            onMouseEnter={handleOnMouseEnter} 
            onMouseLeave={handleOnMouseLeave}>
            {showArrowButton && <ArrowButton 
                setShowSubMissionList={setShowSubMissionList}
                setArrowButtonClicked={setArrowButtonClicked} 
                arrowButtonClicked={arrowButtonClicked}
                mission={mission} />}
            <div style={MISSION_NAME_STYLES} className="name">{mission.description}</div>
            <div style={MISSION_STATUS_STYLES}>
                <div style={mission.status === 'Active' ? 
                    {...STATUS_STYLES, paddingRight: 26, paddingLeft: 26} : STATUS_STYLES}>
                    {mission.status}</div>
            </div>
            <div style={MISSION_INFO_STYLES}>
                {showOptionButtons && <><EditButton mission={mission} /><DeleteButton mission={mission} /></>}
            </div>
            {renderSubMissionsElement && <SubMissionList 
                setAreButtonsShown={setShowOptionButtons} 
                currentMission={mission} 
                debounceText={debounceText} />}
        </li>
    );
};