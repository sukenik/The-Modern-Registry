import React, { CSSProperties, useEffect, useState } from "react";
import { useLocalStorageMissionsContext } from "../Context/LocalStorageMissionsContext";
import { useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";
import { getLinkToMissionOptions } from "../Logic/filterLinkToMissionFieldLogic";
import { hasChildren, iModalActionParams, modalAction } from "../Logic/helperFunctions";
import { getDefaultLinkToMissionElement, getMissionsToLinkElements, getStatusElements, iFormFields, onDelete, validateFormFields } from "../Logic/missionFormLogic";
import { getMissionsData } from "../Logic/subMissionLogic";
import { Checkbox } from "./Checkbox";
import { getLocalStorageKeys, getLocalStorageMissions } from "../Logic/localStorageLogic";
import { useDarkThemeContext } from "../Context/DarkThemeContext";

const MISSION_FORM_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
};
const LABEL_INPUT_STYLES: CSSProperties = {
    margin: 5,
    width: '80%'
}
const LABEL_INPUT_DARK_STYLES: CSSProperties = {
    ...LABEL_INPUT_STYLES,
    color: '#BB86FC',
    fontWeight: 'lighter'
}
const INPUT_DARK_STYLES: CSSProperties = {
    ...LABEL_INPUT_STYLES,
    backgroundColor: '#121212',
    border: '1px solid rgb(120, 120, 120)',
    color: 'white'
}
const SELECT_STYLES: CSSProperties = {
    width: '35%',
    textAlign: 'center',
    margin: 5,
    cursor: 'pointer'
}
const SELECT_DARK_STYLES: CSSProperties = {
    ...SELECT_STYLES,
    backgroundColor: '#121212',
    color: 'rgb(120, 120, 120)'
}
const ERROR_STYLES: CSSProperties = {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 5,
    fontSize: 15,
    color: '#B00020'
}
const BUTTON_STYLES: CSSProperties = {
    backgroundColor: 'cornflowerblue',
    border: 'none',
    color: 'white',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    fontSize: 16,
    cursor: 'pointer',
    margin: 5
}
const BUTTON_DARK_STYLES: CSSProperties = {
    ...BUTTON_STYLES,
    backgroundColor: '#5700d5'
}

interface iMissionFormProps {
    mission: Mission,
    handleSave: (name: string, status: string, linkToMission: string | null, mission: Mission) => Array<Mission>
};

export const MissionForm: React.FC<iMissionFormProps> = ({ mission, handleSave }) => {
    const modalType = mission.id ? 'Edit' : 'Create'
    const initialValues = { 
        name: mission.description, 
        status: modalType === 'Create' ? 'default' : mission.status, 
        linkToMission: modalType === 'Create' ? 'default' : mission.parentID
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({} as iFormFields)
    const [isSubmit, setIsSubmit] = useState(false)
    const [checked, setChecked] = useState(false)

    const { showDeleteModal, setShowMissionModal, setShowDeleteModal} = useShowModalContext()
    const { localStorageMissions, setLocalStorageMissions } = useLocalStorageMissionsContext()
    const { setCurrentMission } = useCurrentMissionContext()
    const { darkTheme } = useDarkThemeContext()

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLocalStorageMissions(handleSave(formValues.name, formValues.status, formValues.linkToMission, mission))
            modalAction({ setCurrentMission: setCurrentMission, setShowModal: setShowMissionModal } as iModalActionParams)
        }
    }, [formErrors])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }
    const handleDelete = (mission: Mission, localStorageMissions: Array<Mission>, checked: boolean) => {
        onDelete(mission, localStorageMissions, checked)
        setLocalStorageMissions(getMissionsData(getLocalStorageMissions(getLocalStorageKeys())))
        
        modalAction({ 
            setCurrentMission: setCurrentMission, 
            setShowModal: setShowMissionModal, 
            setIsDelete: setShowDeleteModal 
        } as iModalActionParams)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (showDeleteModal) {
            return handleDelete(mission, localStorageMissions, checked)
        }
        setFormErrors(validateFormFields(formValues))
        setIsSubmit(true)
    }
    const handleCancelClick = (e: React.FormEvent) => {
        e.preventDefault()
        modalAction({ 
            setCurrentMission: setCurrentMission, 
            setShowModal: setShowMissionModal, 
            setIsDelete: setShowDeleteModal 
        } as iModalActionParams)
    }

    const statusElements = getStatusElements(modalType, formValues)
    const linkToMissionOptions = getLinkToMissionOptions(mission, getMissionsData(localStorageMissions))
    const missionsFitToLinkOptionElements = getMissionsToLinkElements(linkToMissionOptions)
    const defaultLinkToMissionOption = getDefaultLinkToMissionElement(mission, getMissionsData(localStorageMissions))
    const labelText = "Delete linked children missions"

    return (
        <>
            {showDeleteModal ?
                hasChildren(mission.id, localStorageMissions) && 
                    <Checkbox checked={checked} setChecked={setChecked} label={labelText} /> 
                :
                <form style={MISSION_FORM_STYLES} onSubmit={handleSubmit}>
                    <label style={darkTheme ? LABEL_INPUT_DARK_STYLES : LABEL_INPUT_STYLES}>Name:</label>
                    <input 
                        name="name" 
                        type="text" 
                        placeholder="Name" 
                        value={formValues.name} 
                        onChange={handleChange} 
                        maxLength={50}
                        autoComplete="off"
                        style={darkTheme ? INPUT_DARK_STYLES : LABEL_INPUT_STYLES} 
                    />
                    <p style={ERROR_STYLES}>{ formErrors.name }</p>
                    <label style={darkTheme ? LABEL_INPUT_DARK_STYLES : LABEL_INPUT_STYLES}>Status:</label>
                    <select 
                        name="status" 
                        defaultValue={formValues.status} 
                        onChange={handleChange} 
                        style={darkTheme ? SELECT_DARK_STYLES : SELECT_STYLES}
                    >
                        <option value="default" disabled hidden>
                            Choose a status...
                        </option>
                        {statusElements}
                    </select>
                    <p style={ERROR_STYLES}>{ formErrors.status }</p>
                    <label style={darkTheme ? LABEL_INPUT_DARK_STYLES : LABEL_INPUT_STYLES}>Link to mission:</label>
                    <select 
                        name="linkToMission" 
                        defaultValue={mission.parentID ?? 'default'} 
                        onChange={handleChange} 
                        disabled={mission.parentID ? false : !missionsFitToLinkOptionElements.length}
                        style={darkTheme ? SELECT_DARK_STYLES : SELECT_STYLES}
                    >
                        {defaultLinkToMissionOption}
                        {mission.parentID ?? <option value="default"></option>}
                        {missionsFitToLinkOptionElements}
                    </select>
                </form>
            }
            <div style={{ marginTop: 20 }}>
                <button 
                    style={darkTheme ? 
                        {...BUTTON_DARK_STYLES, paddingRight : 20, paddingLeft: 20} : 
                        {...BUTTON_STYLES, paddingRight : 20, paddingLeft: 20}} 
                    onClick={handleSubmit} type="submit"
                >
                    {showDeleteModal ? 'Delete' : 'Save'}
                </button>
                <button style={{...BUTTON_STYLES, backgroundColor : 'rgb(49, 49, 49)'}} onClick={handleCancelClick}>
                    Cancel
                </button>
            </div>
        </>
    );
};