"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { format } from "date-fns";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const FormSchema = z
    .object({
        room_id: z.string(),
        firstName: z.string({
            required_error: "Vui lòng nhập thông tin",
        }),
        lastName: z.string({
            required_error: "Vui lòng nhập thông tin",
        }),
        email: z.string({
            required_error: "Vui lòng nhập thông tin",
        }),
        phone: z.string({
            required_error: "Vui lòng nhập thông tin",
        }),
        check_in_date: z.date({
            required_error: "Vui lòng chọn ngày nhận phòng",
        }),
        check_out_date: z.date({
            required_error: "Vui lòng chọn ngày trả phòng",
        }),
    })
    .refine((data) => data.check_out_date > data.check_in_date, {
        message: "Ngày trả phòng phải lớn hơn ngày nhận phòng",
        path: ["check_out_date"],
    });

//Convert receipt date and return date to correct timestamp format
function formatDateProperties(data: {
    check_in_date: Date | string;
    check_out_date: Date | string;
}) {
    return {
        ...data,
        check_in_date: moment(data.check_in_date).toISOString(),
        check_out_date: moment(data.check_out_date).toISOString(),
    };
}

const BookingFrom = ({ email }: { email?: string }) => {
    const { id } = useParams();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: email ? email : "",
            room_id: id?.toString() || "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formattedData = formatDateProperties(data);

        console.log(formattedData);
        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        });

        const rs = await response.json();
        console.log(rs);
        toast({
            variant: "default",
            title: "Thành công",
            description: "Đặt phòng thành công.",
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center space-x-2 lg:flex-row lg:space-y-0 lg:space-x-2 sm:md:flex-col sm:md:space-x-0 sm:md:space-y-2 "
            >
                <div className="shadow-md border rounded-md p-4 w-full flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <FormField
                            control={form.control}
                            name="check_in_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Ngày trả phòng</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            Ngày nhận phòng
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <div className="text-sm">-</div>
                        <FormField
                            control={form.control}
                            name="check_out_date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Ngày trả phòng</FormLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            Ngày trả phòng
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className=" flex space-x-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Tên</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Nhập vào đây..."
                                        {...field}
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Họ</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Nhập vào đây..."
                                        {...field}
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className=" flex space-x-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="Nhập vào đây..."
                                        {...field}
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Nhập vào đây..."
                                        {...field}
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">Đặt phòng</Button>
                </div>
            </form>
        </Form>
    );
};

export default BookingFrom;
