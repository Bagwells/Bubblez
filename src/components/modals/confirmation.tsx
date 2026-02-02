import { BsFillPatchCheckFill } from "react-icons/bs";
import { Btn } from "../ui/Button";
import { useModalClose } from "@/contexts/ModalContext";

export const Confirmation = ({ user }: { user: string }) => {
    const closeModal = useModalClose();
  return (
    <div className="font-jakarta space-y-5">
      <div className="flex justify-center items-center w-full">
        <BsFillPatchCheckFill size={100} className="text-primary" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-8">
        <h4 className="font-semibold text-[28px] text-black">
          You`re all set!
        </h4>
        <p className="font-work text-[#1E1E1E] text-base">
          Thank you, <span className="font-bold text-black">{user}!</span> You
          will recieve an email from us shortly.
        </p>
        <Btn
          onClick={() => closeModal?.()}
          size="base"
          backgroundType="solid"
          className="h-12 w-45 lg:text-sm xl:text-base"
        >
          Close
        </Btn>
      </div>
    </div>
  );
};
