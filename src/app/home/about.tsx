import Image from "next/image";
import about from "../../../public/trolley.png";

export const About = () => {

    
  return (
    <div className="relative w-full font-jakarta">
        <div className="absolute bg-[#5992EE] -translate-y-20 inset-0 w-full h-62.5 rounded-t-[40px]">
        </div>
      <div
        className="relative bg-primary flex flex-col lg:flex-row justify-between gap-2 w-full items-center py-4 px-4 md:px-6 lg:pr-0  rounded-[40px] shadow-md text-white bg-cover bg-center"
        style={{ backgroundImage:"url('/aboutbg.svg')"}}
      >
        <div className="flex flex-col w-full max-w-[480px] space-y-4 lg:space-y-6 py-6 lg:py-14 xl:py-30">
          <h3 className="font-jakarta font-bold text-2xl lg:text-[48px]">About Us</h3>
          <p className="font-work font-semibold text-lg lg:text-2xl">
            Your Trusted Local Cleaning Experts
          </p>
          <p className="font-work font-normal text-base lg:text-2xl">
            Bubblez Cleaning Services proudly serves homes and businesses in
            Gauteng. We are a trusted local cleaning company
            offering residential, commercial, post-construction, and specialty
            cleaning services. Whether you need a deep home clean or regular
            office maintenance, our team is ready to help.
          </p>
        </div>
        <div className="lg:absolute w-full lg:w-1/2 h-full flex -right-10 lg:-top-4 xl:-top-14">
          <Image
            src={about}
            alt="cleaning tools"
            className="xl:scale-115"
            loading="lazy"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};
