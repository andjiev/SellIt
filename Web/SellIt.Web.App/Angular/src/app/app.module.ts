import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './theme/material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AdvertComponent } from './components/advert/advert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdvertCreationComponent } from './components/advert/advert-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from 'angular2-auth';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LayoutComponent,
    AdvertComponent,
    ProfileComponent,
    AdvertCreationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ApiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
