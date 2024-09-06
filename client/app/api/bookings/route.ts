import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/bookings
export async function POST(req: Request) {
    try {
        const { room_id, email, phone, check_in_date, check_out_date } =
            await req.json();

        const userExist = await prisma.users.findFirst({
            where: {
                email,
            },
        });

        if (userExist) {
            await prisma.users.update({
                where: {
                    email: email,
                },
                data: {
                    phone: phone,
                },
            });
        }

        const booking = await prisma.bookings.create({
            data: {
                room_id,
                email,
                phone,
                check_in_date,
                check_out_date,
                status: "Đang xử lí",
            },
        });
        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating booking" },
            { status: 500 }
        );
    }
}

// GET /api/bookings
export async function GET() {
    try {
        const bookings = await prisma.bookings.findMany({
            select: {
                id: true,
                room_id: true,
                email: true,
                phone: true,
                check_in_date: true,
                check_out_date: true,
                status: true,
                createdAt: true,
                Room: {
                    select: {
                        id: true,
                        name: true,
                        image_url: true,
                        price: true,
                        description: true,
                        location: true,
                    },
                },
            },
        });

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error creating booking" },
            { status: 500 }
        );
    }
}
