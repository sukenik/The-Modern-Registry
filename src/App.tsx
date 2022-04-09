import { hot } from "react-hot-loader";
import React, { useState } from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionList } from "./Components/FilterableMissionList";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CreateMissionForm } from "./Components/CreateMissionForm";
import { EditMissionForm } from "./Components/EditMissionForm";
import { giveGenerations } from "./Logic/SubMissionLogic";

export interface Mission {
    id: number,
    description: string,
    status: 'Active' | 'Complete',
    fatherID: number | null,
    subMissions: Array<Mission>,
    generation?: number
};

export const missions: Array<Mission> = [
    {id: 1, description: 'Mission 1', status: 'Active', fatherID: null, subMissions: []},
    {id: 2, description: 'Sub-mission 1', status: 'Active', fatherID: 1, subMissions: []},
    {id: 3, description: 'Sub-sub-mission 1', status: 'Active', fatherID: 2, subMissions: []},
    {id: 4, description: 'Mission 2', status: 'Active', fatherID: null, subMissions: []},
    {id: 5, description: 'Mission 3', status: 'Active', fatherID: null, subMissions: []},
    {id: 6, description: 'Sub-mission 3', status: 'Complete', fatherID: 5, subMissions: []},
];

const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div>
            <Title />
            <div id='app-flex'>
                <FilterableMissionList>
                    <SearchBar />
                    <MissionList missions={missions} setShowEditModal={setShowEditModal} setShowModal={setShowModal} />
                </FilterableMissionList>
            </div>
            {!showModal && <CreateMissionButton setShowModal={setShowModal} setShowEditModal={setShowEditModal} />}
            <MissionModal 
                setShowModal={setShowModal} 
                showModal={showModal} 
                title={showEditModal ? 'Edit mission' : 'Create mission'}>
                    {showEditModal ? <EditMissionForm /> : <CreateMissionForm />}
            </MissionModal>
        </div>
    );
};

export default hot(module)(App);