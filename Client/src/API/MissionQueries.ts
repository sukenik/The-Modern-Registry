require('dotenv').config()
export const endpoint = process.env.NODE_URL || "http://localhost:4000/graphql"
export const getAllMissionsQuery = `
  query {
    getAllMissions {
        id
        description
        status
        parentId
    }
  }
`
export const createMissionQuery = `
  mutation ($id: String!, $description: String!, $status: String!, $parentId: String) {
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
  mutation ($id: String!, $description: String!, $status: String!, $parentId: String) {
    updateMission(input: {
      id: $id
      description: $description,
      status: $status,
      parentId: $parentId
    }) {
      count
    }
  }
`
export const deleteMissionQuery = `
  mutation ($id: String!) {
    deleteMission(id: $id) {
      count
    }
  }
`
export const deleteMissionChildrenQuery = `
  mutation ($childrenIds: [String!]!) {
    deleteMissionChildren(childrenIds: $childrenIds) {
      count
    }
  }
`
export const passMissionParentQuery = `
  mutation ($id: String!, $parentId: String) {
    passMissionParent(id: $id, parentId: $parentId) {
      count
    }
  }
`