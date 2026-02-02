"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { Modal } from "@/components/layout/Modal";
import { BookService } from "@/components/modals/bookService";
import { FreeQuote } from "@/components/modals/freeQuote";

// Close handler for modal content (e.g. close button inside modal)
type ModalCloseContextValue = (() => void) | null;

const ModalCloseContext = createContext<ModalCloseContextValue>(null);

export const ModalCloseProvider = ModalCloseContext.Provider;

export function useModalClose(): ModalCloseContextValue {
  return useContext(ModalCloseContext);
}

// Which modal is open - shared across the app
export type OpenModalType = "Book" | "Quote" | null;

type ModalStateContextValue = {
  openModal: OpenModalType;
  setOpenModal: (modal: OpenModalType) => void;
};

const ModalStateContext = createContext<ModalStateContextValue | null>(null);

function modalView(openModal: OpenModalType) {
  switch (openModal) {
    case "Book":
      return <BookService />;
    case "Quote":
      return <FreeQuote />;
    default:
      return null;
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModalState] = useState<OpenModalType>(null);
  // Only render modal after mount so server and client initial output match (avoids hydration error)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer modal DOM until after hydration so server and client both render null initially
    // eslint-disable-next-line -- intentional: setState in effect is required to avoid hydration mismatch
    setMounted(true);
  }, []);

  const setOpenModal = useCallback((modal: OpenModalType) => {
    setOpenModalState(modal);
  }, []);

  const modalNode = (
    <Modal display={openModal} close={() => setOpenModal(null)}>
      {modalView(openModal)}
    </Modal>
  );

  return (
    <ModalStateContext.Provider value={{ openModal, setOpenModal }}>
      {children}
      {mounted && typeof document !== "undefined"
        ? createPortal(modalNode, document.body)
        : null}
    </ModalStateContext.Provider>
  );
}

export function useModal(): ModalStateContextValue {
  const ctx = useContext(ModalStateContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
}
