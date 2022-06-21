export interface Mission {
    id: number,
    description: string,
    status: MISSION_STATUS,
    parentID: number | null
}
export type VALUES<T> = T[keyof T]
export const STATUS = { active: 'Active', complete: 'Complete' } as const
export type MISSION_STATUS = VALUES<typeof STATUS>