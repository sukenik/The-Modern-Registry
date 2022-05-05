import React, { ReactElement } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { divideSubMissionToParentMission } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    localStorageMissions: Array<Mission>,
    setlocalStorageMissions: React.Dispatch<React.SetStateAction<Mission[]>>
};

export const MissionList: React.FC<Props> = ({ setShowModal, localStorageMissions, setlocalStorageMissions }) => {
    const rows: Array<ReactElement> = [];
    divideSubMissionToParentMission(localStorageMissions);
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