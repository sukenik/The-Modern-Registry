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
import { LocalStorageMissionsProvider } from "./Context/LocalStorageMissionsContext";
import { DeleteModal } from "./Components/DeleteModal";
import { useDebounce } from "./Hooks/useDebounce";

const App: React.FC = () => {
    const { showMissionModal, showDeleteModal } = useShowModalContext();
    const [debounceText, searchText, setSearchText] = useDebounce('', 500);
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

    return (
        <CurrentMissionProvider>
            <LocalStorageMissionsProvider>
                <Title titleName={"The Modern Registry"} />
                <div id='app-flex'>
                    <FilterableMissionListContainer>
                        <SearchBar searchText={searchText} handleSearchTextChange={handleSearchTextChange}  />
                        <MissionList debounceText={debounceText} />
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