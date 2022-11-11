import React, { CSSProperties, useEffect, useState } from "react";
import { useDarkThemeContext } from "../Context/DarkThemeContext";
import { useFilteringContext } from "../Context/FilteringContext";
import { Mission } from "../../../Entities/Mission";
import { hasChildren } from "../Logic/helperFunctions";
import { getMissionsData, getSubMissionPadding } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";
import { useAllMissions } from "../API/MissionHooks";

const SUB_MISSION_LIST_STYLES: CSSProperties = {
    backgroundColor: 'rgba(218, 218, 218)',
    display: 'flex',
    flexDirection: 'column',
    order: 5,
    paddingLeft: 25
}
const SUB_MISSION_LIST_DARK_STYLES: CSSProperties = {
    ...SUB_MISSION_LIST_STYLES,
    backgroundColor: '#121212'
}
const MISSION_LIST_STYLES: CSSProperties = {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    marginTop: 0
}
const MISSION_LIST_DARK_STYLES: CSSProperties = {
    ...MISSION_LIST_STYLES,
    backgroundColor: '#121212'
}

interface iMissionListProps {
    missionsData: Array<Mission>,
    parentId?: string,
    level?: number
}

export const MissionList: React.FC<iMissionListProps> = ({ missionsData, parentId = null, level = 0 }) => {
    if (!missionsData.filter(mission => mission.parentId === parentId).length) return null
    
    const [missionsDataProp, setMissionsDataProp] = useState(missionsData)
    const { data } = useAllMissions()
    const { debounceText, statusFilter } = useFilteringContext()
    const { darkTheme } = useDarkThemeContext()

    useEffect(
        () => setMissionsDataProp(getMissionsData(data?.getAllMissions, debounceText, statusFilter)), 
        [debounceText, data?.getAllMissions, statusFilter]
    )

    return (
        <ul 
            style={darkTheme ? 
                parentId ? getSubMissionPadding(SUB_MISSION_LIST_DARK_STYLES, level) : MISSION_LIST_DARK_STYLES :
                parentId ? getSubMissionPadding(SUB_MISSION_LIST_STYLES, level) : MISSION_LIST_STYLES}
        >
            {
                missionsDataProp.filter(mission => mission.parentId === parentId).map(mission => 
                    <MissionRow 
                        key={mission.id} 
                        mission={mission} 
                        level={level} 
                        hasChildren={hasChildren(mission.id, missionsDataProp)}
                    >
                        <MissionList missionsData={missionsDataProp} parentId={mission.id} level={level + 1} />
                    </MissionRow>
                )
            }
        </ul>
    );
};