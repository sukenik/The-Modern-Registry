import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { useCurrentMissionContext } from "../Context/CurrentMissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission, MISSION_STATUS } from "../../../Entities/Mission";
import { hasChildren, iModalActionParams, modalAction } from "../Logic/helperFunctions";
import { getStatusElements, iFormFields, validateFormFields } from "../Logic/missionFormLogic";
import { Checkbox } from "./Checkbox";
import { useStylesContext } from "../Context/StylesContext";
import { LinkToMissionOptions } from "./LinkToMissionOptions";
import { useAllMissions, useCreateMission, useDeleteMission, useDeleteMissionChildren, usePassMissionParent, useUpdateMission } from "../API/MissionHooks";
import { getNewMission, getNewMissionUpdate } from "../Logic/createMissionLogic";
import { getSelfPlusChildrenMissions } from "../Logic/filterLinkToMissionFieldLogic";

const MISSION_FORM_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

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

const MissionForm: React.FC = () => {
    const { currentMission, setCurrentMission } = useCurrentMissionContext()
    
    const modalType = currentMission.id ? 'Edit' : 'Create'
    const initialValues = { 
        name: currentMission.description, 
        status: modalType === 'Create' ? 'default' : currentMission.status, 
        linkToMission: modalType === 'Create' ? 'default' : currentMission.parentId
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({} as iFormFields)
    const [isSubmit, setIsSubmit] = useState(false)
    const [checked, setChecked] = useState(false)

    const { showDeleteModal, setShowMissionModal, setShowDeleteModal} = useShowModalContext()
    const { darkTheme } = useStylesContext()
    
    const { data } = useAllMissions()
    const [createMission] = useCreateMission()
    const [updateMission] = useUpdateMission()
    const [deleteMission] = useDeleteMission()
    const [deleteMissionChildren] = useDeleteMissionChildren()
    const [passMissionParent] = usePassMissionParent()

    const statusElements = useMemo(() => getStatusElements(modalType, formValues), [])
    const labelText = "Delete linked children missions"

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            
            if (currentMission.id) {
                const missionUpdate: Mission = getNewMissionUpdate(
                    currentMission.id, 
                    formValues.name, 
                    formValues.status as MISSION_STATUS, 
                    formValues.linkToMission
                )

                updateMission({
                    variables: {
                        id: missionUpdate.id,
                        description: missionUpdate.description,
                        status: missionUpdate.status,
                        parentId: missionUpdate.parentId
                    }
                })

            } else {
                const missionToCreate: Mission = getNewMission(
                    formValues.name, 
                    formValues.status as MISSION_STATUS, 
                    formValues.linkToMission, 
                )
                
                createMission({
                    variables: {
                        id: missionToCreate.id,
                        description: missionToCreate.description,
                        status: missionToCreate.status,
                        parentId: missionToCreate.parentId
                    }
                })
            }

            modalAction({ setCurrentMission: setCurrentMission, setShowModal: setShowMissionModal } as iModalActionParams)
        }
    }, [formErrors])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleDelete = (mission: Mission, missions: Array<Mission>, checked: boolean) => {

        if (hasChildren(mission.id, missions)) {
            if (checked) {
                const missionsIdsToDelete = getSelfPlusChildrenMissions(mission, missions)
                    .filter(
                        deleteMission => mission.id !== deleteMission.id
                    ).map(mission => mission.id)

                deleteMissionChildren({
                    variables: {
                        childrenIds: missionsIdsToDelete
                    }
                })
                
            } else {
                passMissionParent({
                    variables: {
                        id: mission.id, 
                        parentId: mission.parentId
                    }
                })
            }
        }

        deleteMission({
            variables: {
                id: mission.id
            }
        })
        
        modalAction({ 
            setCurrentMission: setCurrentMission, 
            setShowModal: setShowMissionModal, 
            setIsDelete: setShowDeleteModal 
        } as iModalActionParams)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (showDeleteModal) {
            return handleDelete(currentMission, data?.getAllMissions, checked)
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

    return (
        <>
            {showDeleteModal ?
                hasChildren(currentMission.id, data?.getAllMissions) && 
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
                        defaultValue={currentMission.parentId ?? 'default'} 
                        onChange={handleChange} 
                        disabled={!data?.getAllMissions.length}
                        style={darkTheme ? SELECT_DARK_STYLES : SELECT_STYLES}
                    >
                        <LinkToMissionOptions />
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
    )
}

export default MissionForm