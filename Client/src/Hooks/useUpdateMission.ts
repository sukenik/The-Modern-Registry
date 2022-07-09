import { endpoint, updateMissionQuery } from "../API/MissionQueries";
import { MISSION_STATUS } from "../Custom-Typings/Mission";

export function useUpdateMission(id: string, description: string, status: MISSION_STATUS, parentId: string | null) {
    const variables = {
        description,
        status,
        parentId,
        id
    }

    const body = JSON.stringify({ query: updateMissionQuery, variables })

    fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    })
    .then(response => {
        if (response.status >= 400) {
            throw new Error(`Error fetching data. status: ${response.status}`)
        } else {
            return response.json()
        }
    })
    .then(data => data.data.updateMission)
}