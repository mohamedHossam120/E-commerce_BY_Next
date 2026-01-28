"use client"
import * as React from "react"
import { useState, useContext } from "react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faRightFromBracket,
    faBars,
    faXmark,
    faCartShopping,
} from "@fortawesome/free-solid-svg-icons"
import { useSession, signOut } from "next-auth/react"
import { CountContext } from "src/CountProvider"

export function Navbar() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const { count } = useContext(CountContext) as {
        count: number
        setCount: React.Dispatch<React.SetStateAction<number>>
    }

    const MenuItems = [
        { path: "/products", content: "Products", requireAuth: false },
        { path: "/wishlist", content: "Wishlist", requireAuth: false },
        { path: "/allorders", content: "Orders", requireAuth: true }, 
    ]

    const MenuAuthItems = [
        { path: "/login", content: "Login" },
        { path: "/register", content: "Register" },
    ]

    function logout() {
        setIsOpen(false)
        signOut({ callbackUrl: "/" })
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-20">
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/images/freshcart-logo.svg"
                        alt="FreshCart Logo"
                        width={130}
                        height={40}
                    />
                </Link>

                <div className="hidden lg:flex items-center flex-grow justify-between ml-8">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="gap-x-1">
                            {/* لينكات المنتجات والـ Wishlist والـ Orders */}
                            {MenuItems.map((item) => (
                                <NavigationMenuItem key={item.path}>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href={item.requireAuth && status !== "authenticated" ? "/login" : item.path}>
                                            {item.content}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}

                            {/* لينك الـ Cart بنفس الشكل الذي أرسلته ولكن داخل القائمة بجانب Orders */}
                            <NavigationMenuItem>
                                <Link
                                    href={status === "authenticated" ? "/cart" : "/login"}
                                    className="relative flex items-center gap-x-2 px-3 py-2 hover:text-main group transition-colors text-sm font-medium"
                                >
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                                        {status === "authenticated" && count > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                                {count}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-medium">Cart</span>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-x-4">
                        {status === "authenticated" ? (
                            <>
                                <span className="px-4 py-2 font-medium truncate max-w-[150px]">
                                    {session?.user?.name}
                                </span>
                                <button
                                    onClick={logout}
                                    className="flex cursor-pointer items-center gap-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <span>Logout</span>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </button>
                            </>
                        ) : (
                            MenuAuthItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className="px-4 py-2 text-sm font-medium hover:text-main transition-colors"
                                >
                                    {item.content}
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                <button
                    aria-label="Toggle menu"
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-xl" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[600px] border-t" : "max-h-0"
                }`}
            >
                <div className="px-4 pt-2 pb-6 bg-gray-50 space-y-1">
                    {MenuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.requireAuth && status !== "authenticated" ? "/login" : item.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-3 font-medium text-gray-700 hover:bg-main hover:text-white rounded-md transition-all"
                        >
                            {item.content}
                        </Link>
                    ))}

                    <div className="border-t mt-2 pt-2">
                        <Link
                            href={status === "authenticated" ? "/cart" : "/login"}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-x-3 px-3 py-3 font-medium text-gray-700 hover:bg-main hover:text-white rounded-md transition-all"
                        >
                            <div className="relative">
                                <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                                {status === "authenticated" && count > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                        {count}
                                    </span>
                                )}
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>

                    <div className="pt-4 mt-4 border-t">
                        {status === "authenticated" ? (
                            <>
                                <p className="px-3 py-2 font-medium text-gray-900 bg-gray-100 rounded-md mb-2">
                                    {session?.user?.name}
                                </p>
                                <button
                                    onClick={logout}
                                    className="w-full cursor-pointer flex items-center gap-x-2 px-3 py-3 font-medium text-red-600 hover:bg-red-50 rounded-md transition-all"
                                >
                                    <span>Logout</span>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </button>
                            </>
                        ) : (
                            MenuAuthItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 font-medium text-gray-600 hover:text-main"
                                >
                                    {item.content}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}