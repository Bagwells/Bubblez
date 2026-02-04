'use client'
import Image from "next/image";
import { Logo } from "./Logo";
import { Btn } from "../ui/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { NavItems, NavProps } from "@/utils/Navigation";
import { Contact } from "@/utils/Contact";
import Gps from "../../../public/Gps.svg";
import bubbles from "../../../public/footerBubbles.svg"
import { useModals } from "@/hooks/useModals";

export const Footer = () => {
    const { setOpenModal } = useModals();
    return (
        <footer className="relative bg-primary w-full py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 font-jakarta">
            <div className="flex flex-col lg:flex-row gap-20 mb-20">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex flex-col gap-6 max-w-68">
                            <Logo />
                            <p className="font-work text-white text-base">
                                A trusted local cleaning company providing professional, residential, commercial, post-construction, and specialty
                                cleaning services in Gauteng. If you`re looking for a reliable cleaning services near you.
                                Bubblez Cleaning Services are here to help you.
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 font-jakarta">
                            <h4 className="text-white text-2xl font-semibold text-nowrap">Quick Links</h4>
                            <ul className="">
                                {
                                    NavItems?.map((item: NavProps) => (
                                        <li key={item.label} className="font-work text-white text-base hover:font-bold hover:underline">
                                            <Link href={item.href}>{item.label}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 z-20">
                        <Btn 
                            onClick={() => setOpenModal("Book")}
                            size="base"
                            backgroundType="outline"
                            className="h-12 w-45 lg:text-xs xl:text-base">
                            Book Now
                        </Btn>
                        <Btn
                            onClick={() => setOpenModal("Quote")}
                            size="base"
                            className="h-12 flex items-center text-nowrap gap-2 lg:text-xs xl:text-base border-white!"
                            backgroundType="solid"
                        >
                            Get a Free Quote <FaArrowRightLong />
                        </Btn>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="text-white text-2xl font-semibold text-wrap">Contact</h4>
                    <ul className="">
                        {
                            Contact?.map((item) => (
                                <li key={item.label} className="flex gap-2 font-space text-white text-base">
                                    <p className="text-white text-base">{item.label}: </p>
                                    <Link href={item.value} target="_blank" className="hover:underline font-semibold">{item.value}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-col gap-6">
                    <h4 className="text-white text-2xl font-semibold">Locations</h4>
                    <p className="text-white text-base">
                        Main Office: <span className="font-bold">32, Cumberland Avenue, Vandia Grove Bryanston 2001.</span> <br/>
                        Other Offices: <span className="font-bold">13056 Sebenzisa Drive.</span> <br/>
                        Other Offices: <span className="font-bold">106 Swemmer Road.</span> <br/>
                    </p>
                    <Image src={Gps} alt="Map" width={400} height={300} 
                        className="rounded-xl pointer-events-none"
                    />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end">
                <p className="bg-linear-to-b from-white via-[#F9FBFD30] to-[#F3F8FA00] bg-clip-text text-transparent text-6xl sm:text-[100px] lg:text-[140px] xl:text-[180px] font-semibold">BOOK NOW</p>
                <Image 
                    src={bubbles}
                    alt="bubble"
                    width={1000}
                    className="absolute left-0 bottom-0 w-full pointer-events-none"
                    loading="lazy"
                />
                <p className="w-fit text-white text-center text-sm backdrop-blur-sm">© {new Date().getFullYear()} Bubblez Cleaning Services. All rights reserved.</p>
            </div>
        </footer>
    );
};