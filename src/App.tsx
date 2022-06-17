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
import moonIcon from "../Assets/moon.png";

const APP_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    width: '100%',
    height: '90%'
}
const APP_DARK_STYLES: CSSProperties = {
    ...APP_STYLES,    
    backgroundColor: '#121212'
}
const CONTAINER_STYLES: CSSProperties = {
    backgroundColor: 'rgb(218, 218, 218)',
    height: '100%',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
    overflow: 'auto'
}
const CONTAINER_DARK_STYLES: CSSProperties = {
    ...CONTAINER_STYLES,
    backgroundColor: '#121212',
    borderRight: '2px solid #BB86FC',
    borderLeft: '2px solid #BB86FC'
}
const BUTTON_STYLES: CSSProperties = {
    height: 'fit-content',
    width: 'fit-content',
    position: 'absolute',
    top: '5%',
    left: '3%',
}
const ICON_STYLES: CSSProperties = {
    height: 18,
    width: 18,
    cursor: 'pointer'
}

const App: React.FC = () => {
    const { showMissionModal } = useShowModalContext()
    const { localStorageMissions } = useLocalStorageMissionsContext()
    const { darkTheme, toggleDarkTheme } = useDarkThemeContext()
    
    const handleDarkModeButtonClick = () => toggleDarkTheme()

    return (
        <CurrentMissionProvider>
            <button style={BUTTON_STYLES} onClick={handleDarkModeButtonClick}>
                <img style={ICON_STYLES} src={moonIcon} alt="Theme button" />
            </button>
            <Title titleName={"The Modern Registry"} />
            <div style={darkTheme ? APP_DARK_STYLES : APP_STYLES}>
                <div style={darkTheme ? CONTAINER_DARK_STYLES : CONTAINER_STYLES}>
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