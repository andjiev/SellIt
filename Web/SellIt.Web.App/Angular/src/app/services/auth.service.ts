import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { ILoginUserRequest } from '../models/models';

@Injectable()
export class AuthService {

    constructor(private apiService: ApiService,
        private tokenService: TokenService,
        private router: Router) { }

    public login(request: ILoginUserRequest): void {
        this.apiService.loginUser(request).subscribe(
            response => {
                this.tokenService.setToken(response);
                this.router.navigate(['profile']);
            },
            () => { }
        );
    }

    public logOut(): void {
        this.tokenService.removeToken();
    }

    public getUserUid(): string {
        const token = this.tokenService.getToken();
        return token.decodeToken().unique_name;
    }

    public getUserToken(): any {
        return this.tokenService.getToken();
    }

    public isloggedIn(): boolean {
        const token = this.tokenService.getToken();

        if (token && token.token) {
            return !token.isExpired();
        }
        return false;
    }
}
