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
export const createMissionQuery = (description: string, status: string, parentId: string | null) => `
  {
    createMission(${description}, ${status}, ${parentId}) {
      description
      id
      status
      parentId
    }
  }
`