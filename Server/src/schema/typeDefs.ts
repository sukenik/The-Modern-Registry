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
    }

    input CreateMissionInput {
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
`