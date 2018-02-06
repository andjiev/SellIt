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
