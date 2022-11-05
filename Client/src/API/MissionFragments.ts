import { gql } from '@apollo/client'

export const createMissionFragment = gql`
    fragment createMission on Mission {
        id
        description
        status
        parentId
    }
`