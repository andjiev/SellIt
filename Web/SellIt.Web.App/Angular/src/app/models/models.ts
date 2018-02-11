export interface ILoginUserRequest {
    email: string;
    password: string;
}

export interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
    city: string;
    phone: string;
}

export interface IUserDto {
    name: string;
    email: string;
    city: string;
    phone: string;
}

export interface IAdvertisementRequest {
    title: string;
    type: number;
    description: string;
    price: number;
}

export interface IMobileAdvertisementRequest extends IAdvertisementRequest {
    brand: string;
    model: string;
    memory: string;
    color: string;
}

export interface ICarAdvertisementRequest extends IAdvertisementRequest {
    brand: string;
    model: string;
    body: string;
    color: string;
    year: number;
    kmTraveled: number;
}
