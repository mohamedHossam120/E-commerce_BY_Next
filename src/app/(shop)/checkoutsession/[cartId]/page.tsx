'use client'

import React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import { checkoutPaymenet } from "src/OrderAction/OrderAction";

type ShippingFormValues = {
  details: string;
  phone: string;
  city: string;
};

export default function Checkoutsession() {
  const { cartId }: { cartId: string } = useParams();

  const shippingForm = useForm<ShippingFormValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function checkoutSession(values: ShippingFormValues) {
    const data = await checkoutPaymenet(cartId, values);
    console.log(data);
    window.open(data.session.url,"_blank")
  }

  return (
    <Form {...shippingForm}>
      <form
        className="space-y-5 w-2/3 mx-auto p-5 bg-white rounded-lg shadow-sm"
        onSubmit={shippingForm.handleSubmit(checkoutSession)}
      >
        <FormField
          control={shippingForm.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Details</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full h-9 text-lg px-6"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={shippingForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full h-9 text-lg px-6"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={shippingForm.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full h-9 text-lg px-6"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-main text-white text-lg cursor-pointer"
        >
          Payment
        </Button>
      </form>
    </Form>
  );
}
