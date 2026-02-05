'use client'
import { Slate } from "@/components/ui/Slate";
import Vector from "../../../public/Vector.svg";
import Image from "next/image";
import { Btn } from "@/components/ui/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { processes } from "@/utils/Process";
import { useModals } from "@/hooks/useModals";

export const Process = () => {
  const { setOpenModal } = useModals();

  return (
    <div className="bg-white flex flex-col items-center font-jakarta w-full py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 text-center">
      <h3 className="font-semibold text-2xl lg:text-[40px] mb-8">
        Our Process
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-fit mb-10">
        {processes.map((process) => (
          <div
            key={process.id}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            <Slate key={process.id} {...process} />
            {process.id !== 3 && (
              <Image src={Vector} alt="" width={100} height={100} />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <Btn
          size="base"
          backgroundType="solid"
          className="h-12 md:w-45 w-full text-xs sm:text-base lg:text-xs xl:text-base"
          onClick={() => setOpenModal("Book")}
        >
          Book Now
        </Btn>
        <Btn
          size="base"
          className="h-12 w-full md:w-fit flex items-center gap-2 text-xs sm:text-base lg:text-xs xl:text-base text-nowrap"
          backgroundType="outline"
          onClick={() => setOpenModal("Quote")}
        >
          Get a Free Quote <FaArrowRightLong />
        </Btn>
      </div>
    </div>
  );
};
