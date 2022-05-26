import { hot } from "react-hot-loader";
import React from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionListContainer } from "./Components/FilterableMissionListContainer";
import { SearchBar } from "./Components/SearchBar";
import { MissionListContainer } from "./Components/MissionListContainer";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/MissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { LocalStorageMissionsProvider } from "./Context/LocalStorageMissionsContext";
import { DeleteModal } from "./Components/DeleteModal";

const App: React.FC = () => {
    const { showMissionModal, showDeleteModal } = useShowModalContext();
    
    return (
        <CurrentMissionProvider>
            <LocalStorageMissionsProvider>
                <Title titleName={"The Modern Registry"} />
                <div id='app-flex'>
                    <FilterableMissionListContainer>
                        <SearchBar />
                        <MissionListContainer />
                    </FilterableMissionListContainer>
                </div>
                {!showMissionModal && <CreateMissionButton />}
                {showMissionModal && <MissionModal />}
                {showDeleteModal && <DeleteModal />}
            </LocalStorageMissionsProvider>
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);