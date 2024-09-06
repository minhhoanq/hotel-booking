import { IRoom } from "./room";

export interface IBooking {
    id: string;
    room_id: string;
    email: string;
    phone: string;
    check_in_date: string;
    check_out_date: string;
    status: string;
    createdAt: string;
    Room: IRoom;
}
