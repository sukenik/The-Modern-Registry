import { createMissionQuery, endpoint } from "../API/MissionQueries";
import { MISSION_STATUS } from "../../../Entities/Mission";

export function useCreateMission(id: string, description: string, status: MISSION_STATUS, parentId: string | null) {
    const variables = {
        id,
        description,
        status,
        parentId
    }

    const body = JSON.stringify({ query: createMissionQuery, variables })

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
    .then(data => data.data.createMission)
}