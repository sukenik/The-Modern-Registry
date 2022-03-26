import React, { ReactElement } from "react";
import { Mission } from "../App"
import { MissionRow } from "./MissionRow";

interface Props {
    missions: Array<Mission>
};

export const MissionList: React.FC<Props> = ({missions}) => {
    const rows: Array<ReactElement | null> = [];
    
    missions.forEach((mission: Mission) => {
        rows.push(
            <MissionRow
                key={mission.id} 
                id={mission.id}
                description={mission.description}
                status={mission.status} />
        );
    });
    
    return (
        <div>
            {rows}
        </div>
    );
};