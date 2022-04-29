import React, { Dispatch, SetStateAction, useContext } from "react";
import { useState } from "react";
import { Mission } from '../Custom-Typings/Mission'; 

interface iMissionContext {
    currentMission: Mission,
    setCurrentMission: Dispatch<SetStateAction<Mission>>
}
const CurrentMissionContext = React.createContext<iMissionContext | null>(null);

export const useCurrentMission = () => useContext(CurrentMissionContext) as iMissionContext;

export const CurrentMissionProvider: React.FC = ({ children }) => {
    const [currentMission, setCurrentMission] = useState({} as Mission);

    return (
        <CurrentMissionContext.Provider value={{ currentMission, setCurrentMission }}>
            {children}
        </CurrentMissionContext.Provider>
    );
}