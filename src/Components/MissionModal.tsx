import React from "react";

interface Props {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
};

export const MissionModal: React.FC<Props> = ({children, showModal, setShowModal, title}) => {
    if (!showModal) {
        return null;
    }

    const handleOutsideClick = () => setShowModal(false);
    const handleCancelClick = () => setShowModal(false);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();
    
    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h4 className="modal-title">{title}</h4>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button 
                        className="button"
                        id="SaveButton">Save</button>
                    <button
                        onClick={handleCancelClick} 
                        className="button"
                        id="CancelButton">Cancel</button>
                </div>
            </div>
        </div>
    );
};