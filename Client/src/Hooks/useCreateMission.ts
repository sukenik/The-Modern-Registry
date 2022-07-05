import { createMissionQuery, endpoint } from "../API/MissionQueries";

export function useCreateMission(description: string, status: string, parentId: string | null) {
    const variables = {
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
            throw new Error("Error fetching data")
        } else {
            return response.json()
        }
    })
    .then(data => console.log(data))
}