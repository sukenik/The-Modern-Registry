import React, { CSSProperties, useEffect, useState } from "react";
import { useArrowButtonClick } from "../Context/ArrowButtonClickContext";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsData, getMissionsWithSubMissions, getSubMissionPadding } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";
import { SUB_MISSION_LIST_STYLES } from "./SubMissionList";

export const MISSION_LIST_STYLES: CSSProperties = {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    marginTop: 0
};

interface iMissionListProps {
    missionsData: Array<Mission>,
    parentID?: number,
    level?: number,
    setAreButtonsShown?: React.Dispatch<React.SetStateAction<boolean>>,
};

export const MissionList: React.FC<iMissionListProps> = ({ 
        missionsData, 
        parentID = null, 
        level = 0, 
        setAreButtonsShown }) => {
    
    const { localStorageMissions } = useLocalStorageMissionsContext();
    const [missions, setMissions] = useState(localStorageMissions);
    const { debounceText } = useFilteringContext()
    const { arrowButtonClicked } = useArrowButtonClick();
    const renderMissions = missionsData.filter(mission => mission.parentID === parentID)
    if (!renderMissions.length) return null

    // useEffect(() => {
    //     if (!debounceText) return setMissions(localStorageMissions.filter(mission => !mission.parentID));
    //     let searchResults: Array<Mission> = localStorageMissions.filter(
    //         mission => mission.description.toLowerCase().includes(debounceText.toLowerCase()));
    //     const missionTrees = searchResults.map(mission => getSelfAndParentMissions(mission));
    //     const finalMissionList = [] as Array<Mission>;
    //     missionTrees.forEach((missionList) => {missionList.forEach(mission => {
    //             if (!finalMissionList.some(finalMission => mission.id === finalMission.id))
    //                 finalMissionList.push(mission);
    //         });
    //     });
    //     setMissions(getMissionsWithSubMissions(finalMissionList).filter(mission => !mission.parentID));
    // }, [debounceText, localStorageMissions]);

    return (
        <ul 
            style={!parentID ? MISSION_LIST_STYLES : getSubMissionPadding(SUB_MISSION_LIST_STYLES, level)}
        >
            {
                renderMissions.map(mission => 
                    <MissionRow key={mission.id} mission={mission} debounceText={debounceText} level={level}>
                        <MissionList 
                            missionsData={missionsData} 
                            parentID={mission.id} 
                            level={level + 1} 
                            setAreButtonsShown={setAreButtonsShown} 
                        />
                    </MissionRow>
                )
            }
        </ul>
    );
};