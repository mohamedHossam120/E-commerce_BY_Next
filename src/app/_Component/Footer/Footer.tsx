import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="bg-[#0aad0a] text-white pt-12 pb-6 mt-10">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    <div className="space-y-4">
                        <Image
                            src="/images/freshcart-logo.svg"
                            alt="FreshCart Logo"
                            width={140}
                            height={45}
                            className="brightness-0 invert"
                        />
                        <p className="text-white/80 text-sm leading-relaxed">
                            FreshCart is your one-stop shop for all your daily needs.
                            From fresh vegetables to latest electronics, we deliver everything to your doorstep.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="hover:underline transition-all text-white/90">Products</Link></li>
                            <li><Link href="/wishlist" className="hover:underline transition-all text-white/90">Wishlist</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-lg">Help Center</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline transition-all text-white/90">Contact Us</Link></li>
                            <li><Link href="#" className="hover:underline transition-all text-white/90">Terms & Conditions</Link></li>
                            <li><Link href="#" className="hover:underline transition-all text-white/90">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:underline transition-all text-white/90">Track Order</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold mb-4 text-lg">Follow Us</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">
                    <p>© 2026 FreshCart. All rights reserved.</p>
                    <p>Designed with ❤️ Mohamed Hossam.</p>
                </div>
            </div>
        </footer>
    );
}