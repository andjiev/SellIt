import { TokenService } from 'angular2-auth';
import { ICreateUserRequest, ILoginUserRequest, IUserDto } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {
    constructor(private httpService: HttpClient,
        private tokenService: TokenService) { }

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

    private getUrl(query: string): string {
        return `${environment.apiUrl}/${query}`;
    }

    private getJwtHeader() {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.tokenService.getToken().token}`
        });
    }
}
