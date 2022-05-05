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

const keys: Array<string> = getLocalStorageKeys();

const App: React.FC = () => {
    const { showModal, setShowModal } = useShowModalContext();
    const [localStorageMissions, setlocalStorageMissions] = useState(getMissionsFromLocalStorage(keys));

    return (
        <CurrentMissionProvider>
            <Title />
            <div id='app-flex'>
                <FilterableMissionListContainer>
                    <SearchBar />
                    <MissionList
                        setShowModal={setShowModal}
                        localStorageMissions={localStorageMissions}
                        setlocalStorageMissions={setlocalStorageMissions}  />
                </FilterableMissionListContainer>
            </div>
            {!showModal && <CreateMissionButton setShowModal={setShowModal} />}
            <MissionModal 
                localStorageMissions={localStorageMissions} 
                setlocalStorageMissions={setlocalStorageMissions}
                keys={keys} />
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);