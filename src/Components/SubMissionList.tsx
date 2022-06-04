import React from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { MissionRow } from "./MissionRow";

interface iSubMissionListProps {
    setAreButtonsShown: React.Dispatch<React.SetStateAction<boolean>>,
    currentMission: Mission,
    debounceText: string
};

export const SubMissionList: React.FC<iSubMissionListProps> = ({ currentMission, setAreButtonsShown, debounceText }) => {
    const { localStorageMissions } = useLocalStorageMissions();
    const handleOnMouseEnter = () => setAreButtonsShown(false);
    const handleOnMouseLeave = () => setAreButtonsShown(true);

    return (
        <ul id="sub-mission-list" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {currentMission.subMissions.map(mission => <MissionRow key={mission.id} mission={mission} debounceText={debounceText} />)}
        </ul>
    );
};