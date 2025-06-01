import { createPortal } from 'react-dom';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  preventCloseOnOverlayClick?: boolean;
};

const Modal = ({ children, onClose, isOpen, preventCloseOnOverlayClick = false }: Props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShowModal(true));
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, isOpen]);

  if (!isOpen && !showModal) return null;

  return createPortal(
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-300 ease-in-out
        ${showModal ? 'opacity-100' : 'opacity-0'}
        ${showModal ? 'bg-transparent bg-opacity-30 backdrop-blur-sm' : 'bg-transparent'}
      `}
      onClick={(e) => {
        if (!preventCloseOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`
          bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative
          transition-all duration-300 ease-in-out
          ${showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cursor-pointer absolute top-2 right-2 text-gray-400 text-2xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
