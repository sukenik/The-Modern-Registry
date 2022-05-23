import React, { useEffect } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { MissionRow } from "./MissionRow";

export const MissionListContainer: React.FC = () => {
    const { localStorageMissions } = useLocalStorageMissions();

    return (
        <ul id="mission-list">
            {localStorageMissions.filter(mission => mission.parentID === null).map(
                mission => <MissionRow key={mission.id} mission={mission} />)}
        </ul>
    );
};