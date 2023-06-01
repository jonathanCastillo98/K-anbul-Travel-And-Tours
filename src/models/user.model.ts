export interface UserInfo{
    id:number;
    username:string;
    email:string;
    role:string;
    token:string;
    city:string;
    country:string;
    img:string;
    phone:string;
}

export interface HotelInfo{
    address:string;
    cheapestPrice:number;
    city:string;
    createdAt:string;
    description:string;
    distance:string;
    featured:boolean;
    id:number;
    name:string;
    photos:string[];
    rating:number | null;
    rooms:number[];
    title:string;
    type:string;
    updatedAt:string;
}

export interface RoomInfo{
    number:string;
    roomId:string;
    unavailableDates:number[];
}

export interface HotelRoomInfo{
    id:number;
    maxPeople:number;
    price:number;
    title:string;
    description:string;
    roomNumbers:RoomInfo[];
    createdAt:string;
    updatedAt:string;
}

export interface DatesInfo{
    startDate:Date;
    endDate:Date;
    key:string
}


export interface OptionsInfo{
    [key: string]: number;
    adult:number;
    children:number;
    room:number;
}

export interface InputInfo{
    id: string;
    label: string;
    type: string;
    placeholder: string;
}