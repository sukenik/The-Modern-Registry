import { hot } from "react-hot-loader";
import React, { CSSProperties } from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionListContainer } from "./Components/FilterableMissionListContainer";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/MissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { useLocalStorageMissionsContext } from "./Context/LocalStorageMissionsContext";
import { DeleteModal } from "./Components/DeleteModal";
import { FilteringProvider } from "./Context/FilteringContext";

const APP_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    width: '100%',
    height: '90%'
};

const App: React.FC = () => {
    const { showMissionModal, showDeleteModal } = useShowModalContext()
    const { localStorageMissions } = useLocalStorageMissionsContext()

    return (
        <CurrentMissionProvider>
            <Title titleName={"The Modern Registry"} />
            <div style={APP_STYLES}>
                <FilterableMissionListContainer>
                    <FilteringProvider>
                        <SearchBar />
                        <MissionList missionsData={localStorageMissions} />
                    </FilteringProvider>
                </FilterableMissionListContainer>
            </div>
            {!showMissionModal && <CreateMissionButton />}
            {showMissionModal && <MissionModal />}
            {showDeleteModal && <DeleteModal />}
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);