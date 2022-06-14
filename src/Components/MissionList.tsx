import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { useArrowButtonClick } from "../Context/ArrowButtonClickContext";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { defaultMission } from "../Context/MissionContext";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsData, getSubMissionPadding } from "../Logic/subMissionLogic";
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
    const [missionsDataProp, setMissionsDataProp] = useState(missionsData)
    if (!missionsData.filter(mission => mission.parentID === parentID).length) return null
    const { localStorageMissions } = useLocalStorageMissionsContext()
    const { debounceText, statusFilter } = useFilteringContext()

    useEffect(() => {
        if (!parentID) {
            setMissionsDataProp(getMissionsData(localStorageMissions, debounceText, statusFilter))
        } else if (!debounceText && statusFilter === 'default') {
            setMissionsDataProp(getMissionsData(localStorageMissions))
        }
    }, [debounceText, localStorageMissions, statusFilter])

    return (
        <ul style={parentID ? getSubMissionPadding(SUB_MISSION_LIST_STYLES, level) : MISSION_LIST_STYLES}>
            {
                missionsDataProp.filter(mission => mission.parentID === parentID).map(mission => 
                    <MissionRow key={mission.id} mission={mission} level={level}>
                        <MissionList missionsData={missionsDataProp} parentID={mission.id} level={level + 1} />
                    </MissionRow>
                )
            }
        </ul>
    );
};