import { EmptyItem } from "@/components/EmptyItem";
import { RoomCard } from "@/components/RoomCard";
import { SkeltonCard } from "@/components/SkeltonCard";
import prisma from "@/lib/db";
import { Suspense } from "react";

interface IRoom {
    id: string;
    name: string;
    description: string;
    price: number;
    location: string;
    image_url: string;
}

async function getData({
    searchParams,
}: {
    searchParams?: {
        location?: string;
        check_in_date?: Date;
        check_out_date?: Date;
    };
}): Promise<IRoom[]> {
    const data: IRoom[] = await prisma.rooms.findMany({
        where: {
            location: {
                contains: searchParams?.location || "",
                mode: "insensitive",
            },
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            location: true,
            image_url: true,
        },
    });
    return data;
}

const ShowItems = async ({
    searchParams,
}: {
    searchParams?: {
        location?: string;
        check_in_date?: Date;
        check_out_date?: Date;
    };
}) => {
    const data: IRoom[] = await getData({
        searchParams: { location: searchParams?.location },
    });

    return (
        <>
            {data.length === 0 ? (
                <EmptyItem
                    description="Please check a other category or create your own listing!"
                    title="Sorry no listings found for this category..."
                />
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 place-items-center">
                    {data.map((el, index) => (
                        <RoomCard key={index} el={el} />
                    ))}
                </div>
            )}
        </>
    );
};

export default async function Home({
    searchParams,
}: {
    searchParams?: {
        location?: string;
        check_in_date?: Date;
        check_out_date?: Date;
    };
}) {
    return (
        <div className="container mx-auto px-5 lg:px-10">
            <Suspense
                key={searchParams?.location}
                fallback={<SkeletonLoading />}
            >
                <ShowItems searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
        </div>
    );
}
