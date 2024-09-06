import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Assuming Prisma is set up

// GET /api/rooms/[roomId]
export async function GET(req: Request) {
    try {
        const { pathname } = new URL(req.url);
        const roomId = pathname.split("/").pop(); // Get roomId at endpoint

        const room = await prisma.rooms.findFirst({
            where: {
                id: roomId,
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
