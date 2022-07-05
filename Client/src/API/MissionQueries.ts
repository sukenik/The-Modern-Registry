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
export const createMissionQuery = `
  mutation CreateMission($description: String!, $status: String!, $parentId: String) {
    createMission(input: {
      description: $description,
      status: $status,
      parentId: $parentId
    }) {
      description
      id
      status
      parentId
    }
  }
`
export const updateMissionQuery = `
  mutation UpdateMission($id: String!, $description: String!, $status: String!, $parentId: String) {
    updateMission(input: {
      id: $id
      description: $description,
      status: $status,
      parentId: $parentId
    }) {
      description
      id
      status
      parentId
    }
  }
`
export const deleteMissionQuery = `
  mutation DeleteMission($id: String!) {
    deleteMission(id: $id) {
      description
      id
      status
      parentId
    }
  }
`