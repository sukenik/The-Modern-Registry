import React, { Dispatch, SetStateAction, useContext } from "react";
import { useState } from "react";
import { Mission } from '../Custom-Typings/Mission'; 

interface iCurrentMissionContext {
    currentMission: Mission,
    setCurrentMission: Dispatch<SetStateAction<Mission>>
};
const CurrentMissionContext = React.createContext<iCurrentMissionContext | null>(null);
export const useCurrentMissionContext = () => useContext(CurrentMissionContext) as iCurrentMissionContext;
export const defaultMission: Mission = {
    id: 0,
    description: '',
    status: 'Active',
    parentID: null,
    subMissions: [] as Array<Mission>
};

export const CurrentMissionProvider: React.FC = ({ children }) => {
    const [currentMission, setCurrentMission] = useState(defaultMission);

    return (
        <CurrentMissionContext.Provider value={{ currentMission, setCurrentMission }}>
            {children}
        </CurrentMissionContext.Provider>
    );
};