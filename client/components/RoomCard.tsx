import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface iAppProps {
    image_url: string;
    name: string;
    description: string;
    location: string;
    price: number;
    roomId: string;
}

export function RoomCard() {
    return (
        <div className="flex flex-col space-y-2 rounded-md border">
            <div className="relative">
                <img
                    src={`http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTCUwbUZwG5vKw2yVq3ehDBVzfNuDu1jNFigfQPh3kAkWFLyoo5jXkoG-oylbLjdza-e6G9XXcyqhpvV0bsBvQ`}
                    alt="Image of House"
                    className="h-[200px] rounded-t-md object-cover"
                />
            </div>

            <div className="px-2 pb-2">
                <span className="text-blue-600 font-semibold text-base">
                    Love Palace
                </span>
                <h3 className=" text-sm flex space-x-2 items-center">
                    <MapPin color="gray" size={16} />
                    Thu Duc, Ho Chi Minh city
                </h3>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">${"25.00"}</span>
                </p>

                <Link href={`/home/${1}`} className="mt-2 w-full">
                    <Button
                        variant={"outline"}
                        className="w-full text-blue-500 border-blue-500 hover:bg-blue-50 hover:text-blue-500"
                    >
                        See Available Room
                    </Button>
                </Link>
            </div>
        </div>
    );
}
