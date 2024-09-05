import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/bookings
export async function PUT(req: Request) {
    try {
        const { status } = await req.json();
        const { pathname } = new URL(req.url);
        const bookingId = pathname.split("/").pop();
        const bookingExist = await prisma.bookings.findUnique({
            where: {
                id: bookingId,
            },
        });

        if (!bookingExist) {
            return NextResponse.json("Booking is not exist", { status: 500 });
        }

        await prisma.bookings.update({
            where: {
                id: bookingId,
            },
            data: {
                status,
            },
        });

        return NextResponse.json("Booking update successfully", {
            status: 201,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating booking" },
            { status: 500 }
        );
    }
}
