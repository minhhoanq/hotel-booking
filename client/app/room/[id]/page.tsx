import React from "react";
import prisma from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Utensils, Waves, Wifi, Wine } from "lucide-react";
import { formatMoney } from "@/lib/helpers";
import BookingFrom from "@/app/components/BookingForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

interface IAmenities {
    title: string;
    icon: JSX.Element;
}

const Amenities: IAmenities[] = [
    {
        title: "WiFi miễn phí",
        icon: <Wifi size={20} className="text-primary" />,
    },
    {
        title: "Phòng gia đình",
        icon: <Users size={20} className="text-primary" />,
    },
    {
        title: "Giáp biển",
        icon: <Waves size={20} className="text-primary" />,
    },
    {
        title: "Nhà hàng",
        icon: <Utensils size={20} className="text-primary" />,
    },
    {
        title: "Quầy bar",
        icon: <Wine size={20} className="text-primary" />,
    },
];

const getData = async (roomId: string) => {
    noStore();
    const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/rooms/${roomId}?`;

    const data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data.json();
};

const RoomRoutes = async ({ params }: { params: { id: string } }) => {
    const data = await getData(params.id);

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <div className="w-[80%] mx-auto mt-10 mb-10 flex flex-wrap justify-between">
            <div className="w-[100%] lg:w-[69%]">
                <div className="shadow-md border rounded-md p-4">
                    <h1 className="font-medium text-2xl mb-5">{data?.name}</h1>
                    <div className="flex items-center justify-between space-x-4 flex-col lg:flex-row">
                        <div className="lg:h-[350px] md:h-[300px] md:w-full">
                            <img
                                alt="Image room"
                                src={`${data?.image_url}`}
                                className="object-cover rounded-lg h-full w-full"
                            />
                        </div>
                        <div className=" gap-x-24 lg:w-2/3 md:w-full mt-7 lg:mt-0">
                            <div className="w-full flex flex-col justify-center">
                                <h3 className="text-lg font-medium flex items-center space-x-2">
                                    <MapPin size={20} />
                                    <span>{data?.location}</span>
                                </h3>

                                <div className="flex gap-x-2 text-muted-foreground text-sm">
                                    <p>{2} Guests</p> |<p>{2} Bedrooms</p> |
                                    <p>{2} BathRooms</p>
                                </div>

                                <Separator className="my-7" />

                                <p className="text-muted-foreground text-sm">
                                    {data?.description}
                                </p>

                                <Separator className="my-7" />

                                <div className="w-full">
                                    <span className="text-lg font-medium">
                                        Các tiện nghi được ưa chuộng nhất
                                    </span>
                                    <div className="flex justify-between flex-wrap mt-2 text-sm">
                                        {Amenities.map((el, index) => (
                                            <div
                                                key={index}
                                                className="flex space-x-2 items-center"
                                            >
                                                <>{el.icon}</>
                                                <p className=" text-muted-foreground">
                                                    {el.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <BookingFrom email={user?.email || ""} />
                </div>
            </div>
            <div className="w-full mt-7 lg:w-[30%] lg:mt-0 min-w-[250px]">
                <div className="max-h-max p-4 border rounded-sm shadow-md">
                    <h4 className="font-semibold">Giá chi tiết</h4>
                    <div className="my-2 text-sm flex flex-col space-y-2">
                        <div className="flex flex-wrap">
                            <p className="mr-2">1 phòng</p>
                            <p>23 tháng 4 - 26 tháng 4</p>
                        </div>
                        <div className="flex justify-between">
                            <span>Thuế:</span>
                            <span>{formatMoney(100000)} VND</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí:</span>
                            <span>{formatMoney(30000)} VND</span>
                        </div>
                        <Separator className="my-7" />
                        <div className="flex justify-between font-semibold text-primary">
                            <span>Tổng thanh toán:</span>
                            <span>
                                {formatMoney(data?.price as number)} VND
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomRoutes;
