import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { useAllMissions } from "../Hooks/useAllMissions";
import { getLocalStorageKeys, getLocalStorageMissions } from "../Logic/localStorageLogic";
import { getMissionsData } from "../Logic/subMissionLogic";

interface iMissionsContext {
    missions: Array<Mission>,
    setMissions: Dispatch<SetStateAction<Array<Mission>>>
};
const MissionsContext = React.createContext<iMissionsContext | null>(null);

export const useLocalStorageMissionsContext = () => useContext(MissionsContext) as iMissionsContext;
const data = 'db'

export const MissionsProvider: React.FC = ({ children }) => {
    const [missions, setMissions] = data === 'db' ? 
        useAllMissions() :
        useState(getMissionsData(getLocalStorageMissions(getLocalStorageKeys()))
    )

    return (
        <MissionsContext.Provider value={{ missions, setMissions }}>
            {children}
        </MissionsContext.Provider>
    );
};