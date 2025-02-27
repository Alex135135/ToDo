import React from 'react';
import './Modal.css';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void; 
    children: ReactNode; 
  
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>Закрыть</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
