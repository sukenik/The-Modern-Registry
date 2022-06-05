import React, { CSSProperties, useEffect, useState } from "react";
import { useFilteringContext } from "../Context/FilteringContext";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { filterSelfAndLinkedChildrenMissions } from "../Logic/filterLinkToMissionFieldLogic";
import { getSelfAndLinkedChildrenMissions } from "../Logic/helperFunctions";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

const MISSION_LIST_STYLES: CSSProperties = {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    marginTop: 0
};

interface iMissionListProps {
    debounceText: string
};

export const MissionList: React.FC<iMissionListProps> = ({ debounceText }) => {
    const { localStorageMissions } = useLocalStorageMissionsContext();
    const [missions, setMissions] = useState(localStorageMissions);
    const { statusFilter } = useFilteringContext();
    useEffect(() => {
        if (!debounceText) return setMissions(localStorageMissions.filter(mission => !mission.parentID));
        let searchResults: Array<Mission> = localStorageMissions.filter(
            mission => mission.description.toLowerCase().includes(debounceText.toLowerCase()));
        const missionTrees = searchResults.map(mission => getSelfAndParentMissions(mission));
        const finalMissionList = [] as Array<Mission>;
        missionTrees.forEach((missionList) => {missionList.forEach(mission => {
                if (!finalMissionList.some(finalMission => mission.id === finalMission.id))
                    finalMissionList.push(mission);
            });
        });
        setMissions(getMissionsWithSubMissions(finalMissionList).filter(mission => !mission.parentID));
    }, [debounceText, localStorageMissions]);
    useEffect(() => {
        if (statusFilter === 'default') return setMissions(localStorageMissions.filter(mission => !mission.parentID));
        const statusMissions = localStorageMissions.filter(mission => mission.status === statusFilter);
        const missionTrees = statusMissions.map(mission => getSelfAndParentMissions(mission));
        const finalMissionList = [] as Array<Mission>;
        missionTrees.forEach((missionList) => {missionList.forEach(mission => {
            if (!finalMissionList.some(finalMission => mission.id === finalMission.id))
                finalMissionList.push(mission);
            });
        });
        setMissions(getMissionsWithSubMissions(finalMissionList).filter(mission => !mission.parentID));
    }, [statusFilter, localStorageMissions]);

    return (
        <ul style={MISSION_LIST_STYLES}>
            {missions.map(mission => <MissionRow key={mission.id} mission={mission} debounceText={debounceText} />)}
        </ul>
    );
};