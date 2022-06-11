import React, { CSSProperties, useEffect, useState } from "react";
import { useArrowButtonClick } from "../Context/ArrowButtonClickContext";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { defaultMission } from "../Context/MissionContext";
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
    level?: number
};

export const MissionList: React.FC<iMissionListProps> = ({ missionsData, parentID = null, level = 0 }) => {
    console.log(parentID, missionsData);
    const [renderMissions, setRenderMissions] = useState(missionsData.filter(mission => mission.parentID === parentID))
    const [missionsDataProp, setMissionsDataProp] = useState(missionsData)
    const { localStorageMissions } = useLocalStorageMissionsContext()
    if (!renderMissions.length) return null
    const { debounceText } = useFilteringContext()

    useEffect(() => {
        console.log(missionsData);

        if (!parentID && !debounceText) {
            return setRenderMissions(getMissionsData(localStorageMissions, debounceText).filter(mission => !mission.parentID))
        }
        setMissionsDataProp(getMissionsData(localStorageMissions, debounceText))
        setRenderMissions(getMissionsData(localStorageMissions, debounceText).filter(mission => mission.parentID === parentID))
    }, [debounceText, localStorageMissions]);

    return (
        <ul style={parentID ? getSubMissionPadding(SUB_MISSION_LIST_STYLES, level) : MISSION_LIST_STYLES}>
            {
                renderMissions.map(mission => 
                    <MissionRow key={mission.id} mission={mission} level={level}>
                        <MissionList missionsData={missionsDataProp} parentID={mission.id} level={level + 1} />
                    </MissionRow>
                )
            }
        </ul>
    );
};