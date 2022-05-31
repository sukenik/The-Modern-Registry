import React, { useEffect, useState } from "react";
import { useLocalStorageMissions } from "../Context/LocalStorageMissionsContext";
import { Mission } from "../Custom-Typings/Mission";
import { getSelfAndParentMissions } from "../Logic/searchBarLogic";
import { getMissionsWithSubMissions } from "../Logic/subMissionLogic";
import { MissionRow } from "./MissionRow";

interface iMissionListContainer {
    debounceText: string
}

export const MissionListContainer: React.FC<iMissionListContainer> = ({ debounceText }) => {
    const { localStorageMissions } = useLocalStorageMissions();
    const [missions, setMissions] = useState(localStorageMissions);
    useEffect(() => {
        if (debounceText === '') return setMissions(localStorageMissions.filter(mission => !mission.parentID));
        let searchResults: Array<Mission> = localStorageMissions.filter(                            // :)
            mission => mission.description.toLowerCase().includes(debounceText.toLowerCase()));     // :)

        
        const missionTrees = searchResults.map(mission => getSelfAndParentMissions(mission));          
        /* 
            # FOUND WHERE DAVID LOST HIS SON
            --------------------------------
            Inside missionTrees, we get a matrix where parent missions don't have subMissions,
            I think the best idea will be to give them the subMissions *after* we unite them to one final mission list.

        [
                [{David Guetta, ..., subMissions: []}, {Check, ..., parentID: David Guetta.id}]
        ]
        */
        
        // const finalMissionList = [] as Array<Mission>
        // for (let i = 0; i < missionTrees.length - 1; i++) {
        //     let skipNext;
        //     if (missionTrees[i][missionTrees[i].length - 1].id === missionTrees[i + 1][missionTrees[i + 1].length - 1].id) {
        //         missionTrees[i].length > missionTrees[i + 1].length ?
        //             finalMissionList.push(...missionTrees[i]) :
        //             finalMissionList.push(...missionTrees[i + 1]);
        //         skipNext = true;
        //     } else if (!skipNext) {
        //         finalMissionList.push(...missionTrees[i].concat(missionTrees[i + 1]));
        //     }
        // }
        // if (missionTrees.length === 1) finalMissionList.push(...missionTrees[0]);

        // // searchResults = searchResults.map(mission => getPrimaryParent(mission));
        // // setMissions(getUniqueMissionArray(searchResults));
        // if (finalMissionList.some(mission => !mission.parentID)) {
        //     setMissions(getMissionsWithSubMissions(finalMissionList).filter(mission => !mission.parentID));
        // } else {
        //     setMissions(getMissionsWithSubMissions(finalMissionList));
        // }
    }, [debounceText, localStorageMissions])

    return (
        <ul id="mission-list">
            {missions.map(mission => <MissionRow key={mission.id} mission={mission} />)}
        </ul>
    );
};