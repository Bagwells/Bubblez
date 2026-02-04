"use client";

import { RadioButton } from "../ui/Radio";
import { Input } from "../ui/InputField";
import { Btn } from "../ui/Button";
import { useRadio } from "@/hooks/useRadio";
import { Pills } from "../ui/Pills";
import { useState } from "react";
import { TextMessage } from "@/components/ui/TextMessage";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "@/hooks/useApi";
import { Confirmation } from "./confirmation";
import type { BookingProps } from "@/types/booking";

export type { BookingProps };

export const BookService = () => {
  const [step, setStep] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationUser, setConfirmationUser] = useState("");
  const { architecture, selected, setSelected } = useRadio();
  const [selectSpace, setSelectSpace] = useState<string>("");
  const [selectFrequency, setSelectFrequency] = useState<string>("One time");
  const [livingRoom, setLivingRoom] = useState<number>(1);
  const [bedRooms, setBedRooms] = useState<number>(1);
  const [bathRooms, setBathRooms] = useState<number>(1);

  const { post } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset,
  } = useForm<BookingProps>({
    defaultValues: {
      service_type: "Residential",
      size: { livingrooms: 1, bedrooms: 1, bathrooms: 1 },
      extra_services: "",
      frequency: "One time",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      property_Address: "",
      message: "",
    },
  });

  const onSubmit = async (data: BookingProps) => {
    try {
      const payload: BookingProps = {
        ...data,
        service_type: selected as BookingProps["service_type"],
        extra_services: selectSpace,
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
        setConfirmationUser(`${data.firstName} ${data.lastName}`.trim() || "there");
        setShowConfirmation(true);
        reset();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send booking request"
      );
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
          {" "}
          Book our service{" "}
        </h4>
        <p className="font-work text-[#8D8D8D] text-base">
          {" "}
          Let`s start with your space.{" "}
        </p>
      </div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        {step == 1 && (
          <>
            <div className="space-y-4">
              <p className="font-medium text-sm text-black">
                {" "}
                Select the type of service you need and your home size.{" "}
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
                    const newValue = livingRoom > 1 ? livingRoom - 1 : 1;
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
                    const newValue = bedRooms > 1 ? bedRooms - 1 : 1;
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
                    const newValue = bathRooms > 1 ? bathRooms - 1 : 1;
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
              <RadioButton
                selected={selectSpace}
                setSelected={setSelectSpace}
                data={[
                  "Inside Fridge",
                  "Interior window",
                  "Exterior",
                  "Inside Oven",
                ]}
                {...register("extra_services")}
              />
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
              <Input
                id="time"
                label="Preferred Time"
                type="time"
                {...register("time", { required: true })}
                error={errors.time?.message}
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
              id="property_Address"
              label="Property Address"
              placeholder="Enter here"
              {...register("property_Address", { required: true })}
              error={errors.property_Address?.message}
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
              className="h-12 w-45 lg:text-xs xl:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking…" : "Book Now"}
            </Btn>
          </div>
        )}
      </form>
    </div>
  );
};
