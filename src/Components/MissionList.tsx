import React, { ReactElement } from "react";
import { Mission } from "../App"
import { divideSubMissionsToFathers } from "../Logic/SubMissionLogic";
import { MissionRow } from "./MissionRow";

interface Props {
    missions: Array<Mission>,
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionList: React.FC<Props> = ({missions, setShowEditModal, setShowModal}) => {
    const rows: Array<ReactElement> = [];
    divideSubMissionsToFathers(rows);

    missions.forEach((mission: Mission) => {
        rows.push(
            <MissionRow
                key={mission.id} 
                id={mission.id}
                description={mission.description}
                status={mission.status}
                fatherID={mission.fatherID}
                subMissions={mission.subMissions}
                setShowEditModal={setShowEditModal}
                setShowModal={setShowModal} />
        );
    });
    
    return (
        <div id="mission-list">
            {rows}
        </div>
    );
};