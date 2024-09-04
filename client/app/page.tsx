import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

// Định nghĩa showItems là một component React
const ShowItems = () => {
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 place-items-center px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => (
                <RoomCard key={index} />
            ))}
        </div>
    );
};

// Sử dụng ShowItems trong component chính
export default function Home() {
    return (
        <div>
            <ShowItems />
        </div>
    );
}
