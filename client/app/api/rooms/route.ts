import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Assuming Prisma is set up
import { IRoom } from "@/types/room";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const location = url.searchParams.get("location") || "";
        const check_in_date = url.searchParams.get("check_in_date");
        const check_out_date = url.searchParams.get("check_out_date");

        const where: any = {};

        // Filter by location if provided
        if (location) {
            where.location = {
                contains: location,
                mode: "insensitive",
            };
        }

        // If check_in_date and check_out_date are provided
        if (check_in_date && check_out_date) {
            // Exclude rooms that have bookings overlapping with the requested dates
            where.Booking = {
                none: {
                    AND: [
                        {
                            check_in_date: {
                                lte: check_in_date,
                            },
                            check_out_date: {
                                gte: check_out_date,
                            },
                        },
                    ],
                },
            };
        }

        const data: IRoom[] = await prisma.rooms.findMany({
            where,
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                location: true,
                image_url: true,
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching rooms" },
            { status: 500 }
        );
    }
}
