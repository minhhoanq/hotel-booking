import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { formatMoney } from "@/lib/helpers";

interface IRooms {
    id: string;
    name: string;
    description: string;
    price: number;
    location: string;
    image_url: string;
}

export function RoomCard(props: { el: IRooms }) {
    const data = props.el;

    return (
        <div className="flex flex-col space-y-2 rounded-md border ">
            <div className="relative h-90">
                <img
                    src={`${data.image_url}`}
                    alt="Image of House"
                    className="rounded-t-lg h-full object-cover"
                />
            </div>

            <div className="px-2 pb-2 flex flex-col space-y-2">
                <span className="text-primary font-semibold text-base line-clamp-1">
                    {data.name}
                </span>
                <h3 className=" text-sm flex space-x-2 items-center">
                    <MapPin color="gray" size={16} />
                    {data.location}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                    {data.description}
                </p>
                <p className="text-muted-foreground">
                    <span className="font-medium text-black">
                        {formatMoney(data.price)} VND
                    </span>
                </p>

                <Link href={`/room/${data.id}`} className="mt-2 w-full">
                    <Button
                        variant={"outline"}
                        className="w-full text-primary border-primary hover:bg-blue-50 hover:text-primary"
                    >
                        See Available Room
                    </Button>
                </Link>
            </div>
        </div>
    );
}
