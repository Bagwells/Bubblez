"use client";
import Link from "next/link"
import { FiPhoneCall } from "react-icons/fi"
import { Contact } from "@/utils/Contact"
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { TbBrandWhatsapp } from "react-icons/tb";
import Image from "next/image";
import Gps from "../../../public/Gps.svg";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { PiTiktokLogoLight } from "react-icons/pi";
import { Input } from "@/components/ui/InputField";
import { RadioButton } from "@/components/ui/Radio";
import { Btn } from "@/components/ui/Button";
import { useRadio } from "@/hooks/useRadio";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";
import { TextMessage } from "@/components/ui/TextMessage";
import type { ContactProps } from "@/types/contact";

export type ContactMethod = {
    href: string;
    label: string;
    icon: React.ElementType;
}

export type { ContactProps };

const ContactPage =() => {
    
    const ContactMethods: ContactMethod[] = [
        {
            href: Contact[0].link,
            label: Contact[2].value,
            icon: FiPhoneCall
        },
        {
            href: Contact[1].link,
            label: Contact[1].value,
            icon: IoMdMail
        },
        {
            href: Contact[2].link,
            label: Contact[2].value,
            icon: TbBrandWhatsapp
        },
        {
            href: "",
            label: "Johannesburg, Gauteng and Pretoria",
            icon: IoLocationSharp
        }
    ]

    const SocialList = [
        { icon: RiTwitterXFill, link: '' },
        { icon: FaInstagram, link: '' },
        { icon: PiTiktokLogoLight, link: ''},
    ];

    const { architecture, selected, setSelected } = useRadio();
    const { post } = useApi();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<ContactProps>({
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        },
      });

    const onSubmit = async (data: ContactProps) => {
        try {
            const response = (await post("/contact", data)) as {
                success: boolean;
                message: string;
            };
            if (response && response.success) {
                toast.success("Message sent successfully");
                reset();
                setSelected(architecture[0]);
                return;
            } 
        } catch (error: any) {
            const errorMessage =
                error && error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "Failed to send message";
            console.error("contact error:", errorMessage);
            toast.error("Failed to send message");
            return false;
        }
    }

    return (
        <div className="bg-white w-full min-h-screen overflow-hidden">    
            <div className="flex py-24 lg:py-42 items-center h-full w-full justify-center ">    
                <div className="flex flex-col-reverse lg:flex-row p-2 bg-transparent backdrop-blur-sm w-full max-w-7xl rounded-[10px] shadow-md">
                    <div className="bg-primary rounded-[10px] lg:w-[50%] p-6 lg:p-10 space-y-3">
                        <h3 className=" font-jakarta font-semibold text-2xl text-white ">
                            Contact Information
                        </h3>
                        <h4 className="font-work font-semibold text-base text-[#C9C9C9]">
                            Send us a message!
                        </h4>
                        <ul className="space-y-2.5 font-work text-sm lg:text-base text-white">
                            { ContactMethods.map((method) =>{
                                const Icon = method.icon;
                                 return (
                                <li key={method?.href}
                                    className="flex gap-6 items-center text-white">
                                    <Icon className="text-2xl" /><Link target="_blank" href={method?.href} className="hover:underline hover:font-bold">{method.label}</Link>
                                </li>
                            )})}
                        </ul>
                        <Image src={Gps} alt="Map" width={350} height={300} 
                        className="rounded-xl" />

                        <div className="flex items-center gap-4 text-white ">
                            {SocialList.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <Link key={idx} target="_blank" href={social.link} className="hover:font-bold hover:scale-125 transition-all duration-300 ease-in">
                                        <Icon className="text-2xl" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:w-[50%] p-6 lg:p-10">
                        <form onSubmit={handleSubmit(onSubmit)}
                            className="w-full space-y-10">
                            <h3 className=" font-jakarta font-semibold text-2xl text-black ">
                                Send us a Message!
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Input
                                    id="firstName"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    type="text"
                                    {...register("firstName", { required: true })}
                                    error={errors.firstName?.message}
                                />
                                <Input
                                    id="lastName"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    type="text"
                                    {...register("lastName", { required: true })}
                                    error={errors.lastName?.message}
                                />
                                <Input
                                    id="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", { required: true })}
                                    error={errors.email?.message}
                                />
                                <Input
                                    id="phone"
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    type="text"
                                    {...register("phone", { required: true })}
                                    error={errors.phone?.message}
                                />
                            </div>
                            <div className="space-y-4">
                                <p className="font-medium text-sm text-black">
                                    Service Interested In
                                </p>
                                <RadioButton selected={selected} setSelected={setSelected}   data={architecture}/>
                            </div>

                            <TextMessage
                                id="message"
                                label="Message"
                                placeholder="Write your message.."
                                {...register("message", { required: true })}
                                error={errors.message?.message}
                            />
                            
                            <div className="flex items-center justify-end">
                                <Btn type="submit" 
                                    disabled={isSubmitting}
                                    size="base" className="h-12 w-45 lg:text-xs xl:text-base">
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Btn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage