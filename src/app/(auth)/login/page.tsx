'use client'
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserToken } from "src/getUserToken";
import { CartData } from "src/types/cart.type";
import { getCartData } from "src/CartAction/CartAction";
import { useContext } from "react";
import { CountContext } from "src/CountProvider";

export default function Login() {
    const router = useRouter();
    const {setCount } = useContext(CountContext) as {
        count: number;
        setCount: React.Dispatch<React.SetStateAction<number>>;
    };
     const SchemeLogin = z.object({
        email: z.string().min(1, "Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const LoginForm = useForm<z.infer<typeof SchemeLogin>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(SchemeLogin)
    });

    const { isSubmitting } = LoginForm.formState;

    async function handleLogin(values: z.infer<typeof SchemeLogin>) {
        try {
            const res = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (res?.ok) {
                toast.success("Login Success");
                const token = await getUserToken()
                if (token) {
                    const data: CartData = await getCartData();
                    const sum = data.data.products.reduce((total, item) => total += item.count, 0)
                    setCount(sum)
                    console.log(data);
                }
                router.push('/');
            } else {
                toast.error(res?.error || "Invalid email or password");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Now</h2>
            <Form {...LoginForm}>
                <form onSubmit={LoginForm.handleSubmit(handleLogin)} className="space-y-6">

                    <FormField
                        control={LoginForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="focus-visible:ring-green-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={LoginForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        className="focus-visible:ring-green-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-start">
                        <Link
                            href="/forgetPassword"
                            className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors"
                        >
                            Forget Password...?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="cursor-pointer w-full bg-main text-white transition-all font-bold h-11"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

