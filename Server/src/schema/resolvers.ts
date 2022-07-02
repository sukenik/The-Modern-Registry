import { Status } from "@prisma/client";
import { createMission, getAllMissions } from "../missionService";

export interface iCreateMissionArgs {
    description: string,
    status: Status,
    parentId: string | null
}

export const resolvers = {
    Query: {
        getAllMissions: () => getAllMissions()
    },
    Mutation: {
        createMission: (_: undefined, args: iCreateMissionArgs) => createMission(args)
    }
}