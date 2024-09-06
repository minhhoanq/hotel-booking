"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../../components/ui/input";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import moment from "moment";

const FormSchema = z
    .object({
        address: z.string({
            required_error: "Vui lòng chọn điểm đến.",
        }),
        check_in_date: z.date().optional(),
        check_out_date: z.date().optional(),
    })
    //Check check out date > check in date
    .refine(
        (data) => {
            if (data.check_in_date && data.check_out_date) {
                return data.check_out_date > data.check_in_date;
            }
            return true;
        },
        {
            message: "Ngày trả phòng phải lớn hơn ngày nhận phòng",
            path: ["check_out_date"],
        }
    );

export function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get("location");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        let query = new URLSearchParams(searchParams.toString());

        // Add location, check_in_date, and check_out_date to the query string
        query.set("location", data.address);
        query.set("check_in_date", moment(data.check_in_date).toISOString());
        query.set("check_out_date", moment(data.check_out_date).toISOString());

        // Navigate to the new route
        router.replace(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/?${query.toString()}`
        );
    }

    return (
        <Form {...form}>
            {/* <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center space-x-2 lg:flex-row lg:space-y-0 lg:space-x-2 sm:md:flex-col sm:md:space-x-0 sm:md:space-y-2"
            >
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <Input
                                type="text"
                                placeholder="Điểm đến"
                                {...field}
                            />
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className="flex items-center space-x-2">
                    <FormField
                        control={form.control}
                        name="check_in_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Ngày nhận phòng</span>
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
                                                date < new Date("1900-01-01")
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
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Ngày trả phòng</span>
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
                                                date < new Date("1900-01-01")
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
                <Button type="submit">Tìm</Button>
            </form> */}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2  sm:flex-row sm:space-y-0 sm:space-x-2 w-full lg:space-y-0 sm:justify-center"
            >
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full lg:w-auto">
                            <Input
                                type="text"
                                placeholder="Điểm đến"
                                {...field}
                            />
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <FormField
                        control={form.control}
                        name="check_in_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full lg:w-auto">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full lg:w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Ngày nhận phòng</span>
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
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <div className="text-sm flex items-center justify-center">
                        -
                    </div>
                    <FormField
                        control={form.control}
                        name="check_out_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full lg:w-auto">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full lg:w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Ngày trả phòng</span>
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
                                                date < new Date("1900-01-01")
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
                <Button type="submit" className="w-full lg:w-auto">
                    Tìm
                </Button>
            </form>
        </Form>
    );
}
