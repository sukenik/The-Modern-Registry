import React, { CSSProperties } from "react";
import { useDarkThemeContext } from "../Context/DarkThemeContext";

const TITLE_STYLES: CSSProperties = {
    marginTop: -10,
    marginBottom: 0,
    padding: 15,
    textAlign: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'white',
    cursor: 'default'
}
const TITLE_DARK_STYLES: CSSProperties = {
    ...TITLE_STYLES,
    color: '#BB86FC', 
    borderBottom: '2px solid #BB86FC'
};

interface iTitleProps {
    titleName: string
};

export const Title: React.FC<iTitleProps> = ({ titleName }) => {
    const { darkTheme } = useDarkThemeContext()

    return (
        <header>
            <h1 style={darkTheme ? TITLE_DARK_STYLES : TITLE_STYLES}>
                {titleName}
            </h1>
        </header>
    );
};