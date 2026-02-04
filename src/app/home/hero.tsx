"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import bubbles from "../../../public/bubbles.svg";
import convex from "../../../public/convex.svg";
import spray from "../../../public/spray.svg";
import { Btn } from "@/components/ui/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { useModals } from "@/hooks/useModals";

const TYPE_SPEED_MS = 50;
const TAGLINE = "Professional • Reliable • Sparkling Clean";
const HEADING = "Experience the Joy of a Spotless Space.";
const DESCRIPTION =
  "Professional residential and commercial cleaning services tailored to your needs. Proudly serving Gauteng.";

function HeadingWithSpotless({ text }: { text: string }) {
  const before = "Experience the Joy of a ";
  const highlight = "Spotless";
  if (text.length <= before.length) {
    return <>{text}</>;
  }
  if (text.length <= before.length + highlight.length) {
    return (
      <>
        {before}
        <span className="font-pacifico">{text.slice(before.length)}</span>
      </>
    );
  }
  return (
    <>
      {before}
      <span className="font-pacifico">{highlight}</span>
      {text.slice(before.length + highlight.length)}
    </>
  );
}

type Phase = "tagline" | "heading" | "description" | "done";

export const Hero = () => {
  const [typedTagline, setTypedTagline] = useState("");
  const [typedHeading, setTypedHeading] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [phase, setPhase] = useState<Phase>("tagline");
  const { setOpenModal } = useModals();

  useEffect(() => {
    if (phase !== "tagline") return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= TAGLINE.length) {
        setTypedTagline(TAGLINE.slice(0, i));
        i++;
      } else {
        setPhase("heading");
        clearInterval(id);
      }
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "heading") return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= HEADING.length) {
        setTypedHeading(HEADING.slice(0, i));
        i++;
      } else {
        setPhase("description");
        clearInterval(id);
      }
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "description") return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= DESCRIPTION.length) {
        setTypedDescription(DESCRIPTION.slice(0, i));
        i++;
      } else {
        setPhase("done");
        clearInterval(id);
      }
    }, TYPE_SPEED_MS);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <div
      className="w-full h-90vh xl:h-screen bg-cover bg-right lg:bg-center relative"
      style={{ backgroundImage: "url('/Interior.svg')" }}
    >
      <div className="relative w-full h-full bg-linear-to-r from-primary-lite to-[#09265C20] pt-16">
        <div className="bg-linear-to-r from-primary-lite to-primary/5 flex flex-col lg:flex-row w-full h-full pt-20 xl:pt-38">
          <div className="space-y-4 px-4 sm:px-8 md:px-16 lg:pr-0 xl:pl-24 2xl:pl-32 text-white">
            <p className="font-work font-semibold text-base sm:text-lg md:text-xl xl:text-2xl min-h-[1.5em]">
              <>
                {typedTagline}
                {phase === "tagline" && (
                  <span className="animate-pulse">|</span>
                )}
              </>
            </p>
            <h2 className="font-jakarta font-semibold text-4xl lg:text-5xl xl:text-[60px] leading-tighter min-h-[1.2em]">
              {typedHeading && (
                <>
                  <HeadingWithSpotless text={typedHeading} />
                  {phase === "heading" && (
                    <span className="animate-pulse">|</span>
                  )}
                </>
              )}
            </h2>
            <p className="font-work font-medium text-xs sm:text-sm xl:text-lg min-h-[3em]">
              <>
                {typedDescription}
                {phase === "description" && (
                  <span className="animate-pulse">|</span>
                )}
              </>
            </p>
            <div className="flex gap-4">
              <Btn
                onClick={() => setOpenModal("Book")}
                size="base"
                backgroundType="outline"
                className="h-12 w-45 text-xs sm:text-base lg:text-xs xl:text-base"
              >
                Book Now
              </Btn>
              <Btn
                onClick={() => setOpenModal("Quote")}
                size="base"
                className="h-12 flex items-center gap-2 text-xs sm:text-base lg:text-xs xl:text-base text-nowrap"
                backgroundType="solid"
              >
                Get a Free Quote <FaArrowRightLong />
              </Btn>
            </div>
          </div>
          <div className="block">
            <Image
              src={spray}
              alt="cleaning"
              width={1000}
              className="pointer-events-none"
              loading="eager"
            />
          </div>
        </div>
        <Image
          src={bubbles}
          alt="bubbles"
          width={1000}
          className="absolute bottom-0 w-full pointer-events-none"
          loading="eager"
        />
        <Image
          src={convex}
          alt="convex"
          width={1000}
          className="absolute bottom-0 w-full pointer-events-none"
          loading="eager"
        />
      </div>
    </div>
  );
};
