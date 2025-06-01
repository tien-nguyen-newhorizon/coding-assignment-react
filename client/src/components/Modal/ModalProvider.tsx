import { createContext, useContext, useState, ReactNode } from 'react';
import Modal from './index';

type ModalOptions = {
  preventCloseOnOverlayClick?: boolean;
};

type ModalContextType = {
  open: (content: ReactNode, options?: ModalOptions) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({});

  const open = (content: ReactNode, options?: ModalOptions) => {
    setModalContent(content);
    setModalOptions(options || {});
    setIsModalOpen(true);
  };

  const close = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <Modal isOpen={isModalOpen} onClose={close} preventCloseOnOverlayClick={modalOptions.preventCloseOnOverlayClick}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext must be used within ModalProvider');
  return context;
};
