import { hot } from "react-hot-loader";
import React, { CSSProperties } from 'react';
import { Title } from "./Components/Title";
import { FilterableMissionListContainer } from "./Components/FilterableMissionListContainer";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/CurrentMissionContext";
import { useShowModalContext } from "./Context/ShowModalContext";
import { LocalStorageMissionsProvider } from "./Context/LocalStorageMissionsContext";
import { DeleteModal } from "./Components/DeleteModal";
import { useDebounce } from "./Hooks/useDebounce";
import { FilteringProvider } from "./Context/FilteringContext";

const APP_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    width: '100%',
    height: '90%'
};

const App: React.FC = () => {
    const { showMissionModal, showDeleteModal } = useShowModalContext();
    const [debounceText, searchText, setSearchText] = useDebounce('', 500);
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

    return (
        <CurrentMissionProvider>
            <LocalStorageMissionsProvider>
                <FilteringProvider>
                    <Title titleName={"The Modern Registry"} />
                        <div style={APP_STYLES}>
                            <FilterableMissionListContainer>
                                <SearchBar searchText={searchText} handleSearchTextChange={handleSearchTextChange}  />
                                <MissionList debounceText={debounceText} />
                            </FilterableMissionListContainer>
                        </div>
                        {!showMissionModal && <CreateMissionButton />}
                        {showMissionModal && <MissionModal />}
                        {showDeleteModal && <DeleteModal />}
                </FilteringProvider>
            </LocalStorageMissionsProvider>
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);