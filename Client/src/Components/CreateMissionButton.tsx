import React, { CSSProperties } from "react";
import createMissionIcon from "../../Assets/add-tasks-g68f2c05f3_640.png";
import createMissionDarkIcon from "../../Assets/write-g4ef86eb46_640.png";
import { useDarkThemeContext } from "../Context/DarkThemeContext";
import { useShowModalContext } from "../Context/ModalContext";

const BUTTON_STYLES: CSSProperties = {
    height: 'fit-content',
    width: 'fit-content',
    position: 'absolute',
    bottom: '5%',
    left: '3%',
    border: 'none',
    background: 'transparent'
}
const ICON_STYLES: CSSProperties = {
    height: 64,
    width: 64,
    cursor: 'pointer'
}

export const CreateMissionButton: React.FC = () => {
    const { setShowMissionModal } = useShowModalContext()
    const { darkTheme } = useDarkThemeContext()

    const handleCreateMissionButtonClick = () => setShowMissionModal(true)

    return (
        <button style={BUTTON_STYLES} onClick={handleCreateMissionButtonClick} type="submit">
            <img style={ICON_STYLES} src={darkTheme ? createMissionDarkIcon : createMissionIcon} alt="Create a mission button" />
        </button>
    )
}