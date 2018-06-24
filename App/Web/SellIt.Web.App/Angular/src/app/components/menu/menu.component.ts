import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor(private router: Router,
        private authService: AuthService) { }

    isLoggedIn(): boolean {
        return this.authService.isloggedIn();
    }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }

    navigateToAdverts(): void {
        this.router.navigate(['/adverts']);
    }

    navigateToNewAdvert(): void {
        this.router.navigate(['/adverts/new']);
    }

    navigateToLogin(): void {
        this.router.navigate(['/profile/login']);
    }

    logOut(): void {
        this.authService.logOut();
    }
}
