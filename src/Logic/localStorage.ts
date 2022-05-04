import { Mission } from "../Custom-Typings/Mission";

export const addToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);
export const addMissionsToLocalStorage = (missions: Array<Mission>) => {
    missions.forEach(
        mission => addToLocalStorage(mission.id.toString(), JSON.stringify(mission))
    );
};
const getFromLocalStorage = (key: string): string | null => localStorage.getItem(key);
const parseStringToJSON = (stringObject: string): JSON => JSON.parse(stringObject);
export const parseMissionToString = (mission: Mission): string => JSON.stringify(mission);