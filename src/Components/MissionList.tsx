import React, { ReactElement } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { divideSubMissionToParentMission } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface Props {
    missions: Array<Mission>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
};

export const MissionList: React.FC<Props> = ({ missions, setShowModal }) => {
    const rows: Array<ReactElement> = [];
    divideSubMissionToParentMission();
    const parentMissions = missions.filter(mission => typeof mission.parentID !== 'number');
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