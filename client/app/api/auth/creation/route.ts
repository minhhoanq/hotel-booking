import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";

/**
 * 
 * @returns 
 * {
        id: '',
        email: '',
        family_name: 'Trần',
        given_name: 'Hoàng',
        picture: '',
        username: undefined,
        phone_number: undefined
        }
 */
// Create user if user does not exist in database, user signin with email
export async function GET() {
    //get user infomation
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user.id) {
        throw new Error("Something went wrong...");
    }

    let dbUser = await prisma.users.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        dbUser = await prisma.users.create({
            data: {
                email: user.email ?? "",
                phone: "",
                first_name: user.given_name ?? "",
                last_name: user.family_name ?? "",
                id: user.id ?? "",
                profile_image:
                    user.picture ??
                    "https://upload.wikimedia.org/wikipedia/commons/1/1a/Trip.com_Icon_2022.png",
            },
        });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/`);
}
