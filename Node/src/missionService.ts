import prisma from './schema/schema'
import { v4 as uuidv4 } from 'uuid'
import { UserInputError } from "apollo-server"
import { Mission, Status } from "@prisma/client"
import { MissionsAPI } from './schema/MissionsAPI'


export const getAllMissions = async (missionsAPI: MissionsAPI) => {
    return missionsAPI.getAllMissions()
}

export const createMission = (
        input: { id: string, description: string, status: Status, parentId: string | null }, 
        missionsAPI: MissionsAPI
    ) => {
    if (!validateStatus(input.status)) {
        throw new UserInputError(`Entered invalid status: ${input.status}`)
    }

    return missionsAPI.createMission({ 
        id: input.id, 
        description: input.description, 
        status: input.status, 
        parentId: input.parentId 
    } as Mission)
}

export const updateMission = (
        input: { id: string, description: string, status: Status, parentId: string | null }, 
        missionsAPI: MissionsAPI
    ) => {
    if (!validateStatus(input.status)) {
        throw new UserInputError(`Entered invalid status: ${input.status}`)
    }

    return missionsAPI.updateMission({ 
        id: input.id, 
        description: input.description, 
        status: input.status, 
        parentId: input.parentId 
    } as Mission)
}

export const deleteMission = (args: { id: string }, missionsAPI: MissionsAPI) => {
    return missionsAPI.deleteMission(args.id)
}

export const deleteMissionChildren = (args: { childrenIds: Array<string> }, missionsAPI: MissionsAPI) => {
    return missionsAPI.deleteMissionChildren(args.childrenIds)
}

export const passMissionParent = (args: { id: string, parentId: string | null }, missionsAPI: MissionsAPI) => {
    return missionsAPI.passMissionParent(args.id, args.parentId)
}

export const getMissionByName = (args: { description: string }, missionsAPI: MissionsAPI) => {
    return missionsAPI.getMissionByName(args.description)
}

const validateStatus = (status: string) => ((status === 'Active') || (status === 'Complete'))