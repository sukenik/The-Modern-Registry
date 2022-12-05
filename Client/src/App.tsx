import React, { CSSProperties, useState } from 'react';
import { Header } from "./Components/Header";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/CurrentMissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { FilteringProvider } from "./Context/FilteringContext";
import { useDarkThemeContext } from "./Context/DarkThemeContext";
import UserModal from './Components/UserModal';
import { useAllMissions } from './API/MissionHooks';

const APP_STYLES: CSSProperties = {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'fixed',
    width: '100%',
    height: '100%'
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
    margin: 'auto'
}

const CONTAINER_DARK_STYLES: CSSProperties = {
    ...CONTAINER_STYLES,
    backgroundColor: '#121212',
    borderRight: '2px solid #BB86FC',
    borderLeft: '2px solid #BB86FC',
    colorScheme: 'dark'
}

const App: React.FC = () => {
    const [showUserModal, setShowUserModal] = useState(false)
    const { loading, error, data } = useAllMissions()
    const { showMissionModal } = useShowModalContext()
    const { darkTheme } = useDarkThemeContext()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <>
            <Header titleName={"The Modern Registry"} setIsModalOpen={setShowUserModal} />
            <CurrentMissionProvider>
                <div style={darkTheme ? APP_DARK_STYLES : APP_STYLES}>
                    <div style={darkTheme ? CONTAINER_DARK_STYLES : CONTAINER_STYLES}>
                        <FilteringProvider>
                            <SearchBar />
                            <MissionList missionsData={data?.getAllMissions} />
                        </FilteringProvider>
                    </div>
                </div>
                {!showMissionModal && <CreateMissionButton />}
                {showMissionModal && <MissionModal />}
            </CurrentMissionProvider>
            {showUserModal && <UserModal setIsModalOpen={setShowUserModal} />}
        </>
    )
}

export default App