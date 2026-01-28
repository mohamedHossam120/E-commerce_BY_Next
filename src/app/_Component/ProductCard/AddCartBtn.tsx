'use client'
import { useContext } from "react";
import { toast } from "sonner";
import { AddProductToCart } from "src/CartAction/CartAction";
import { Button } from "src/components/ui/button";
import { CountContext } from "src/CountProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddCartBtn({ id }: { id: string }) {
    const {setCount } = useContext(CountContext) as {
        count: number;
        setCount: React.Dispatch<React.SetStateAction<number>>;
    };
    const { data: session, status } = useSession();
    const router = useRouter();

    async function addProduct(id: string) {
        if (status !== "authenticated" || !session) {
            toast.error("Please log in first", { position: "top-center" });
            router.push("/login");
            return;
        }

        try {
            const data = await AddProductToCart(id);

            if (data.status === "success") {
                toast.success(data.message, { position: "top-center" });

                const sum = data.data.products.reduce(
                    (total: number, item: { count: number }) => total + item.count,
                    0
                );

                setCount(sum);
            } else {
                toast.error("Incorrect Id", { position: "top-center" });
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", { position: "top-center" });
        }
    }

    return (
        <Button
            onClick={() => addProduct(id)}
            className="bg-main w-full rounded-3xl cursor-pointer"
        >
            Add To Cart
        </Button>
    );
}
