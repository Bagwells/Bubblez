import { ModalCloseProvider } from "@/contexts/ModalContext";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";


interface ModalProps {
  children?: React.ReactNode;
  close?: () => void;
  position?: "fixed" | "absolute";
  className?: string;
  display?: string | null;
  yAxis?: string;
  xAxis?: string;
}

export const Modal: React.FC<ModalProps> = ({
  display,
  yAxis = "top-0",
  xAxis = "left-0",
  children,
  close,
  position = "fixed",
  className,
}) => {
  useEffect(() => {
    if (display) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [display]);

  return (
  <ModalCloseProvider value={close ?? null}>
    <div
      id="modal"
      onClick={close}
      className={`${
        display ? "flex" : "hidden"
      } ${position} ${className} ${yAxis} ${xAxis} items-center justify-center bg-black/70 backdrop-blur-sm w-screen h-screen p-2 z-90`}
    >
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden max-w-7xl max-h-[85vh]">
        <div onClick={close} className="flex w-full shrink-0 items-center justify-end px-6 pt-6">
          <MdClose size={20} className="text-red-700 lg:text-xl" />
        </div>
        <div
          id="content"
          onClick={(e) => e.stopPropagation()}
          className="min-h-0 flex-1 overflow-y-auto bg-white w-full p-4 lg:p-6"
        >
          {children}
        </div>
      </div>
    </div>
  </ModalCloseProvider>
  );
};
