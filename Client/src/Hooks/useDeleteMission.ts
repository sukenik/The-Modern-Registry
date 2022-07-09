import { deleteMissionQuery, endpoint } from "../API/MissionQueries";

export function useDeleteMission(id: string) {
    const variables = {
        id
    }

    const body = JSON.stringify({ query: deleteMissionQuery, variables })

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
    .then(data => data.data.deleteMission)
}