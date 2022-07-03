export const endpoint = "http://localhost:4000/graphql"
export const getAllMissionsQuery = `
  {
    getAllMissions {
        description
        id
        status
        parentId
    }
  }
`