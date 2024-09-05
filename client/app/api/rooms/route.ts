import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Assuming Prisma is set up

interface IRoom {
    id: string;
    name: string;
    description: string;
    price: number;
    location: string;
    image_url: string;
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const location = url.searchParams.get("location") || "";
        const check_in_date = url.searchParams.get("check_in_date");
        const check_out_date = url.searchParams.get("check_out_date");

        const where: any = {};

        if (location) {
            where.location = {
                contains: location,
                mode: "insensitive",
            };
        }
        if (check_in_date && check_out_date) {
            where.check_in_date = {
                gte: new Date(check_in_date),
            };
            where.check_out_date = {
                lte: new Date(check_out_date),
            };
        }

        // Fetch rooms with optional filters
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
