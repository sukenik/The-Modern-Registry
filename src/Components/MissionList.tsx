import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface iMissionListProps {
    debounceText: string
}

export const MissionList: React.FC<iMissionListProps> = ({ debounceText }) => {
    const { localStorageMissions } = useLocalStorageMissions();
    const [missions, setMissions] = useState(localStorageMissions);
    useEffect(() => {
        if (debounceText === '') return setMissions(localStorageMissions.filter(mission => !mission.parentID));
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

    return (
        <ul id="mission-list">
            {missions.map(mission => <MissionRow key={mission.id} mission={mission} debounceText={debounceText} />)}
        </ul>
    );
};