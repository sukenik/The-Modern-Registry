import { hot } from "react-hot-loader";
import React, { useState } from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionListContainer } from "./Components/FilterableMissionListContainer";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/MissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { getLocalStorageKeys, getMissionsFromLocalStorage } from "./Logic/localStorageLogic";
import { DeleteModal } from "./Components/DeleteModal";

const localStorageKeys: Array<string> = getLocalStorageKeys();

const App: React.FC = () => {
    const { showMissionModal, setShowMissionModal } = useShowModalContext();
    const [localStorageMissions, setLocalStorageMissions] = useState(getMissionsFromLocalStorage(localStorageKeys));

    return (
        <CurrentMissionProvider>
            <Title />
            <div id='app-flex'>
                <FilterableMissionListContainer>
                    <SearchBar />
                    <MissionList
                        setShowModal={setShowMissionModal}
                        localStorageMissions={localStorageMissions}
                        setLocalStorageMissions={setLocalStorageMissions}  />
                </FilterableMissionListContainer>
            </div>
            {!showMissionModal && <CreateMissionButton setShowModal={setShowMissionModal} />}
            <MissionModal 
                localStorageMissions={localStorageMissions} 
                setLocalStorageMissions={setLocalStorageMissions}
                localStorageKeys={localStorageKeys} />
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);