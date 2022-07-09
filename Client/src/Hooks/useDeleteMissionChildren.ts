import { deleteMissionChildrenQuery, endpoint } from "../API/MissionQueries";

export function useDeleteMissionChildren(childrenIds: Array<string>) {
    const variables = {
        childrenIds
    }

    const body = JSON.stringify({ query: deleteMissionChildrenQuery, variables })

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
    .then(data => data.data.deleteMissionChildren)
}