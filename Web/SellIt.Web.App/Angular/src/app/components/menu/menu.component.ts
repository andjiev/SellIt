import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent {

    constructor(private router: Router) { }

    navigateToProfile(): void {
        this.router.navigate(['/profile']);
    }

    navigateToAdverts(): void {
        this.router.navigate(['/adverts']);
    }

    navigateToNewAdvert(): void {
       this.router.navigate(['/adverts/new']);
    }
}
