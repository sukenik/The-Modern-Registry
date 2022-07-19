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
        updateMission(input: UpdateMissionInput!): RowCount
        deleteMission(id: String!): RowCount
        deleteMissionChildren(childrenIds: [String!]!): RowCount
        passMissionParent(id: String!, parentId: String): RowCount
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
    type RowCount {
        count:          Int
    }
`