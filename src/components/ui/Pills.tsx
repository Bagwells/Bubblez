import { FaMinus, FaPlus } from "react-icons/fa6";
import { useId } from "react";

export const Pills = ({label, unit, decrement, increment}:{label:string; unit:number; decrement:()=> void; increment: ()=> void;})=> {
    const labelId = useId();

    return(
        <div className="" role="group" aria-labelledby={labelId}>
            <span id={labelId} className="font-work text-black text-sm block">
                {label}
            </span>
            <div className="flex bg-neutral-200 rounded-full items-center justify-between h-8 px-4 flex-nowrap gap-4 w-fit hover:shadow-md shadow-[#00AEEF21]">
                <FaMinus onClick={decrement}
                    size={16} className="text-[#00AEEF50] cursor-pointer"/>
                <p className="font-work text-lg text-[#1A1A1A] font-bold">
                    {unit}
                </p>
                <FaPlus onClick={increment}
                    size={16} className="text-[#00AEEF] cursor-pointer"/>
            </div>
        </div>
    )
}