import React from "react";

interface iCheckboxProps {
    label: string,
    checked: boolean,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
};

export const Checkbox: React.FC<iCheckboxProps> = ({ label, checked, setChecked }) => {
    const handleCheckboxChange = () => setChecked(prevState => !prevState)

    return (
        <label>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            {label}
        </label>
    );
};