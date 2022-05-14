import React from "react";
import ReactDOM from "react-dom";
import { useCurrentMission } from "../Context/MissionContext";
import { useShowModalContext } from "../Context/ModalContext";
import { Mission } from "../Custom-Typings/Mission";

// interface iDeleteModalProps {
//     showDeleteModal: boolean,
//     setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
// }

const portal = document.getElementById('portal') as HTMLElement;
export const DeleteModal: React.FC = () => {
    const { showDeleteModal, setShowDeleteModal } = useShowModalContext();
    const { currentMission } = useCurrentMission();
    if (!showDeleteModal) return null;
    const handleCancelButtonClick = () => setShowDeleteModal(false);
    const handleDeleteButtonClick = () => console.log('Delete click');
    const handleOutsideClick = () => setShowDeleteModal(false);
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();

    return ReactDOM.createPortal(
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={handleContentClick}>
                <div className="modal-header">
                    <h4 className="modal-title">Are you sure you want to delete "{currentMission.description}"?</h4>
                </div>
                <div className="modal-body">
                    <button onClick={handleDeleteButtonClick}>Delete</button>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                </div>
            </div>
        </div>,
        portal
    );
}