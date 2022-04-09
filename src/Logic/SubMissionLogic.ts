import { ReactElement } from "react";
import { Mission, missions } from "../App";
import { MissionRow } from "../Components/MissionRow";


export const divideSubMissionsToFathers = (rows: Array<ReactElement>) => {
    const fatherMissions = missions.map(
        currentMission => currentMission.subMissions = missions.filter(
            mission => mission.fatherID === currentMission.id
        ) 
    );

    // fatherMissions.forEach((mission: Mission) => {
    //     rows.push(
    //         <MissionRow
    //             key={mission.id} 
    //             id={mission.id}
    //             description={mission.description}
    //             status={mission.status}
    //             fatherID={mission.fatherID}
    //             subMissions={mission.subMissions}
    //             setShowEditModal={setShowEditModal}
    //             setShowModal={setShowModal} />
    //     );
    // });
}