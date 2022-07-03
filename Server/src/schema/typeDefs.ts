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
        createMission(description: String!, status: String!, parentId: String): Mission!
    }
`