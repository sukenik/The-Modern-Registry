import React, { useMemo } from "react"
import { useAllMissions } from "../API/MissionHooks"
import { useCurrentMissionContext } from "../Context/CurrentMissionContext"
import { getLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic"
import { getDefaultLinkToMissionElement, getMissionsToLinkElements } from "../Logic/missionFormLogic"
import { getMissionsData } from "../Logic/subMissionLogic"

export const LinkToMissionOptions: React.FC = () => {
    const { data } = useAllMissions()
    const { currentMission } = useCurrentMissionContext()
    
    const linkToMissionOptions = useMemo(() => {
        return getLinkToMissionOptions(currentMission, getMissionsData(data.getAllMissions))
    }, [])

    const missionsFitToLinkOptionElements = useMemo(() => {
        return getMissionsToLinkElements(linkToMissionOptions)
    }, [])
    
    const defaultLinkToMissionOption = useMemo(() => {
        return getDefaultLinkToMissionElement(currentMission, getMissionsData(data.getAllMissions))
    }, [])

    return (
        <>
            {defaultLinkToMissionOption}
            {currentMission.parentId ?? <option value="default"></option>}
            {missionsFitToLinkOptionElements}
        </>
    )
}