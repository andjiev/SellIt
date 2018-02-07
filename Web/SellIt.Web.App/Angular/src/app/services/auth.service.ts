import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { ILoginUserRequest } from '../models/models';

@Injectable()
export class AuthService {

    constructor(private apiService: ApiService,
        private tokenService: TokenService) { }

    public login(request: ILoginUserRequest): void {
        this.apiService.loginUser(request).subscribe(
            response => {
                this.tokenService.setToken(response);
            },
            () => { }
        );
    }

    public logOut(): void {
        this.tokenService.removeToken();
    }

    public getCurrentUserUid(): string {
        const token = this.tokenService.getToken();
        return token.token;
    }

    public isloggedIn(): boolean {
        const token = this.tokenService.getToken();

        if (token && token.token) {
            return !token.isExpired();
        }
        return false;
    }
}
