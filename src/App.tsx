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

const localStorageKeys: Array<string> = getLocalStorageKeys();

const App: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();
    const [localStorageMissions, setLocalStorageMissions] = useState(getMissionsFromLocalStorage(localStorageKeys));

    return (
        <CurrentMissionProvider>
            <Title />
            <div id='app-flex'>
                <FilterableMissionListContainer>
                    <SearchBar />
                    <MissionList
                        setShowModal={setShowModal}
                        localStorageMissions={localStorageMissions}
                        setLocalStorageMissions={setLocalStorageMissions}  />
                </FilterableMissionListContainer>
            </div>
            {!showModal && <CreateMissionButton setShowModal={setShowModal} />}
            <MissionModal 
                localStorageMissions={localStorageMissions} 
                setLocalStorageMissions={setLocalStorageMissions}
                localStorageKeys={localStorageKeys} />
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);