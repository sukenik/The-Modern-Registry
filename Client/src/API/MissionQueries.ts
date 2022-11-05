import { gql } from '@apollo/client';

export const getAllMissions = gql`
  query getAllMissions {
    getAllMissions {
      id
      description
      status
      parentId
    }
  } 
`

export const createMissionMutation = gql`
  mutation createMission (
    $id: String!, 
    $description: String!, 
    $status: String!, 
    $parentId: String
    ) {
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
export const updateMissionMutation = gql`
  mutation updateMission ($id: String!, $description: String!, $status: String!, $parentId: String) {
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
export const deleteMissionMutation = gql`
  mutation deleteMission ($id: String!) {
    deleteMission(id: $id) {
      count
    }
  }
`
export const deleteMissionChildrenMutation = gql`
  mutation deleteMissionChildren ($childrenIds: [String!]!) {
    deleteMissionChildren(childrenIds: $childrenIds) {
      count
    }
  }
`
export const passMissionParentMutation = gql`
  mutation passMissionParent ($id: String!, $parentId: String) {
    passMissionParent(id: $id, parentId: $parentId) {
      count
    }
  }
`