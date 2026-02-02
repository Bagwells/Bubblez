"use client";

import { useModal } from "@/contexts/ModalContext";

/**
 * Hook to open/close the app modal from any component.
 * Uses ModalContext under the hood so state is shared app-wide.
 */
export const useModals = () => {
  return useModal();
};
