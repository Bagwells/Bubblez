import Image from "next/image";
import reason from "../../../public/washman.png"

export const Reason =()=> {

    const reasons = [
        "Vetted & Trained Staff: Every cleaner undergoes a strict background check and rigorous training.",
        "Eco-Friendly Options: We offer pet-safe and eco-friendly cleaning products upon request.",
        "100% Satisfaction: If you aren't happy with the \"Bubblez Effect,\" let us know within 24 hours and we'll re-clean it for free.",
        "Local Experts: Proudly serving Gauteng and its cities."
    ];

    return(
        <div className="relative w-full font-jakarta">
        <div className="absolute bg-[#5992EE] -translate-y-20 inset-0 w-full h-62.5 rounded-t-[40px]">
        </div>
      <div
        className="relative bg-primary flex flex-col lg:flex-row justify-between gap-2 w-full items-center py-4 px-4 md:px-6 lg:pr-0  rounded-[40px] shadow-md text-white bg-cover bg-center"
        style={{ backgroundImage:"url('/aboutbg.svg')"}}
      >
        <div className="flex flex-col w-full max-w-[580px] space-y-4 lg:space-y-6 py-6 lg:py-14">
          <h3 className="font-jakarta font-bold text-2xl lg:text-[48px]">Why Choose Bubblez?</h3>
          <ul className="">
            {
                reasons.map((text, index) => (
                    <li key={index} className="font-work font-normal text-base lg:text-2xl">
                        • {text}
                    </li>
                ))
            }
          </ul>
          
        </div>
        <div className="w-full lg:w-1/2 h-full flex -right-10 lg:-top-4 xl:-top-14">
          <Image
            src={reason}
            alt="washman"
            className=""
            loading="lazy"
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
    )
}