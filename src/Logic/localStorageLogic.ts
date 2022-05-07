import { Mission } from "../Custom-Typings/Mission";

export const addToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);
export const addMissionsToLocalStorage = (missions: Array<Mission>) => missions.forEach(
    mission => addToLocalStorage(mission.id.toString(), JSON.stringify(mission)));
const getFromLocalStorage = (key: string): string | null => localStorage.getItem(key);
const parseStringToMission = (stringObject: string): Mission => JSON.parse(stringObject);
export const parseMissionToString = (mission: Mission): string => JSON.stringify(mission);
const getMissionFromLocalStorage = (key: string) => {
    const mission = getFromLocalStorage(key)
    if (mission) {
        return parseStringToMission(mission);
    }
    return {} as Mission;
};
export const getMissionsFromLocalStorage = (keys: Array<string>) => keys.map(key => getMissionFromLocalStorage(key));
export const getLocalStorageKeys = () => {
    const keys: Array<string> = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i)!);
    }
    return keys;
}