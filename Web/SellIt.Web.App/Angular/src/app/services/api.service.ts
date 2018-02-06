import { map } from 'rxjs/operators';
import { ICreateUserRequest } from './../models/models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
    constructor(private httpService: HttpClient) { }

    createUser(request: ICreateUserRequest): Observable<string> {
        const url = this.getUrl('users');
        return this.httpService.post<string>(url, request);
    }

    private getUrl(query: string): string {
        return `${environment.apiUrl}/${query}`;
    }
}
