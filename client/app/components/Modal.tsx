import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatMoney } from "@/lib/helpers";
import { X } from "lucide-react";
import React from "react";

const Modal = (props: {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any;
}) => {
    const item = props.data;

    const handleCancelBooking = async () => {
        await fetch(`/api/bookings/${item?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Đã hủy" }),
        })
            .then(() => {
                props.setOpen(false);

                toast({
                    variant: "default",
                    title: "Thành công",
                    description: "Hủy đặt phòng.",
                });
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Thất bại",
                    description: "Có lỗi xảy ra, vui lòng thử lại sau.",
                });
            });
    };

    const handleConfirmBooking = async () => {
        await fetch(`/api/bookings/${item?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Thành công" }),
        })
            .then(() => {
                props.setOpen(false);
                toast({
                    variant: "default",
                    title: "Thành công",
                    description: "Xác nhận đặt phòng.",
                });
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Thất bại",
                    description: "Có lỗi xảy ra, vui lòng thử lại sau.",
                });
            });
    };

    return (
        <div
            className={`fixed inset-0 z-[99998] bg-overlay flex items-center justify-center ${
                props.open ? "" : "hidden"
            }`}
        >
            <div className="relative bg-white max-hmax w-[500px] p-2 rounded-sm shadow-md">
                <div
                    className="absolute top-2 right-2"
                    onClick={() => props.setOpen(false)}
                >
                    <X size={20} />
                </div>
                <span className="font-semibold text-xl">
                    Chi tiết đặt phòng
                </span>
                <div className="flex flex-col space-y-4 mt-4">
                    <div className="border p-2 rounded-sm bg-gray-100">
                        <span className=" font-semibold ">
                            Thông tin liên hệ
                        </span>
                        <div>
                            <h4>Email: {item?.email}</h4>
                            <h4>Số điện thoại: {item?.phone}</h4>
                        </div>
                    </div>

                    <div className="border p-2 rounded-sm bg-gray-100">
                        <span className=" font-semibold ">Thông tin phòng</span>
                        <div>
                            <div className="flex space-x-2 font-semibold">
                                <img
                                    src={item?.Room.image_url}
                                    alt="room"
                                    className="h-[100px]"
                                />
                                <span>{item?.Room.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <h4>Ngày đặt: </h4>
                                <span>{item?.createdAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <h4>Ngày nhận phòng: </h4>
                                <span>{item?.check_in_date}</span>
                            </div>
                            <div className="flex justify-between">
                                <h4>Ngày trả phòng: </h4>
                                <span>{item?.check_out_date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border p-2 rounded-sm ">
                        <span className=" font-semibold ">
                            Chi tiết thanh toán
                        </span>
                        <div className="flex justify-between">
                            <h4>Tổng thanh toán: </h4>
                            <span className="text-primary font-semibold">
                                {formatMoney(item?.Room.price)}
                            </span>
                        </div>
                    </div>
                </div>
                {item?.status === "Đang xử lí" ? (
                    <div className="flex justify-end space-x-4 mt-8">
                        <Button
                            variant={"destructive"}
                            onClick={handleCancelBooking}
                        >
                            Hủy đơn
                        </Button>
                        <Button onClick={handleConfirmBooking}>
                            Xác nhận đơn
                        </Button>
                    </div>
                ) : item?.status === "Thành công" ? (
                    <div className="w-full flex justify-center items-center h-[40px] bg-green-600 text-white mt-8">
                        {item?.status}
                    </div>
                ) : (
                    <div className="w-full flex justify-center items-center h-[40px] bg-red-600 text-white mt-8">
                        {item?.status}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
