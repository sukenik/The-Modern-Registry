import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import { MissionsAPI } from './schema/MissionsAPI'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      missionsAPI: new MissionsAPI()
    }
  } 
})


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`)
})