'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SchemeReset = z.object({
    email: z.string(),
    newPassword: z.string()
        .min(6, "Password must be at least 6 characters")
});

export default function ResetPassword() {

    const router = useRouter();
    const form = useForm<z.infer<typeof SchemeReset>>({
        resolver: zodResolver(SchemeReset),
        defaultValues: {
            email: "",
            newPassword: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function handleReset(values: z.infer<typeof SchemeReset>) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
                {
                    method: "PUT",
                    body: JSON.stringify(values), 
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Failed to reset password");
                return;
            }

            toast.success("Password updated successfully");
            router.push('/login');
        } catch {
            toast.error("Connection error, please try again");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleReset)} className="space-y-4">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 mt-4 transition-colors"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}