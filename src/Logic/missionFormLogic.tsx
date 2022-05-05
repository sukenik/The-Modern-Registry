import React from "react";
import { Mission } from "../Custom-Typings/Mission";

export interface iFormFields {
    name?: string,
    status?: string,
    linkToMission?: string
};
export const validateFormFields = (values: iFormFields) => {
    const errors = {} as iFormFields;
    const regex = /\bActive\b|\bComplete\b/;
    if (!values.name) {
        errors.name = 'Name is required!';
    }
    if (!values.status) {
        errors.status = 'Status is required!';
    } else if (!regex.test(values.status)) {
        errors.status = 'This is not a valid status';
    }
    return errors;
};
export const getStatusElements = (modalType: string, formValues: iFormFields) => {
    return modalType === 'Create' ? 
        ['Active', 'Complete'].map(status => <option key={status} value={status}>{status}</option>) : 
        ['Active', 'Complete'].map(status => 
            <option key={status} value={status} hidden={formValues.status === status}>{status}</option>);
};
export const getMissionsToLinkElements = (linkToMissionOptions: Mission[]) => {
    return linkToMissionOptions.map(
        mission => <option key={mission.id} value={mission.id}>
            {mission.description}
        </option>
    );
};
export const getDefaultLinkToMissionElement = (formValues: iFormFields, hasMissionsForLink: boolean) => {
    return formValues.linkToMission === 'default' ? 
        <option value="default" disabled hidden>
            Choose a mission...
        </option> :
        <option value={formValues.linkToMission} disabled hidden>
            {hasMissionsForLink ? 'Can\'t link the mission' : formValues.linkToMission}
        </option>
};