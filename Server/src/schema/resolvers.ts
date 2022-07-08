import { Status } from "@prisma/client";
import { createMission, deleteMission, deleteMissionChildren, getAllMissions, passMissionParent, updateMission } from "../missionService";

export interface iCreateMissionArgs {
    input: {
        id: string,
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
export interface iDeleteMissionChildrenArgs {
    childrenIds: Array<string>
}
export interface iPassMissionParentArgs {
    id: string,
    parentId: string | null
}

export const resolvers = {
    Query: {
        getAllMissions: () => getAllMissions()
    },
    Mutation: {
        createMission: (_: undefined, args: iCreateMissionArgs) => createMission(args.input),
        updateMission: (_: undefined, args: iUpdateMissionArgs) => updateMission(args.input),
        deleteMission: (_: undefined, args: iDeleteMissionArgs) => deleteMission(args),
        deleteMissionChildren: (_: undefined, args: iDeleteMissionChildrenArgs) => deleteMissionChildren(args),
        passMissionParent: (_: undefined, args: iPassMissionParentArgs) => passMissionParent(args)
    }
}