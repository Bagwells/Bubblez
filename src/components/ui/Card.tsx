'use client'
import Image, { StaticImageData } from "next/image";
import bubbles from "../../../public/cardBubbles.png"
import commercial from "../../../public/commercial.png"
import residential from "../../../public/residential.png"
import postConstruction from "../../../public/post-construction.png"
import specialtyIndividual from "../../../public/specialty.png"
import { FaArrowRightLong } from "react-icons/fa6";
import { useModals } from "@/hooks/useModals";

export interface ServiceProps {
    title: "Commercial" | "Residential" | "Post-Construction" | "Specialty & Individual";   
    description: string;
    price: number;
    customPrice: customPriceProps[] | undefined;
    duration: string;
    features: string[];
}

export type customPriceProps = {
    title: string;
    price: string;
}

export const ServiceCard = ({
    title,
    description,
    price,
    duration,
    features,
    customPrice
}: ServiceProps) => {

    const illustrations: { [key in ServiceProps["title"]]: string | StaticImageData } = {
        "Commercial": commercial,
        "Residential": residential,
        "Post-Construction": postConstruction,
        "Specialty & Individual": specialtyIndividual,
    };

    const { setOpenModal } = useModals();

    return(
        <div className="relative bg-white flex flex-col lg:flex-row rounded-lg shadow-xs group-hover:blur-xs hover:blur-none hover:scale-105 transition-all duration-300 ease-in hover:shadow-lg hover:shadow-[#00D5F521] border-2 border-[#E9E9E9] overflow-hidden">
            <div className="flex flex-col justify-between  w-full lg:max-w-[60%] p-6 pb-0 lg:py-10 gap-2 relative z-10">
                { title !== "Specialty & Individual" ? (
                    <div className="text-left space-y-1">
                        <h3 className="font-jakarta font-semibold text-2xl text-black">
                            {title} Cleaning
                        </h3>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            {description}
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Price: Starting at <span className="font-bold">R{price.toFixed()}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Duration: <span className="font-bold">{duration}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Includes:
                        </p>
                        <ul className="list-disc ml-4">
                            {features.map((feature) => (
                                <li key={feature} className="font-work font-normal flex items-center text-base text-[#1E1E1E]">
                                    • {feature}
                                </li>
                            ))}
                        </ul>

                    </div>) : (
                    <div className="space-y-1 text-left">
                        <h3 className="font-jakarta font-semibold text-2xl text-black">
                            {title} Services
                        </h3>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            {description}
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Trash Can Cleaning: <span className="font-bold">R{customPrice?.find(item => item.title === "Trash Can Cleaning")?.price}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Carpet Cleaning: <span className="font-bold ">R{customPrice?.find(item => item.title === "Carpet Cleaning")?.price}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Window Cleaning: <span className="font-bold ">R{customPrice?.find(item => item.title === "Window Cleaning")?.price}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            3D carpets cleaning: <span className="font-bold ">{customPrice?.find(item => item.title === "3D carpets cleaning")?.price}</span>
                        </p>
                        <p className="font-work font-normal text-base text-[#1E1E1E]">
                            Persian, Egyptian etc. carpets cleaning: <span className="font-bold ">{customPrice?.find(item => item.title === "Persian, Egyptian etc. carpets cleaning")?.price}</span>
                        </p>
                    </div>
                    )
                }
                { title !== "Specialty & Individual" ? (    
                    <div onClick={() => setOpenModal("Quote")}
                        className="flex items-center shadow-none! py-2 gap-2 text-primary font-semibold hover:text-primary-lite transition-all duration-300 ease-in cursor-pointer">
                        Get a Quote <FaArrowRightLong />
                    </div>
                ) : (
                    <div onClick={() => setOpenModal("Book")}
                        className="flex items-center shadow-none! py-2 px-4 gap-2 text-primary font-semibold hover:text-primary-lite transition-all duration-300 ease-in cursor-pointer">
                        Book this service <FaArrowRightLong />
                    </div>
                )
                }
            </div>
            <div className="h-[200px] w-full lg:h-full lg:w-[40%] flex items-end justify-end z-10"> 
                <Image 
                    src={illustrations[title as keyof typeof illustrations]} 
                    alt={`${title} illustration`} 
                    className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] object-contain" 
                    loading="lazy" 
                />
            </div>
            <div className="flex items-end absolute right-0 bottom-0 w-[50%] h-full">
                <Image src={bubbles} alt="bubbles" width={500} height={500} className="w-full lg:h-full object-right" />
            </div>
        </div>
    )
}