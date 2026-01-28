'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import { Form, FormControl, FormField, FormDescription, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function ForgetPassword() {
    const Route = useRouter();
    const SchemeForgetPassword = z.object({
        email: z
            .string()
            .min(5, "Email required")
            .email("Email not valid"),
    });

    const ForgetForm = useForm<z.infer<typeof SchemeForgetPassword>>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(SchemeForgetPassword)
    });

    const { isSubmitting } = ForgetForm.formState;

    async function handleForgetPassword(values: z.infer<typeof SchemeForgetPassword>) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,
                {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return;
            }

            toast.success("Reset code sent to your email");
            Route.push('/resetCode');

        } catch {
            toast.error("Connection error, please try again");
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
            <Form {...ForgetForm}>
                <form onSubmit={ForgetForm.handleSubmit(handleForgetPassword)} className="space-y-6">
                    <FormField
                        control={ForgetForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        {...field}
                                        placeholder="Enter Your Email"
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-main cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                            </span>
                        ) : (
                            "Send"
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}