import React, { CSSProperties, useEffect, useState } from "react";
import { useDarkThemeContext } from "../Context/DarkThemeContext";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getMissionsData, getSubMissionPadding } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

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
    parentID?: number,
    level?: number
};

export const MissionList: React.FC<iMissionListProps> = ({ missionsData, parentID = null, level = 0 }) => {
    const [missionsDataProp, setMissionsDataProp] = useState(missionsData)
    if (!missionsData.filter(mission => mission.parentID === parentID).length) return null

    const { localStorageMissions } = useLocalStorageMissionsContext()
    const { debounceText, statusFilter } = useFilteringContext()
    const { darkTheme } = useDarkThemeContext()

    useEffect(() => {
        if (!parentID) {
            setMissionsDataProp(getMissionsData(localStorageMissions, debounceText, statusFilter))
        } else if (!debounceText && statusFilter === 'default') {
            setMissionsDataProp(getMissionsData(localStorageMissions))
        }
    }, [debounceText, localStorageMissions, statusFilter])

    return (
        <ul 
            style={darkTheme ? 
                parentID ? getSubMissionPadding(SUB_MISSION_LIST_DARK_STYLES, level) : MISSION_LIST_DARK_STYLES :
                parentID ? getSubMissionPadding(SUB_MISSION_LIST_STYLES, level) : MISSION_LIST_STYLES}
        >
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