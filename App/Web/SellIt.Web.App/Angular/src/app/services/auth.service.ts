import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { ILoginUserRequest } from '../models/models';

@Injectable()
export class AuthService {

    constructor(private tokenService: TokenService,
        private router: Router) { }

    public logOut(): void {
        this.tokenService.removeToken();
        this.router.navigate(['profile', 'login']);
    }

    public getUserToken(): string {
        return this.tokenService.getToken().token;
    }

    public isloggedIn(): boolean {
        const token = this.tokenService.getToken();

        if (token && token.token) {
            return !token.isExpired();
        }
        return false;
    }
}
