import { endpoint, updateMissionQuery } from "../API/MissionQueries";

export function useUpdateMission(description: string, status: string, parentId: string | null, id: string) {
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
            throw new Error("Error fetching data")
        } else {
            return response.json()
        }
    })
    .then(data => data.data.updateMission)
}