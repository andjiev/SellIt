import { AuthService } from './auth.service';
import {
    ICreateUserRequest,
    ILoginUserRequest,
    IUserDto,
    IAdvertisementDto,
    IAdvertisementDetails,
    IUpdateUserProfileRequest,
    IUpdateUserPasswordRequest,
    IListResultDto,
    IUserManagerDto,
    IUpdateUserSettingsRequest
} from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
    constructor(private httpService: HttpClient,
        private authService: AuthService) { }

    createUser(request: ICreateUserRequest): Observable<IUserManagerDto> {
        const url = this.getUrl('users');
        return this.httpService.post<IUserManagerDto>(url, request);
    }

    loginUser(request: ILoginUserRequest): Observable<IUserManagerDto> {
        const url = this.getUrl('users/login');
        return this.httpService.post<IUserManagerDto>(url, request);
    }

    getAllUserDetails(): Observable<IUserDto[]> {
        const url = this.getUrl('users/details');
        return this.httpService.get<IUserDto[]>(url, { headers: this.getJwtHeader() });
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

    updateUserSettings(request: IUpdateUserSettingsRequest): Observable<any> {
        const url = this.getUrl('users/settings');
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
