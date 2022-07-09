import { SetStateAction, useEffect, useState } from "react";
import { endpoint, getAllMissionsQuery } from "../API/MissionQueries";
import { Mission } from "../Custom-Typings/Mission";

export function useAllMissions(): [Array<Mission>, React.Dispatch<SetStateAction<Mission[]>>] {
    const [missions, setMissions] = useState([] as Array<Mission>)

    useEffect(() => {
        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: getAllMissionsQuery })
        })
        .then(response => {
            if (response.status >= 400) {
                throw new Error(`Error fetching data. status: ${response.status}`)
            } else {
                return response.json()
            }
        })
        .then(data => setMissions(data.data.getAllMissions))
    }, [])    

    return [missions, setMissions]
}