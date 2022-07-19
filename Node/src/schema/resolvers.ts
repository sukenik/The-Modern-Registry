import { Status } from "@prisma/client";
import { createMission, deleteMission, deleteMissionChildren, getAllMissions, getMissionByName, passMissionParent, updateMission } from "../missionService";
import { MissionsAPI } from "./MissionsAPI";

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
export interface iGetMissionByNameArgs {
    description: string
}
export interface dataSourcesContext {
    dataSources: dataSources
}
interface dataSources {
    missionsAPI: MissionsAPI
}

export const resolvers = {
    Query: {
        getAllMissions: (_: any, __: any, { dataSources }: dataSourcesContext ) => getAllMissions(dataSources.missionsAPI),
        getMissionByName: (_: undefined, args: iGetMissionByNameArgs, { dataSources }: dataSourcesContext) => 
            getMissionByName(args, dataSources.missionsAPI)
    },
    Mutation: {
        createMission: (_: undefined, args: iUpdateMissionArgs, { dataSources }: dataSourcesContext) => 
            createMission(args.input, dataSources.missionsAPI),
        updateMission: (_: undefined, args: iUpdateMissionArgs, { dataSources }: dataSourcesContext) => 
            updateMission(args.input, dataSources.missionsAPI),
        deleteMission: (_: undefined, args: iDeleteMissionArgs, { dataSources }: dataSourcesContext) => 
            deleteMission(args, dataSources.missionsAPI),
        deleteMissionChildren: (_: undefined, args: iDeleteMissionChildrenArgs, { dataSources }: dataSourcesContext) => 
            deleteMissionChildren(args, dataSources.missionsAPI),
        passMissionParent: (_: undefined, args: iPassMissionParentArgs, { dataSources }: dataSourcesContext) => 
            passMissionParent(args, dataSources.missionsAPI)
    }
}