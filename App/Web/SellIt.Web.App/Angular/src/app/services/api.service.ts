import { AuthService } from './auth.service';
import {
    ICreateUserRequest, ILoginUserRequest,
    IUserDto, IMobileAdvertisementRequest,
    IAdvertisementRequest, ICarAdvertisementRequest,
    IAdvertisementDto,
    IAdvertisementDetails,
    IUpdateUserProfileRequest,
    IUpdateUserPasswordRequest,
    IListResultDto
} from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {
    constructor(private httpService: HttpClient,
        private authService: AuthService) { }

    createUser(request: ICreateUserRequest): Observable<string> {
        const url = this.getUrl('users');
        return this.httpService.post<string>(url, request);
    }

    loginUser(request: ILoginUserRequest): Observable<string> {
        const url = this.getUrl('users/login');
        return this.httpService.post<string>(url, request);
    }

    getUserDetails(): Observable<IUserDto> {
        const url = this.getUrl('users');
        return this.httpService.get<IUserDto>(url, { headers: this.getJwtHeader() });
    }

    updateUserProfile(request: IUpdateUserProfileRequest): Observable<any> {
        const url = this.getUrl('users');
        return this.httpService.patch<any>(url, request, { headers: this.getJwtHeader() });
    }

    updateUserPassword(request: IUpdateUserPasswordRequest): Observable<any> {
        const url = this.getUrl('users/password');
        return this.httpService.patch<any>(url, request, { headers: this.getJwtHeader() });
    }

    createMobileAdvert(request: FormData): Observable<any> {
        const url = this.getUrl('advertisements/mobile');
        return this.httpService.post<any>(url, request, { headers: this.getJwtHeader() });
    }

    createCarAdvert(request: FormData): Observable<any> {
        const url = this.getUrl('advertisements/car');
        return this.httpService.post<any>(url, request, { headers: this.getJwtHeader() });
    }

    getAdverts(paging: any): Observable<IListResultDto<IAdvertisementDto[]>> {
        console.log(paging);
        const url = this.getUrl(`advertisements?page=${paging.page}&pageSize=${paging.pageSize}&category=${paging.category}&searchString=${paging.searchString}&location=${paging.location}`);
        return this.httpService.get<IListResultDto<IAdvertisementDto[]>>(url);
    }

    getAdvertDetails(advertUid: string): Observable<IAdvertisementDetails> {
        const url = this.getUrl(`advertisements/${advertUid}`);
        return this.httpService.get<IAdvertisementDetails>(url);
    }

    deleteAdvert(advertUid: string): Observable<any> {
        const url = this.getUrl(`advertisements/${advertUid}`);
        return this.httpService.delete<Observable<any>>(url, { headers: this.getJwtHeader() });
    }

    private getUrl(query: string): string {
        return `${environment.apiUrl}/${query}`;
    }

    private getJwtHeader() {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getUserToken()}`
        });
    }
}
