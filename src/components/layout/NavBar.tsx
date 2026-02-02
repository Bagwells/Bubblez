"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./Logo";
import { Btn } from "../ui/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { NavItems } from "@/utils/Navigation";
import { useModals } from "@/hooks/useModals";


const NavBar = () => {
  const pathname = usePathname();

  const [slider, setSlider] = useState<boolean>(false);
  const toggleSlider = () => {
    setSlider(!slider);
  };

  const { setOpenModal } = useModals();

  return (
    <div className="fixed top-0 left-0 w-screen h-18 z-60">
      <div className="flex bg-white border-3 border-[#00D5F521] w-full h-full justify-between lg:gap-8 items-center px-4 sm:px-8 md:px-16 xl:px-24 2xl:px-32">
        <Logo />
        <nav className="hidden lg:flex items-center xl:gap-6">
          {NavItems?.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item?.label}
                className={`font-jakarta text-sm border-b-[1.5px] px-6 rounded-[5px] text-nowrap text-black hover:text-primary ${isActive ? "border-b-primary-lite font-bold text-lg!" : " font-semibold border-b-transparent"}`}
              >
                <Link href={item.href}>{item.label}</Link>
              </div>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center w-fit gap-4">
          <Btn
            size="base"
            className="h-12 w-45 lg:text-xs xl:text-base"
            onClick={() => setOpenModal("Book")}
          >
            Book Now
          </Btn>
          <Btn
            size="base"
            className="h-12 flex items-center gap-2 lg:text-xs xl:text-base"
            backgroundType="outline"
            onClick={() => setOpenModal("Quote")}
          >
            Get a Free Quote <FaArrowRightLong />
          </Btn>
        </div>
        <div className="block lg:hidden text-primary">
          <HiOutlineMenuAlt3 onClick={toggleSlider} size={32} />
        </div>
      </div>
      <div
        className={`block lg:hidden w-screen h-svh
              ${slider ? "translate-x-0" : "-translate-x-[110%]"}
                transition-all duration-200 ease-linear fixed top-0 left-0 z-50 bg-[#F7FCFF]
              `}
      >
        <div className="flex flex-col justify-between gap-6 p-7.5">
          <div className="space-y-16 flex flex-col items-center">
            <div className="flex w-full items-center justify-between">
              <div />
              <Logo />
              <RiCloseFill onClick={toggleSlider} size={28} />
            </div>
            <nav className="flex flex-col gap-8 w-full max-w-62.5 md:max-w-md">
              {NavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <div
                    onClick={toggleSlider}
                    key={item?.label}
                    className={`font-jakarta flex justify-center text-sm border-b-[1.5px] px-6 rounded-[5px] hover:text-primary ${isActive ? "border-b-primary-lite font-bold text-lg!" : "text-black font-semibold border-b-transparent"}`}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </div>
                );
              })}
            </nav>
            <div className="flex flex-col items-center w-max gap-4">
                <Btn onClick={()=> {setOpenModal('Book'); toggleSlider()}}
                  size="base" className="h-12 w-full">
                    Book Now
                </Btn>
                <Btn onClick={()=> {setOpenModal('Quote'); toggleSlider()}}
                    size="base"
                    className="h-12 flex items-center gap-2"
                    backgroundType="outline"
                >
                    Get a Free Quote <FaArrowRightLong />
                </Btn>
            </div>
            <div className="flex flex-col items-center w-max gap-4">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
