import { EmptyItem } from "@/app/components/EmptyItem";
import { RoomCard } from "@/app/components/RoomCard";
import { SkeltonCard } from "@/app/components/SkeltonCard";
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
    const queryParams = new URLSearchParams();
    if (searchParams?.location) {
        queryParams.append("location", searchParams.location);
    }
    if (searchParams?.check_in_date) {
        queryParams.append(
            "check_in_date",
            searchParams.check_in_date.toISOString()
        );
    }
    if (searchParams?.check_out_date) {
        queryParams.append(
            "check_out_date",
            searchParams.check_out_date.toISOString()
        );
    }

    // Construct URL with query parameters
    const url = `http://localhost:3000/api/rooms?${queryParams.toString()}`;
    console.log(url);

    const data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data.json();
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
