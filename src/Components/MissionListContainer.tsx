import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { MissionRow } from "./MissionRow";

interface iMissionListContainer {
    debounceText: string
}

export const MissionListContainer: React.FC<iMissionListContainer> = ({ debounceText }) => {
    const { localStorageMissions } = useLocalStorageMissions();
    const [missions, setMissions] = useState(localStorageMissions);
    useEffect(() => {
        setMissions(localStorageMissions.filter(mission => mission.description.includes(debounceText)));
        console.log(debounceText);
        if (debounceText === '') setMissions(localStorageMissions.filter(mission => mission.parentID === null));
    }, [debounceText])

    return (
        <ul id="mission-list">
            {missions.map(mission => <MissionRow key={mission.id} mission={mission} />)}
        </ul>
    );
};