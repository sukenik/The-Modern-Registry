import React, { CSSProperties } from "react";
import { useDarkThemeContext } from "../Context/DarkThemeContext";

const CHECKBOX_DARK_STYLES: CSSProperties = {
    backgroundColor: '#BB86FC'
}
const LABEL_DARK_STYLES: CSSProperties = {
    color: '#BB86FC'
}

interface iCheckboxProps {
    label: string,
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
};

export const Checkbox: React.FC<iCheckboxProps> = ({ label, checked, setChecked }) => {
    const { darkTheme } = useDarkThemeContext()
    const handleCheckboxChange = () => setChecked(prevState => !prevState)
    
    return (
        <label style={darkTheme ? LABEL_DARK_STYLES : {}}>
            <input style={darkTheme ? CHECKBOX_DARK_STYLES : {}} type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            {label}
        </label>
    );
};