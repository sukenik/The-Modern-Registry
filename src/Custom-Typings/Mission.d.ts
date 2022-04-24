declare export interface Mission {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    parentID: number | null,
    subMissions: Array<Mission>,
};