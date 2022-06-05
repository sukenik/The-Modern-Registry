import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Mission } from "../Custom-Typings/Mission";
import { getLocalStorageKeys, getLocalStorageMissions } from "../Logic/localStorageLogic";

interface iLocalStorageMissionsContext {
    localStorageMissions: Array<Mission>,
    setLocalStorageMissions: Dispatch<SetStateAction<Array<Mission>>>
};
const LocalStorageMissionsContext = React.createContext<iLocalStorageMissionsContext | null>(null);

export const useLocalStorageMissions = () => useContext(LocalStorageMissionsContext) as iLocalStorageMissionsContext;

export const LocalStorageMissionsProvider: React.FC = ({ children }) => {
    const [localStorageMissions, setLocalStorageMissions] = 
        useState(getLocalStorageMissions(getLocalStorageKeys()));

    return (
        <LocalStorageMissionsContext.Provider value={{ localStorageMissions, setLocalStorageMissions }}>
            {children}
        </LocalStorageMissionsContext.Provider>
    );
};