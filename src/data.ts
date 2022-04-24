import { Mission } from "./Custom-Typings/Mission";

export const missions: Array<Mission> = [
    {id: 1, description: 'Mission 1', status: 'Active', parentID: null, subMissions: [] as Array<Mission>},
    {id: 2, description: 'Sub-mission 1', status: 'Active', parentID: 1, subMissions: []},
    {id: 3, description: 'Sub-sub-mission 1', status: 'Active', parentID: 2, subMissions: []},
    {id: 4, description: 'Mission 2', status: 'Active', parentID: null, subMissions: []},
    {id: 5, description: 'Mission 3', status: 'Active', parentID: null, subMissions: []},
    {id: 6, description: 'Sub-mission 3', status: 'Complete', parentID: 5, subMissions: []},
];