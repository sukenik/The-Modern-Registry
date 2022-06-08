import React, { useState } from "react"
import { Mission } from "../Custom-Typings/Mission"

interface iMissionRowRec {
    missionsData: Array<Mission>,
    parentID?: number,
    level?: number
}

export const MissionRowRec: React.FC<iMissionRowRec> = ({ missionsData, parentID = null, level = 0 }) => {
    const [showSubMissions, setShowSubMissions] = useState(false);
    const missions = missionsData.filter(mission => mission.parentID === parentID)
    if (!missions.length) return null
    const handleClick = () => setShowSubMissions(prevState => !prevState);

    return (
        <ul>
            {
                missions.map(mission => 
                    <div style={{ backgroundColor: 'red' }} onClick={handleClick}>
                        <b>{mission.description}</b>{level}
                        {showSubMissions &&
                            <MissionRowRec missionsData={missionsData} parentID={mission.id} level={level + 1} />
                        }
                    </div>
                )
            }
        </ul>
    )
} 