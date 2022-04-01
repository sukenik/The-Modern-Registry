import React, { ReactElement } from "react";
import { Mission } from "../App"
import { MissionRow } from "./MissionRow";

interface Props {
    missions: Array<Mission>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
};

export const MissionList: React.FC<Props> = ({missions, setShowModal}) => {
    const rows: Array<ReactElement | null> = [];
    
    missions.forEach((mission: Mission) => {
        rows.push(
            <MissionRow
                key={mission.id} 
                id={mission.id}
                description={mission.description}
                status={mission.status}
                setShowModal={setShowModal} />
        );
    });
    
    return (
        <div>
            {rows}
        </div>
    );
};