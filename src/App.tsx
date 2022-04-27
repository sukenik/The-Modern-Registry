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
import { missions } from "./data";
import { addMissionsToLocalStorage } from "./Logic/localStorage";

addMissionsToLocalStorage(missions);

const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMission, setCurrentMission] = useState(null);

    return (
        <>
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
                title={showEditModal ? 'Edit a Mission' : 'Create a Mission'}>
                    {showEditModal ? <EditMissionForm /> : <CreateMissionForm />}
            </MissionModal>
        </>
    );
};

export default hot(module)(App);