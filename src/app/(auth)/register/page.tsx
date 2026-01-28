'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; 

export default function Register() {
    const Route = useRouter();

    const SchemeRegister = z
        .object({
            name: z.string().min(3, "Min characters 3").max(15, "Max characters 15"),
            email: z.string().email("Invalid email address"),
            password: z.string().min(6, "Password must be at least 6 characters"),
            rePassword: z.string(),
            phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
        })
        .refine((obj) => obj.password === obj.rePassword, {
            path: ["rePassword"],
            message: "Passwords do not match",
        });

    const RegisterForm = useForm<z.infer<typeof SchemeRegister>>({
        defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
        resolver: zodResolver(SchemeRegister)
    });

    const { isSubmitting } = RegisterForm.formState;

    async function handleRegister(values: z.infer<typeof SchemeRegister>) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Something went wrong");
                return; 
            }

            toast.success("Account created successfully");
            Route.push('/login');

        } catch {
            toast.error("Network error, please try again later");
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register Now</h2>
            <Form {...RegisterForm}>
                <form onSubmit={RegisterForm.handleSubmit(handleRegister)} className="space-y-5">

                    <FormField
                        control={RegisterForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} placeholder="Enter Your Name" className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={RegisterForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} placeholder="example@mail.com" className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={RegisterForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder="••••••••" className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={RegisterForm.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder="••••••••" className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={RegisterForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input type="tel" {...field} placeholder="Enter Your Phone" className="border-gray-300" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit" 
                        className="cursor-pointer w-full bg-main text-white font-semibold py-3  hover:bg-main-dark transition-colors"
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Registering...
                            </span>
                        ) : (
                            "Register"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
