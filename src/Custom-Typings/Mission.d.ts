export interface Mission {
    id: number,
    description: string,
    status: string,
    parentID: number | null,
    hasChildren: boolean
};