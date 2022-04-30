import { hot } from "react-hot-loader";
import React from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionListContainer } from "./Components/FilterableMissionListContainer";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { missions } from "./data";
import { addMissionsToLocalStorage } from "./Logic/localStorage";
import { CurrentMissionProvider } from "./Context/MissionContext";
import { useShowModalContext } from "./Context/ModalContext";

addMissionsToLocalStorage(missions);

const App: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();

    return (
        <CurrentMissionProvider>
            <Title />
            <div id='app-flex'>
                <FilterableMissionListContainer>
                    <SearchBar />
                    <MissionList missions={missions} setShowModal={setShowModal} />
                </FilterableMissionListContainer>
            </div>
            {!showModal && <CreateMissionButton setShowModal={setShowModal} />}
            <MissionModal />
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);