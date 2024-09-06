import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lgLpx-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-7 lg:h-7" />
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
                            <Link href={"/admin"} className="w-full">
                                Quản lí
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">
                                Đăng xuất
                            </LogoutLink>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Đăng nhập</LoginLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">
                                Đăng ký
                            </RegisterLink>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
