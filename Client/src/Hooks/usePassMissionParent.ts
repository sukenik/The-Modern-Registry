import { endpoint, passMissionParentQuery } from "../API/MissionQueries";

export function usePassMissionParent(id: string, parentId: string | null) {
    const variables = {
        id,
        parentId
    }

    const body = JSON.stringify({ query: passMissionParentQuery, variables })

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
    .then(data => data.data.passMissionParent)
}