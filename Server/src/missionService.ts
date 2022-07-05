import prisma from './schema/schema'
import { v4 as uuidv4 } from 'uuid'
import { UserInputError } from "apollo-server"
import { Status } from "@prisma/client"


export const getAllMissions = () => prisma.mission.findMany()

export const createMission = (input: { description: string, status: Status, parentId: string | null }) => {
    if (!validateStatus(input.status)) {
        throw new UserInputError(`Entered invalid status: ${input.status}`)
    }

    return prisma.mission.create({
        data: {
            id: uuidv4(),
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

export const deleteMission = (args: { id: string }) => {
    return prisma.mission.delete({
        where: {
            id: args.id
        }
    })
}

const validateStatus = (status: string) => ((status === 'Active') || (status === 'Complete'))
// TODO: validate parentId exist