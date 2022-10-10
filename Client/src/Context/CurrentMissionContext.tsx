import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Mission } from "../../../Entities/Mission";

interface iMissionContext {
    currentMission: Mission,
    setCurrentMission: Dispatch<SetStateAction<Mission>>
}
const CurrentMissionContext = React.createContext<iMissionContext | null>(null);

export const useCurrentMissionContext = () => useContext(CurrentMissionContext) as iMissionContext;
export const defaultMission: Mission = {
    id: '',
    description: '',
    status: 'Active',
    parentId: null
}

export const CurrentMissionProvider: React.FC = ({ children }) => {
    const [currentMission, setCurrentMission] = useState(defaultMission);

    return (
        <CurrentMissionContext.Provider value={{ currentMission, setCurrentMission }}>
            {children}
        </CurrentMissionContext.Provider>
    );
}