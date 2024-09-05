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

const FormSchema = z.object({
    address: z.string({
        required_error: "Vui lòng chọn điểm đến.",
    }),
    check_in_date: z.date().optional(),
    check_out_date: z.date().optional(),
});

export function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get("location");

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        const query = createQueryString("location", data.address);
        router.push(`?${query.toString()}`);
    }

    return (
        <Form {...form}>
            <form
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
                                                date > new Date() ||
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
                                                date > new Date() ||
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
            </form>
        </Form>
    );
}
