'use client'
import { Btn } from "@/components/ui/Button";
import clean from "../../../public/clean.svg";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { useModals } from "@/hooks/useModals";

export const ServicesHero = () => {
  const { setOpenModal } = useModals();
  return (
    <div className="flex flex-col justify-center items-center w-full h-80vh xl:h-screen py-40 bg-white relative px-4 sm:px-8 md:px-16">
      <div className="flex flex-col items-center gap-4 px-2 py-4 lg:px-5 lg:py-10 bg-transparent backdrop-blur-sm w-full max-w-4xl rounded-[15px] shadow-lg hover:shadow-[#00D5F521] text-center">
        <p className="font-semibold font-work text-base lg:text-2xl text-[#1E1E1E]">
          Comprehensive Cleaning Solutions for Every Space
        </p>
        <h3 className="font-jakarta font-semibold text-2xl lg:text-[60px] ">
          Our Services
        </h3>
        <p className="font-work font-medium text-sm lg:text-xl text-[#1E1E1E]">
          From cozy homes in Johannesburg to busy offices in Pretoria, we bring
          the shine to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Btn
            size="base"
            backgroundType="solid"
            className="h-12 w-45 text-xs sm:text-base lg:text-xs xl:text-base"
            onClick={() => setOpenModal("Book")}
          >
            Book Now
          </Btn>
          <Btn
            size="base"
            className="h-12 flex items-center gap-2 text-xs sm:text-base lg:text-xs xl:text-base text-nowrap"
            backgroundType="outline"
            onClick={() => setOpenModal("Quote")}
          >
            Get a Free Quote <FaArrowRightLong />
          </Btn>
        </div>
      </div>
      <Image
        src={clean}
        alt="services hero"
        layout="responsive"
        className="absolute bottom-0 left-0 w-full pointer-events-none"
      />
    </div>
  );
};
