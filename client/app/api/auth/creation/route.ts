import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
    try {
        noStore();
        // Get user information
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            throw new Error("User not found.");
        }

        // Check if the user exists in the database
        let dbUser = await prisma.users.findUnique({
            where: { id: user.id },
        });

        // Create a new user if not found in the database
        if (!dbUser) {
            dbUser = await prisma.users.create({
                data: {
                    email: user.email ?? "",
                    phone: user.phone_number ?? "",
                    first_name: user.given_name ?? "",
                    last_name: user.family_name ?? "",
                    id: user.id ?? "",
                    profile_image:
                        user.picture ??
                        "https://upload.wikimedia.org/wikipedia/commons/1/1a/Trip.com_Icon_2022.png",
                },
            });
        }

        // Redirect to the client URL
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/`);
    } catch (error) {
        // Handle error appropriately
        console.error("Error in GET handler:", error);
        return NextResponse.error(); // Adjust this as needed
    }
}
