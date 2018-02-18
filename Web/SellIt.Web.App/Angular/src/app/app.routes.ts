import { AdvertCategoryComponent } from './components/advert/creation/advert-category.component';
import { AdvertCreationComponent } from './components/advert/creation/advert-creation.component';
import { AdvertDetailsComponent } from './components/advert/details/advert-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdvertComponent } from './components/advert/advert.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileLoginComponent } from './components/profile/profile-login.component';
import { AuthGuardService } from './services/auth-guard.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'adverts', pathMatch: 'full' },

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'adverts',
                component: AdvertComponent
            },
            {
                path: 'adverts/new',
                component: AdvertCategoryComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'adverts/new/:id',
                component: AdvertCreationComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'adverts/:uid',
                component: AdvertDetailsComponent
            },
            {
                path: 'profile/login',
                component: ProfileLoginComponent
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },


    // Handle all other routes
    { path: '**', redirectTo: 'adverts' }
];
