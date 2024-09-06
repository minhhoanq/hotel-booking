"use client";

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import React from "react";
import Modal from "../components/Modal";
import { IBooking } from "@/types/booking";
import { useLoader } from "@/context/LoaderContext";

const Page = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<IBooking[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<IBooking>();
    const { setLoading } = useLoader();

    async function getData(): Promise<IBooking[]> {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/bookings`;

            const data = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return data.json();
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        (async () => {
            const data = await getData();
            setData(data as IBooking[]);
        })();
    }, []);

    const handleDataUpdate = async () => {
        const updatedData = await getData();
        setData(updatedData);
    };

    const handleButtonClick = (item: IBooking) => {
        setSelectedItem(item);
        setOpen(true);
    };

    return (
        <div className="relative">
            <Modal
                open={open}
                data={selectedItem!}
                setOpen={setOpen}
                onDataUpdate={handleDataUpdate}
            />
            <div className="w-[80%] mx-auto mt-10 mb-10 flex flex-wrap justify-between grid-cols-1 gap-4">
                <div className="col-span-7 min-h-[500px] border flex flex-col gap-4 relative flex-1 rounded-md p-4">
                    <div>
                        <table className="table-auto mb-6 text-left w-full">
                            <thead className="font-bold bg-primary text-[13px] text-white">
                                <tr className="border border-primary">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Ngày đặt</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Số điện thoại</th>
                                    <th className="px-4 py-2">Trạng thái</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.length > 0 &&
                                    data.map((el, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4">
                                                {index + 1}
                                            </td>
                                            <td className="py-2 px-4">
                                                {el.createdAt}
                                            </td>
                                            <td className="py-2 px-4">
                                                {el.email}
                                            </td>
                                            <td>{el.phone}</td>
                                            <td className="py-2 px-4 ">
                                                {el.status}
                                            </td>
                                            <td className="py-2 px-4">
                                                <Button
                                                    onClick={() =>
                                                        handleButtonClick(el)
                                                    }
                                                >
                                                    <Ellipsis />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
