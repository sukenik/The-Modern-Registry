import React, { useMemo } from "react"
import { useCurrentMissionContext } from "../Context/CurrentMissionContext"
import { useMissionsContext } from "../Context/MissionsContext"
import { getLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic"
import { getDefaultLinkToMissionElement, getMissionsToLinkElements } from "../Logic/missionFormLogic"
import { getMissionsData } from "../Logic/subMissionLogic"

export const LinkToMissionOptions: React.FC = () => {
    const { missions } = useMissionsContext()
    const { currentMission } = useCurrentMissionContext()
    
    const linkToMissionOptions = useMemo(() => getLinkToMissionOptions(currentMission, getMissionsData(missions)), [])
    const missionsFitToLinkOptionElements = useMemo(() => getMissionsToLinkElements(linkToMissionOptions), [])
    const defaultLinkToMissionOption = useMemo(() => getDefaultLinkToMissionElement(currentMission, getMissionsData(missions)), [])

    return (
        <>
            {defaultLinkToMissionOption}
            {currentMission.parentId ?? <option value="default"></option>}
            {missionsFitToLinkOptionElements}
        </>
    )
}