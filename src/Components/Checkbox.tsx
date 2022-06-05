import React from "react";

interface iCheckboxProps {
    label: string,
    checked: boolean,
    handleCheckboxChange: () => void
};

export const Checkbox: React.FC<iCheckboxProps> = ({ label, checked, handleCheckboxChange }) => {
    return (
        <label>
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            {label}
        </label>
    );
};