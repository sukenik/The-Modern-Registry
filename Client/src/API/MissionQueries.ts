export const endpoint = "http://localhost:4000/graphql"
export const getAllMissionsQuery = `
  query GetAllMissions {
    getAllMissions {
        id
        description
        status
        parentId
    }
  }
`
export const createMissionQuery = `
  mutation CreateMission($id: String!, $description: String!, $status: String!, $parentId: String) {
    createMission(input: {
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
export const deleteMissionChildrenQuery = `
  mutation DeleteMissionChildren($childrenIds: [String!]!) {
    deleteMissionChildren(childrenIds: $childrenIds) {
      count
    }
  }
`
export const passMissionParentQuery = `
  mutation PassMissionParent($id: String!, $parentId: String) {
    passMissionParent(id: $id, parentId: $parentId) {
      count
    }
  }
`