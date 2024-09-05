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
        const { pathname } = new URL(req.url);
        const roomId = pathname.split("/").pop(); // Assuming your endpoint is structured like /api/rooms/[roomId]
        // Fetch rooms with optional filters
        const room = await prisma.rooms.findFirst({
            where: {
                id: roomId, // Ensure id is treated as a string
            },
        });

        return NextResponse.json(room, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching rooms" },
            { status: 500 }
        );
    }
}
