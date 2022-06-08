import React, { CSSProperties } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { MissionRow } from "./MissionRow";

export const SUB_MISSION_LIST_STYLES: CSSProperties = {
    backgroundColor: 'rgba(218, 218, 218)',
    display: 'flex',
    flexDirection: 'column',
    order: 5,
    paddingLeft: 30
};

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
        <ul style={SUB_MISSION_LIST_STYLES} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {/* {localStorageMissions.filter(mission => mission.parentID === currentMission.id)
                .map(mission => <MissionRow key={mission.id} mission={mission} debounceText={debounceText} />)} */}
        </ul>
    );
};