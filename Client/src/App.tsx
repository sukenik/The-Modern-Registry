import React, { CSSProperties, useState } from 'react';
import { Header } from "./Components/Header";
import { SearchBar } from "./Components/SearchBar";
import { MissionList } from "./Components/MissionList";
import { CreateMissionButton } from "./Components/CreateMissionButton";
import { MissionModal } from "./Components/MissionModal";
import { CurrentMissionProvider } from "./Context/CurrentMissionContext";
import { useShowModalContext } from "./Context/ModalContext";
import { FilteringProvider } from "./Context/FilteringContext";
import { useStylesContext } from "./Context/StylesContext";
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
    const { darkTheme, isMobile } = useStylesContext()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    const missions = data?.getAllMissions || []

    const handleCloseUserModal = () => {
        setShowUserModal(false)
    }

    const handleOpenUserModal = () => {
        setShowUserModal(true)
    }

    return (
        <>
            <Header titleName={"The Modern Registry"} openUserModal={handleOpenUserModal} />
            <CurrentMissionProvider>
                <div style={darkTheme ? APP_DARK_STYLES : APP_STYLES}>
                    <div style={
                        darkTheme ? 
                            isMobile ? 
                                { ...CONTAINER_DARK_STYLES, width: '100%', borderRight: 'none', borderLeft: 'none' } : 
                                CONTAINER_DARK_STYLES
                            : 
                            isMobile ? { ...CONTAINER_STYLES, width: '100%' } : CONTAINER_STYLES
                    }>
                        <FilteringProvider>
                            <SearchBar />
                            <MissionList missionsData={missions} />
                        </FilteringProvider>
                    </div>
                </div>
                {!showMissionModal && <CreateMissionButton />}
                {showMissionModal && <MissionModal />}
            </CurrentMissionProvider>
            {showUserModal && <UserModal closeModal={handleCloseUserModal} />}
        </>
    )
}

export default App