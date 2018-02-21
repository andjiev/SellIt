import { IAdvertisementCategory, IAdvertisementType } from './enums';

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
    price?: number;
    base64Images: string[];
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

export interface IAdvertisementDto {
    uid: string;
    createdOn: Date;
    title: string;
    category: IAdvertisementCategory;
    price?: number;
    location: string;
    base64Image: string;
}

export interface IAdvertisementDetails {
    title: string;
    createdOn: Date;
    type: IAdvertisementType;
    category: IAdvertisementCategory;
    description: string;
    price?: number;
    name: string;
    location: string;
    phone: string;
    brand: string;
    model: string;
    memory: string;
    color: string;
    body: string;
    year?: number;
    kmTraveled?: number;
    base64Images: string[];
}

export interface IUpdateUserProfileRequest {
    name: string;
    email: string;
    city: string;
    phone: string;
}

export interface IUpdateUserPasswordRequest {
    currentPassword: string;
    newPassword: string;
}
