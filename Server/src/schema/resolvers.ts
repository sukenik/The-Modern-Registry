import { Status } from "@prisma/client";
import { createMission, deleteMission, getAllMissions, updateMission } from "../missionService";

export interface iCreateMissionArgs {
    input: {
        description: string,
        status: Status,
        parentId: string | null
    }
}
export interface iUpdateMissionArgs {
    input: {
        id: string,
        description: string,
        status: Status,
        parentId: string | null
    }
}
export interface iDeleteMissionArgs {
    id: string
}

export const resolvers = {
    Query: {
        getAllMissions: () => getAllMissions()
    },
    Mutation: {
        createMission: (_: undefined, args: iCreateMissionArgs) => createMission(args.input),
        updateMission: (_: undefined, args: iUpdateMissionArgs) => updateMission(args.input),
        deleteMission: (_: undefined, args: iDeleteMissionArgs) => deleteMission(args)
    }
}