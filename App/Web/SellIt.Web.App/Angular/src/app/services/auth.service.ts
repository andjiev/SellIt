import { IUserRole } from './../models/enums';
import { IUserManagerDto } from './../models/models';
import { Injectable } from '@angular/core';
import { TokenService } from 'angular2-auth';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private role: Subject<IUserRole> = new Subject<IUserRole>();

    constructor(private tokenService: TokenService) { }

    public logIn(user: IUserManagerDto): void {
        this.tokenService.setToken(user.authToken);
        this.role.next(user.role);
    }

    public logOut(): void {
        this.tokenService.removeToken();
        this.role.next(null);
    }

    public getUserToken(): string {
        return this.tokenService.getToken().token;
    }

    public getUserRole(): Observable<IUserRole> {
        return this.role.asObservable();
    }

    public isloggedIn(): boolean {
        const token = this.tokenService.getToken();

        if (token && token.token) {
            return !token.isExpired();
        }
        return false;
    }
}
