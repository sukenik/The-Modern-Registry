import React, { Dispatch, SetStateAction, useContext } from "react";
import { useState } from "react";
import { Mission } from '../Custom-Typings/Mission'; 

interface iMissionContext {
    currentMission: Mission,
    setCurrentMission: Dispatch<SetStateAction<Mission>>
};
const CurrentMissionContext = React.createContext<iMissionContext | null>(null);

export const useCurrentMissionContext = () => useContext(CurrentMissionContext) as iMissionContext;
export const defaultMission: Mission = {
    id: 0,
    description: '',
    status: 'Active',
    parentID: null,
    hasChildren: false
};

export const CurrentMissionProvider: React.FC = ({ children }) => {
    const [currentMission, setCurrentMission] = useState(defaultMission);

    return (
        <CurrentMissionContext.Provider value={{ currentMission, setCurrentMission }}>
            {children}
        </CurrentMissionContext.Provider>
    );
};