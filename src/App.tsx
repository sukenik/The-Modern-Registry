import { hot } from "react-hot-loader";
import React, { CSSProperties } from 'react';
import { Title } from "./Components/Title";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/CurrentMissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { useLocalStorageMissionsContext } from "./Context/LocalStorageMissionsContext";
import { FilteringProvider } from "./Context/FilteringContext";
import { useDarkThemeContext } from "./Context/DarkThemeContext";

const APP_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    width: '100%',
    height: '90%'
};
const APP_DARK_STYLES: CSSProperties = {
    ...APP_STYLES,    
    backgroundColor: 'black'
};
const CONTAINER_STYLES: CSSProperties = {
    backgroundColor: 'rgb(218, 218, 218)',
    height: '100%',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
    overflow: 'auto'
};

const App: React.FC = () => {
    const { showMissionModal, showDeleteModal } = useShowModalContext()
    const { localStorageMissions } = useLocalStorageMissionsContext()
    const { darkTheme } = useDarkThemeContext()

    return (
        <CurrentMissionProvider>
            <Title titleName={"The Modern Registry"} />
            <div style={darkTheme ? APP_DARK_STYLES : APP_STYLES}>
                <div style={CONTAINER_STYLES}>
                    <FilteringProvider>
                        <SearchBar />
                        <MissionList missionsData={localStorageMissions} />
                    </FilteringProvider>
                </div>
            </div>
            {!showMissionModal && <CreateMissionButton />}
            {showMissionModal && <MissionModal />}
        </CurrentMissionProvider>
    );
};

export default hot(module)(App);