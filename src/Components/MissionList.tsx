import React, { useEffect } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { addMissionsToLocalStorage } from "../Logic/localStorageLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface iMissionListProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageMissions: Array<Mission>,
    setLocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>
};

export const MissionList: React.FC<iMissionListProps> = ({ setShowModal, localStorageMissions, setLocalStorageMissions }) => {
    useEffect(() => {
        const missionsWithSubMissions = getMissionsWithSubMissions(localStorageMissions);
        setLocalStorageMissions(missionsWithSubMissions);
        addMissionsToLocalStorage(missionsWithSubMissions);
    });
    const parentMissions = localStorageMissions.filter(mission => mission.parentID === null);
    
    return (
        <ul id="mission-list">
            {parentMissions.map(mission => <MissionRow key={mission.id} mission={mission} setShowModal={setShowModal} />)}
        </ul>
    );
};