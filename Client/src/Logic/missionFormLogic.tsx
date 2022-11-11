import React from "react"
import { Mission } from "../../../Entities/Mission"

export interface iFormFields {
    name?: string,
    status?: string,
    linkToMission?: string | null
}

export const validateFormFields = (values: iFormFields) => {
    const errors = {} as iFormFields
    const regex = /\bActive\b|\bComplete\b/

    if (!values.name) {
        errors.name = 'Name is required!'
    }
    if (!values.status) {
        errors.status = 'Status is required!'
    } else if (!regex.test(values.status)) {
        errors.status = 'This is not a valid status'
    }
    return errors
}

export const getStatusElements = (modalType: string, formValues: iFormFields) => {
    return modalType === 'Create' ? 
        ['Active', 'Complete'].map(status => <option key={status} value={status}>{status}</option>) : 
        ['Active', 'Complete'].map(status => 
            <option key={status} value={status} hidden={formValues.status === status}>{status}</option>
        )
}

export const getMissionsToLinkElements = (linkToMissionOptions: Array<Mission>) => 
    linkToMissionOptions.map(mission => 
        <option key={mission.id} value={mission.id}>
            {mission.description}
        </option>
    )

export const getDefaultLinkToMissionElement = (mission: Mission, missions: Array<Mission>) => {
    if (mission.parentId) {
        return (
                <>
                    {getUnlinkOptionElement()} 
                    <option value={mission.parentId} disabled hidden>
                        {getMissionNameByID(mission.parentId, missions)}
                    </option>
                </>
        )
    }
    return (<option value="default" disabled hidden></option>)
}

const getMissionNameByID = (id: string, missions: Array<Mission>) => (
    missions.filter(mission => mission.id === id)[0].description
)

const getUnlinkOptionElement = () => (
    <option style={{ color: 'red' }} value="default">Unlink from parent</option>
)