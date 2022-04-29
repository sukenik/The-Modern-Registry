import { hot } from "react-hot-loader";
import React, { useState } from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionList } from "./Components/FilterableMissionList";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CreateMissionForm } from "./Components/CreateMissionForm";
import { MissionForm } from "./Components/MissionForm";
import { missions } from "./data";
import { addMissionsToLocalStorage } from "./Logic/localStorage";
import { CurrentMissionProvider, useCurrentMission } from "./Context/MissionContext";
import { ShowModalProvider, useShowModalContext } from "./Context/ModalContext";

addMissionsToLocalStorage(missions);

const App: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <CurrentMissionProvider>
            <Title />
            <div id='app-flex'>
                <FilterableMissionList>
                    <SearchBar />
                    <MissionList missions={missions} setShowEditModal={setShowEditModal} setShowModal={setShowModal} />
                </FilterableMissionList>
            </div>
            {!showModal && <CreateMissionButton setShowModal={setShowModal} setShowEditModal={setShowEditModal} />}
            <MissionModal />
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);