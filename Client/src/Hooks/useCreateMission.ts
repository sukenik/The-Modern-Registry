import { SetStateAction, useEffect, useState } from "react";
import { createMissionQuery, endpoint } from "../API/MissionQueries";
import { Mission } from "../Custom-Typings/Mission";

export function useCreateMission(description: string, status: string, parentId: string | null): 
    [Mission, React.Dispatch<SetStateAction<Mission>>] {
    
    const [mission, setMission] = useState({} as Mission)

    useEffect(() => {
        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: createMissionQuery(description, status, parentId) })
        })
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Error fetching data")
            } else {
                return response.json()
            }
        })
        .then(data => console.log(data.data))
    }, [])  

    return [mission, setMission]
}