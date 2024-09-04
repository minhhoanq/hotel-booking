import Image from "next/image";
import Link from "next/link";
import Logo from "../public/Trip.com_Icon_2022.png";
import UserNav from "./UserNav";

export default function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-2">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="w-16 hidden lg:block"
                    />

                    <Image
                        src={Logo}
                        alt="Logo"
                        className="block w-12 lg:hidden"
                    />
                </Link>

                <div className="rounded-full border px-5 py-2">
                    <h1>Search</h1>
                </div>

                <UserNav />
            </div>
        </nav>
    );
}
