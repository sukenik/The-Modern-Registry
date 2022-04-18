import React, { ReactElement } from "react";
import { Mission } from "../App"
import { divideSubMissionToParentMission } from "../Logic/SubMissionLogic";
import { MissionRow } from "./MissionRow";

interface Props {
    missions: Array<Mission>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionList: React.FC<Props> = ({missions, setShowEditModal, setShowModal}) => {
    const rows: Array<ReactElement> = [];
    divideSubMissionToParentMission();
    const parentMissions = missions.filter(
        mission => typeof mission.parentID !== 'number'
    );
    
    parentMissions.forEach((mission: Mission) => {
        rows.push(
            <MissionRow
                key={mission.id} 
                id={mission.id}
                description={mission.description}
                status={mission.status}
                parentID={mission.parentID}
                subMissions={mission.subMissions}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        );
    });
    
    return (
        <ul id="mission-list">
            {rows}
        </ul>
    );
};