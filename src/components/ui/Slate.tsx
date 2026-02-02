"use client";

import { useState, useEffect, useRef } from "react";
import { CiCalendar } from "react-icons/ci";
import { GiVacuumCleaner } from "react-icons/gi";
import { PiSparkle } from "react-icons/pi";

interface ProcessProps {
    id: number;
    title: string;
    description: string;
}

const TYPE_SPEED_MS = 80;

export const Slate = ({ id, title, description }: ProcessProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [typedTitle, setTypedTitle] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const hasStartedTyping = useRef(false);

    useEffect(() => {
        if (!isHovered) {
            setTypedTitle("");
            setIsTypingComplete(false);
            hasStartedTyping.current = false;
            return;
        }
        if (hasStartedTyping.current) return;
        hasStartedTyping.current = true;

        let index = 0;
        const interval = setInterval(() => {
            if (index <= title.length) {
                setTypedTitle(title.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(interval);
            }
        }, TYPE_SPEED_MS);

        return () => clearInterval(interval);
    }, [isHovered, title]);

    return (
        <div
            className="group bg-white flex flex-col items-center w-full max-w-[350px] h-full gap-7 px-4 py-6 rounded-[10px] shadow-md hover:shadow-lg hover:shadow-[#00D5F521] font-jakarta"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full text-primary border-2 border-primary group-hover:scale-105 transition-all duration-300 ease-in">
                {(() => {
                    const icons = {
                        "Book in a Snap": CiCalendar,
                        "We Scrub, You Relax": GiVacuumCleaner,
                        "Discover the Shine": PiSparkle,
                    };
                    const SelectedIcon = icons[title as keyof typeof icons];
                    return SelectedIcon ? <SelectedIcon size={24} /> : null;
                })()}
                <div className="absolute top-0 right-0 text-center w-4 h-4 font-bold text-[10px] bg-black rounded-full text-white">
                    {id}
                </div>
            </div>
            <div className="space-y-4.5">
                <h3 className="font-semibold text-[28px] text-black min-h-[1.2em]">
                    {isHovered ? (
                        <>
                            {typedTitle}
                            {!isTypingComplete && (
                                <span className="animate-pulse">|</span>
                            )}
                        </>
                    ) : (
                        title
                    )}
                </h3>
                <p className="font-work font-normal text-base text-[#1E1E1E]">
                    {description}
                </p>
            </div>
        </div>
    );
}; 