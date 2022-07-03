import { iCreateMissionArgs } from "./schema/resolvers"
import prisma from './schema/schema'
import { v4 as uuidv4 } from 'uuid'
import { UserInputError } from "apollo-server"


export const getAllMissions = () => prisma.mission.findMany()

export const createMission = (args: iCreateMissionArgs) =>{
    if (!validateStatus(args.status)) {
        throw new UserInputError(`Entered invalid status: ${args.status}`)
    }

    return prisma.mission.create({
        data: {
            id: uuidv4(),
            description: args.description,
            status: args.status,
            parentId: args.parentId
        }
    })
}

const validateStatus = (status: string) => ((status === 'Active') || (status === 'Complete'))