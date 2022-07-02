import { iCreateMissionArgs } from "./schema/resolvers";
import { prisma } from './schema/schema'
import { v4 as uuidv4 } from 'uuid';


export const getAllMissions = async () => {
    const allMissions = await prisma.mission.findMany()
    return allMissions
}

export const createMission = async (args: iCreateMissionArgs) => {
    const createdMission = await prisma.mission.create({
        data: {
            id: uuidv4(),
            description: args.description,
            status: args.status,
            parentId: args.parentId
        }
    })
    return createdMission
}