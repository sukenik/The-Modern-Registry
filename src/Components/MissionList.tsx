import React, { CSSProperties, useEffect, useState } from "react";
import { useArrowButtonClick } from "../Context/ArrowButtonClickContext";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsData, getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

export const MISSION_LIST_STYLES: CSSProperties = {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    marginTop: 0
};

interface iMissionListProps {
    debounceText: string,
    missionsData: Array<Mission>,
    parentID?: number,
    level?: number
};

export const MissionList: React.FC<iMissionListProps> = ({ debounceText, missionsData, parentID = null, level = 0 }) => {
    const { localStorageMissions } = useLocalStorageMissions();
    const [missions, setMissions] = useState(localStorageMissions);
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
        <ul style={MISSION_LIST_STYLES}>
            {
                renderMissions.map(mission => 
                    <MissionRow key={mission.id} mission={mission} debounceText={debounceText}>
                        <MissionList debounceText={debounceText} missionsData={missionsData} parentID={mission.id} level={level + 1} />
                    </MissionRow>
                )
            }
        </ul>
    );
};