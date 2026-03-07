"use client";

import { RadioButton } from "../ui/Radio";
import { Input } from "../ui/InputField";
import { TimeInput } from "../ui/TimeInput";
import { Btn } from "../ui/Button";
import { useRadio } from "@/hooks/useRadio";
import { Pills } from "../ui/Pills";
import { useState } from "react";
import { TextMessage } from "@/components/ui/TextMessage";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";
import { Confirmation } from "./confirmation";
import type { BookingProps } from "@/types/booking";
import { FaCheck } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";
import { BOOKING_SCRIPT_URL, sendToSheet } from "@/utils/googleSheets";

export type { BookingProps };

export const BookService = () => {
  const [step, setStep] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationUser, setConfirmationUser] = useState("");
  const { architecture, selected, setSelected } = useRadio();
  const [selectSpace, setSelectSpace] = useState<string[]>([]);
  const [selectFrequency, setSelectFrequency] = useState<string>("One time");
  const [livingRoom, setLivingRoom] = useState<number>(0);
  const [bedRooms, setBedRooms] = useState<number>(0);
  const [bathRooms, setBathRooms] = useState<number>(0);
  const [otherServices, setOtherServices] = useState<boolean>(false);
  const [otherService, setOtherService] = useState<string>("");
  const { post } = useApi();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset,
  } = useForm<BookingProps>({
    defaultValues: {
      service_type: "Residential",
      size: { livingrooms: 0, bedrooms: 0, bathrooms: 0},
      extra_services: '',
      frequency: "One time",
      date: "",
      time: "08:00 AM",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      property_address: "",
      message: "",
    },
  });


  const onSubmit = async (data: BookingProps) => {
    try {
      const payload: BookingProps = {
        ...data,
        service_type: selected as BookingProps["service_type"],
        extra_services: selectSpace.join(","),
        frequency: selectFrequency,
        size: {
          livingrooms: livingRoom,
          bedrooms: bedRooms,
          bathrooms: bathRooms,
        },
      };
      const response = (await post("/book", payload)) as {
        success: boolean;
        message: string;
      };
      if (response?.success) {
        setConfirmationUser(`${data.firstName} ${data.lastName}`.trim() || "");
        setShowConfirmation(true);
        reset()
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send booking request"
      );
    } finally {
      const sheetData = new URLSearchParams({
        Name: data.firstName + " " + data.lastName,
        Email: data.email,
        Address: `${data.property_address}`,
        Phone: String(`${data.phone}`),
        Frequency: data.frequency ?? "",
        Extra_services: `${selectSpace.join(",")}`,
        Date: data.date,
        Time: data.time,
        Message: data.message ?? "",
        Livingrooms: String(data.size.livingrooms),
        Bedrooms: String(data.size.bedrooms),
        Bathrooms: String(data.size.bathrooms),
        Services: `${data.service_type}`,
      });
      await sendToSheet(BOOKING_SCRIPT_URL, sheetData);
    }
  };

  const handleNext = () => {
    const values = getValues();
    if (values.service_type && values.date && values.time) {
      setStep(2);
    } else {
      toast.warn("Please fill in all required fields");
    }
  };

  if (showConfirmation) {
    return <Confirmation user={confirmationUser} />;
  }



  return (
    <div className="font-jakarta space-y-5">
      <div>
        <h4 className="font-semibold text-[28px] text-black">
          Book our service
        </h4>
        <p className="font-work text-[#8D8D8D] text-base">
          Let`s start with your space.
        </p>
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        {step == 1 && (
          <>
            <div className="space-y-4">
              <p className="font-medium text-sm text-black">
                Select the type of service you need and your home size.
              </p>
              <RadioButton
                selected={selected}
                setSelected={setSelected}
                data={architecture}
                {...register("service_type", { required: true })}
              />
            </div>
            <div className="space-y-4">
              <p className="font-medium text-sm text-black">Home Size</p>
              <div className="flex items-center flex-wrap gap-8">
                <Pills
                  label="Living Rooms"
                  unit={livingRoom}
                  decrement={() => {
                    const newValue = livingRoom > 0 ? livingRoom - 1 : 0;
                    setLivingRoom(newValue);
                    setValue("size.livingrooms", newValue);
                  }}
                  increment={() => {
                    const newValue = livingRoom + 1;
                    setLivingRoom(newValue);
                    setValue("size.livingrooms", newValue);
                  }}
                />
                <Pills
                  label="Bedrooms"
                  unit={bedRooms}
                  decrement={() => {
                    const newValue = bedRooms > 0 ? bedRooms - 1 : 0;
                    setBedRooms(newValue);
                    setValue("size.bedrooms", newValue);
                  }}
                  increment={() => {
                    const newValue = bedRooms + 1;
                    setBedRooms(newValue);
                    setValue("size.bedrooms", newValue);
                  }}
                />
                <Pills
                  label="BathRooms"
                  unit={bathRooms}
                  decrement={() => {
                    const newValue = bathRooms > 0 ? bathRooms - 1 : 0;
                    setBathRooms(newValue);
                    setValue("size.bathrooms", newValue);
                  }}
                  increment={() => {
                    const newValue = bathRooms + 1;
                    setBathRooms(newValue);
                    setValue("size.bathrooms", newValue);
                  }}
                />
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-medium text-sm text-black">
                {" "}
                Select any extra services you might need.{" "}
              </p>
              <div className="flex items-center flex-wrap gap-8">
                {
                  ["Standard","Intensive","Inside Fridge", "Interior window", "Exterior", "Inside Oven"].map((service) => (
                    <div key={service} 
                    onClick={() => setSelectSpace(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service])}
                    className="flex items-center gap-2 cursor-pointer font-work">
                      <div className={`w-5 h-5 flex text-center items-center justify-center rounded-full border border-gray-300 ${selectSpace.includes(service) ? "bg-black" : "bg-gray-300"}`}>
                        {selectSpace.includes(service) && <FaCheck className="text-white" size={10} />}
                      </div>
                      <div className="font-normal text-sm data-disabled:opacity-50 cursor-pointer" >{service}</div>
                    </div>
                  ))
                }
                <div onClick={() => setOtherServices(true)}
                  className="flex items-center gap-2 cursor-pointer font-work">
                    <div className={`w-5 h-5 flex text-center items-center justify-center rounded-full border border-gray-300 ${otherServices ? "bg-black" : "bg-gray-300"}`}>
                      {otherServices && <FaCheck className="text-white" size={10} />}
                    </div>
                    <div className="font-normal text-sm data-disabled:opacity-50 cursor-pointer" >Other services</div>
                  </div>
              </div>
              {
                otherServices && (
                  <Input
                    id="other-service"
                    label="Other services"
                    placeholder="Specify your service"
                    type="text"
                    value={otherService}
                    onChange={(e) => {
                    const val = e.target.value;
                    setOtherService(val);
                    setSelectSpace((prev) => {
                      const rest = prev.filter((s) => !s.startsWith("Other:"));
                      return val.trim() ? [...rest, `Other: ${val.trim()}`] : rest;
                    });
                  }}
                  />
                )
              }
            </div>
            <div className="space-y-4">
              <p className="font-medium text-sm text-black">Frequency</p>
              <RadioButton
                selected={selectFrequency}
                setSelected={setSelectFrequency}
                data={["One time", "Daily", "Weekly", "Bi-Weekly", "Monthly"]}
                {...register("frequency")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="date"
                label="Preferred Date"
                type="date"
                {...register("date", { required: true })}
                error={errors.date?.message}
              />
              <Controller
                name="time"
                control={control}
                rules={{ required: true }}
                defaultValue="08:00 AM"
                render={({ field }) => (
                  <TimeInput
                    label="Preferred Time"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.time?.message}
                  />
                )}
              />
            </div>
          </>
        )}
        {step == 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              />
            </div>
            <TextMessage
              id="property_address"
              label="Property Address"
              placeholder="Enter here"
              {...register("property_address", { required: true })}
              error={errors.property_address?.message}
            />
            <TextMessage
              id="message"
              label="Message"
              placeholder="Write your message.."
              {...register("message", { required: true })}
              error={errors.message?.message}
            />
          </div>
        )}
        {step == 1 && (
          <div className="flex justify-end">
            <Btn
              type="button"
              onClick={handleNext}
              size="base"
              className=" h-12 w-45 lg:text-xs xl:text-base"
            >
              Next
            </Btn>
          </div>
        )}
        {step == 2 && (
          <div className={`flex items-center gap-2 justify-between`}>
            <Btn
              onClick={() => {
                setStep(1);
              }}
              backgroundType="outline"
              size="base"
              className="h-12 w-45 lg:text-xs xl:text-base border-none!"
            >
              Back
            </Btn>
            <Btn
              type="submit"
              size="base"
              className="flex items-center justify-center gap-2 h-12 w-45 lg:text-xs xl:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking…" : "Book Now"}
              {isSubmitting && <PiSpinnerBold className="animate-spin" />}
            </Btn>
          </div>
        )}
      </form>
    </div>
  );
};
