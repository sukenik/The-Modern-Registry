import { useQuery, useMutation } from '@apollo/client'
import { Mission } from '../../../Entities/Mission'
import { getNewMission } from '../Logic/createMissionLogic'
import { createMissionMutation, deleteMissionChildrenMutation, deleteMissionMutation, getAllMissions, passMissionParentMutation, updateMissionMutation } from './MissionQueries'

export const useAllMissions = () => {
    const { data, loading, error } = useQuery(getAllMissions)

    return { data, loading, error }
}

export const useCreateMission = () => {
    const [createMission, { data, loading, error }] = useMutation(createMissionMutation, {
        refetchQueries: [
            { query: getAllMissions }
        ]
    })

    return [
        createMission
    ]
}

export const useUpdateMission = () => {
    const [updateMission, { data, loading, error }] = useMutation(updateMissionMutation, {
        refetchQueries: [
            { query: getAllMissions }
        ]
    })

    return [
        updateMission
    ]
}

export const useDeleteMission = () => {
    const [deleteMission, { data, loading, error }] = useMutation(deleteMissionMutation, {
        refetchQueries: [
            { query: getAllMissions }
        ]
    })

    return [
        deleteMission
    ]
}

export const useDeleteMissionChildren = () => {
    const [deleteMissionChildren, { data, loading, error }] = useMutation(deleteMissionChildrenMutation, {
        refetchQueries: [
            { query: getAllMissions }
        ]
    })

    return [
        deleteMissionChildren
    ]
}

export const usePassMissionParent = () => {
    const [passMissionParent, { data, loading, error }] = useMutation(passMissionParentMutation, {
        refetchQueries: [
            { query: getAllMissions }
        ]
    })

    return [
        passMissionParent
    ]
}