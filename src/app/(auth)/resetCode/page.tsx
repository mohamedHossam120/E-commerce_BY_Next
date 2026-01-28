'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "src/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "src/components/ui/input-otp";

const SchemeResetCode = z.object({
    resetCode: z.string().length(6, "Code must be exactly 6 digits"),
});

export default function ResetCode() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SchemeResetCode>>({
        resolver: zodResolver(SchemeResetCode),
        defaultValues: {
            resetCode: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function handleVerifyCode(values: z.infer<typeof SchemeResetCode>) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Invalid Code");
                return;
            }

            toast.success("Verified Successfully!");
            router.push("/resetPassword");
        } catch {
            toast.error("Please check your internet connection and try again.");
        }
    }

    const slotStyle = "w-12 h-14 border-2 border-green-500 rounded-md text-green-700 text-xl font-bold bg-green-50";

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Verify Code </h2>
            <p className="text-center text-gray-500 mb-8">Enter Code</p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleVerifyCode)}
                    className="space-y-8 flex flex-col items-center"
                >
                    <FormField
                        control={form.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center w-full">
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot index={0} className={slotStyle} />
                                                <InputOTPSlot index={1} className={slotStyle} />
                                            </InputOTPGroup>

                                            <InputOTPSeparator className="text-green-600 font-bold" />

                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot index={2} className={slotStyle} />
                                                <InputOTPSlot index={3} className={slotStyle} />
                                            </InputOTPGroup>

                                            <InputOTPSeparator className="text-green-600 font-bold" />

                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot index={4} className={slotStyle} />
                                                <InputOTPSlot index={5} className={slotStyle} />
                                            </InputOTPGroup>
                                        </div>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage className="mt-4" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all active:scale-95 shadow-md shadow-green-200"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying...
                            </div>
                        ) : (
                            "Verify Code"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}