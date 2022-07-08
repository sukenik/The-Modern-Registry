import { gql } from 'apollo-server'

export const typeDefs = gql`
    type Mission {
        id:          String!
        description: String!
        status:      String!
        parentId:    String
    }
    
    type Query {
        getAllMissions: [Mission!]!
    }

    type Mutation {
        createMission(input: CreateMissionInput!): Mission!
        updateMission(input: UpdateMissionInput!): Mission!
        deleteMission(id: String!): Mission!
        deleteMissionChildren(childrenIds: [String!]!): BatchPayload
        passMissionParent(id: String!, parentId: String): BatchPayload
    }

    input CreateMissionInput {
        id:             String!
        description:    String!
        status:         String!
        parentId:       String
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