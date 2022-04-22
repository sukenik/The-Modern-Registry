import { Mission } from "../App";

const addToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};
export const addMissionsToLocalStorage = (missions: Array<Mission>) => {
    missions.forEach(
        mission => addToLocalStorage(mission.id.toString(), JSON.stringify(mission))
    );
};
const getFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};
const parseStringToJSON = (stringObject: string): JSON => {
    return JSON.parse(stringObject);
}