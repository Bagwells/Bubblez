import { ModalCloseProvider } from "@/contexts/ModalContext";
import React from "react";
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
  return (
    <div
      id="modal"
      onClick={close}
      className={`${
        display ? "flex" : "hidden"
      } ${position} ${className} ${yAxis} ${xAxis} items-center justify-center bg-black/70 backdrop-blur-sm w-screen h-screen p-2 z-90`}
    >
      <div className=" bg-white rounded-2xl overflow-hidden">
        <div onClick={close} className={`flex w-full items-center justify-end px-6 pt-6`}>
          <MdClose size={20} className={"text-red-700 lg:text-xl"} />
        </div>
        <ModalCloseProvider value={close ?? null}>
          <div
            id="content"
            onClick={(e) => e.stopPropagation()}
            className={`bg-white w-fit p-6 overflow-y-auto h-max max-w-7xl max-h-[780px]`}
          >
            {children}
          </div>
        </ModalCloseProvider>
      </div>
    </div>
  );
};
