import prisma from './schema/schema'
import { v4 as uuidv4 } from 'uuid'
import { UserInputError } from "apollo-server"
import { Status } from "@prisma/client"


export const getAllMissions = () => prisma.mission.findMany()

export const createMission = (input: { id: string, description: string, status: Status, parentId: string | null }) => {
    if (!validateStatus(input.status)) {
        throw new UserInputError(`Entered invalid status: ${input.status}`)
    }

    return prisma.mission.create({
        data: {
            id: input.id,
            description: input.description,
            status: input.status,
            parentId: input.parentId
        }
    })
}

export const updateMission = (input: { id: string, description: string, status: Status, parentId: string | null }) => {
    if (!validateStatus(input.status)) {
        throw new UserInputError(`Entered invalid status: ${input.status}`)
    }

    return prisma.mission.update({
        where: {
            id: input.id
        },
        data: {
            description: input.description,
            status: input.status,
            parentId: input.parentId
        }
    })
}

export const deleteMission = async (args: { id: string }) => {
    return await prisma.mission.delete({
        where: { id: args.id }
    })
}

export const deleteMissionChildren = (args: { childrenIds: Array<string> }) => {
    return prisma.mission.deleteMany({
        where: {
            id: {
                in: args.childrenIds
            }
        }
    })
}

export const passMissionParent = (args: { id: string, parentId: string | null }) => {
    return prisma.mission.updateMany({
        where: {
            parentId: args.id
        },
        data: {
            parentId: args.parentId
        }
    })
}

const validateStatus = (status: string) => ((status === 'Active') || (status === 'Complete'))
// TODO: validate parentId exist