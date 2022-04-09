import { Mission, missions } from "../App";

export const divideSubMissionsToFathers = () => {
    missions.forEach(
        currentMission => currentMission.subMissions = missions.filter(
            mission => mission.fatherID === currentMission.id
        )
    );
};
export const giveGenerations = (mission: Mission, n: number) => {
    mission.generation = n;
    if (mission.subMissions.length === 0) return;
    const generation = n++;
    mission.subMissions.forEach(subMission => giveGenerations(subMission, generation));
};