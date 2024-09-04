import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lgLpx-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img
                        src={
                            user?.picture ??
                            "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
                        }
                        alt="Image of the user"
                        className="rounded-full h-8 w-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">Sign out</LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Sign in</LoginLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">
                                Sign up
                            </RegisterLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
