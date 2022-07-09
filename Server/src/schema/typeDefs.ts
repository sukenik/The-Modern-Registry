import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Mission {
        id:          String!
        description: String!
        status:      String!
        parentId:    String
    }
    
    type Query {
        getAllMissions:                             [Mission!]!
        getMissionByName(description: String!):     Mission!
    }

    type Mutation {
        createMission(input: UpdateMissionInput!): Mission!
        updateMission(input: UpdateMissionInput!): Mission!
        deleteMission(id: String!): Mission!
        deleteMissionChildren(childrenIds: [String!]!): BatchPayload
        passMissionParent(id: String!, parentId: String): BatchPayload
    }
    
    input UpdateMissionInput {
        id:             String!
        description:    String!
        status:         String!
        parentId:       String
    }

    type BatchPayload {
        count:          Int
    }
`