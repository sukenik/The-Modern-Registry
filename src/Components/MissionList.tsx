import React, { ReactElement, useEffect } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { addMissionsToLocalStorage } from "../Logic/localStorageLogic";
import { divideSubMissionToParentMission } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageMissions: Array<Mission>,
    setLocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>
};

export const MissionList: React.FC<Props> = ({ setShowModal, localStorageMissions, setLocalStorageMissions }) => {
    const rows: Array<ReactElement> = [];
    const missionsWithSubMissions = divideSubMissionToParentMission(localStorageMissions);
    useEffect(() => {
        setLocalStorageMissions(missionsWithSubMissions);
        addMissionsToLocalStorage(missionsWithSubMissions);
    });

    const parentMissions = localStorageMissions.filter(mission => typeof mission.parentID !== 'number');
    parentMissions.forEach((mission: Mission) => {
        rows.push(
            <MissionRow key={mission.id} mission={mission} setShowModal={setShowModal} />
        );
    });
    
    return (
        <ul id="mission-list">
            {rows}
        </ul>
    );
};