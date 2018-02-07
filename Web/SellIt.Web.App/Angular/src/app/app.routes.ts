import { AdvertCreationComponent } from './components/advert/advert-creation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdvertComponent } from './components/advert/advert.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AdvertDetailsComponent } from './components/advert/advert-details.component';

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
                component: AdvertCreationComponent
            },
            {
                path: 'adverts/details',
                component: AdvertDetailsComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },


    // Handle all other routes
    { path: '**', redirectTo: 'home' }
];
