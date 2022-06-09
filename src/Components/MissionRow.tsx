import React, { CSSProperties, MouseEventHandler, useEffect, useState } from "react";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { hasSearchedMission } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions, getMissionWidth, setMissionElementWidth } from "../Logic/subMissionLogic";
import { ArrowButton } from "./ArrowButton";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { MISSION_LIST_STYLES } from "./MissionList";
import { SubMissionList, SUB_MISSION_LIST_STYLES } from "./SubMissionList";

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
const LIST_ITEM_STYLE: CSSProperties = {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
}

interface iMissionRowProps {
    mission: Mission,
    debounceText?: string,
    level: number
};

export const MissionRow: React.FC<iMissionRowProps> = ({ mission, children, level }) => {
    const [showSubMissionList, setShowSubMissionList] = useState(false);
    const [showOptionButtons, setShowOptionButtons] = useState(false);
    const [showArrowButton, setShowArrowButton] = useState(false);
    const [arrowButtonClicked, setArrowButtonClicked] = useState(false);
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissionsContext();
    const { debounceText } = useFilteringContext()

    useEffect(() => mission.hasChildren ? setShowArrowButton(true) : setShowArrowButton(false), [mission])
    // const renderSubMissionsElement = !!subMissions.length && showSubMissionList;
    const showSubMissions = (show: boolean) => {
        setShowSubMissionList(show);
        setArrowButtonClicked(show);
    };
    // useEffect(() => {
    //     // setMissionElementWidth(mission.parentID, mission.id);
    //     const missionsWithSubMissions = getMissionsWithSubMissions(localStorageMissions);
    //     setLocalStorageMissions(missionsWithSubMissions);
    //     if (subMissions.length) setShowArrowButton(true);
    //     else setShowArrowButton(false);
    // }, [mission]);
    // useEffect(() => {
    //     if (debounceText !== '') {
    //         if (subMissions.length && hasSearchedMission(subMissions, debounceText))
    //             showSubMissions(true);
    //         else showSubMissions(false);
    //     } else showSubMissions(false);
    // }, [debounceText]);
    const handleOnMouseEnter = () => setShowOptionButtons(true);
    const handleOnMouseLeave = () => setShowOptionButtons(false);
    
    return (
            <li 
                key={mission.id}
                style={LIST_ITEM_STYLE} 
                id={`Mission-${mission.id}`}
            >
                <div 
                    style={mission.parentID ? 
                        getMissionWidth(MISSION_STYLES, level) : 
                        getMissionWidth({...MISSION_STYLES, marginTop: 10}, level)
                    }
                    onMouseEnter={handleOnMouseEnter} 
                    onMouseLeave={handleOnMouseLeave}
                >
                    {showArrowButton &&
                        <ArrowButton
                            setShowSubMissionList={setShowSubMissionList}
                            setArrowButtonClicked={setArrowButtonClicked}
                            arrowButtonClicked={arrowButtonClicked}
                            mission={mission}
                        />
                    }
                    <div style={MISSION_NAME_STYLES} className="name">{mission.description}</div>
                    <div style={MISSION_STATUS_STYLES}>
                        <div 
                            style={mission.status === 'Active' ? 
                                {...STATUS_STYLES, paddingRight: 26, paddingLeft: 26} : 
                                STATUS_STYLES
                            }
                        >
                            {mission.status}
                        </div>
                    </div>
                    <div style={MISSION_INFO_STYLES}>
                        {showOptionButtons && <><EditButton mission={mission} /><DeleteButton mission={mission} /></>}
                    </div>
                </div>
                {showSubMissionList && children}
        </li>
    );
};