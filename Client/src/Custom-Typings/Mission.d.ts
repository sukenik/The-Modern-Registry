export interface Mission {
    id: string,
    description: string,
    status: MISSION_STATUS,
    parentID: string | null
}
export type VALUES<T> = T[keyof T]
export const STATUSES = { active: 'Active', complete: 'Complete' } as const
export type MISSION_STATUS = VALUES<typeof STATUSES>