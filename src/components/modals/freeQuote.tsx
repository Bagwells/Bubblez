"use client";

import { useState } from "react";
import { RadioButton } from "../ui/Radio";
import { Input } from "../ui/InputField";
import { TimeInput } from "../ui/TimeInput";
import { Btn } from "../ui/Button";
import { useRadio } from "@/hooks/useRadio";
import { useForm, Controller } from "react-hook-form";
import useApi from "@/hooks/useApi";
import { toast } from "react-toastify";
import { Confirmation } from "./confirmation";
import { TextMessage } from "../ui/TextMessage";
import type { GetQuoteProps } from "@/types/quote";

export type { GetQuoteProps as getQuoteProps };

export const FreeQuote = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationUser, setConfirmationUser] = useState("");
  const { architecture, selected, setSelected } = useRadio();
  const { post } = useApi();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<GetQuoteProps>({
    defaultValues: {
      date: "",
      time: "08:00 AM",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      property_address: "",
      service_type: "",
    },
  });

  const onSubmit = async (data: GetQuoteProps) => {
    try {
      const payload = { ...data, service_type: selected };
      const response = (await post("/quote", payload)) as {
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
        error instanceof Error ? error.message : "Failed to send quote request"
      );
    }
  };

  if (showConfirmation) {
    return <Confirmation user={confirmationUser} />;
  }

  return (
    <div className="font-jakarta space-y-2">
      <div>
        <h4 className="font-semibold text-[28px] text-black">
          Get a Free Cleaning Quote
        </h4>
        <p className="font-work text-[#8D8D8D] text-base">
          We`ll create a custom cleaning plan that fits your needs and your
          budget.
        </p>
      </div>
      <form
        method="post"
        className="w-full space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            required
            {...register("lastName", { required: true })}
            error={errors.lastName?.message}
          />
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            {...register("email", { required: true })}
            error={errors.email?.message}
          />
          <Input
            id="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            type="text"
            required
            {...register("phone", { required: true })}
            error={errors.phone?.message}
          />
          <Input
            id="date"
            label="Preferred Date"
            type="date"
            required
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
        <TextMessage
          id="property_address"
          label="Property Address"
          placeholder="Write your message.."
          {...register("property_address", { required: true })}
          error={errors.property_address?.message}
        />

        <div className="space-y-4">
          <p className="font-medium text-sm text-black">
            Service Interested In
          </p>
          <RadioButton
            selected={selected}
            setSelected={setSelected}
            data={architecture}
            {...register("service_type", { required: true })}
          />
        </div>

        <TextMessage
          id="message"
          label="Message"
          placeholder="Write your message.."
          {...register("message", { required: true })}
          error={errors.message?.message}
        />
        <div className="flex items-center justify-end">
          <Btn
            type="submit"
            size="base"
            className="h-12 w-fit lg:text-xs xl:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Request My Free Quote"}
          </Btn>
        </div>
      </form>
    </div>
  );
};
