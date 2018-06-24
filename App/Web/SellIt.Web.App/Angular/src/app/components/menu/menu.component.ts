import { Subscription } from 'rxjs/Subscription';
import { IUserRole } from './../../models/enums';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    private userRoleSubscription: Subscription;

    public role: IUserRole;
    public IUserRole = IUserRole;

    constructor(private router: Router,
        private authService: AuthService) { }

    ngOnInit(): void {
        this.userRoleSubscription = this.authService.getUserRole().subscribe(role => {
            this.role = role;
        });
    }

    isLoggedIn(): boolean {
        return this.authService.isloggedIn();
    }

    navigateToRoleSettings(): void {
        this.router.navigate(['/settings']);
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
        this.router.navigate(['profile', 'login']);
    }

    ngOnDestroy(): void {
        if (this.userRoleSubscription) {
            this.userRoleSubscription.unsubscribe();
            this.userRoleSubscription = null;
        }
    }
}
