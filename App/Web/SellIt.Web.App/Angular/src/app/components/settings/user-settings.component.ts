import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonVariables } from './../../utils/commonVariables';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { IUpdateUserSettingsRequest } from '../../models/models';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.template.html'
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    private getAllUserDetailsSubscription: Subscription;
    private updateUserSettingsSubsription: Subscription;

    public emails: string[];
    public roles = CommonVariables.roles;
    public formGroup: FormGroup;
    public isLoading = true;

    constructor(private apiService: ApiService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService) {
        this.formGroup = this.formBuilder.group({
            email: [null, [Validators.required]],
            role: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.getAllUserDetailsSubscription = this.apiService.getAllUserDetails().subscribe(
            response => {
                this.emails = response.map(user => user.email);
                this.isLoading = false;
            },
            error => {
                switch (error.status) {
                    case 401:
                        this.notificationService.error('Грешка', 'Само администратор може да прави измени');
                        break;
                    default:
                        this.notificationService.error('Грешка', 'Проблем со серверот');
                        break;
                }
            });
    }

    public updateUserSettings(): void {
        if (!this.formGroup.valid) {
            Object.keys(this.formGroup.controls).forEach(field => {
                const control = this.formGroup.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            this.notificationService.error('Грешка', 'Полињата се задолжителни');
            return;
        }

        const request: IUpdateUserSettingsRequest = {
            email: this.formGroup.controls['email'].value,
            role: +this.formGroup.controls['role'].value
        };

        this.updateUserSettingsSubsription = this.apiService.updateUserSettings(request).subscribe(
            response => {
                this.notificationService.success('Успешно', 'Улогата е усшешно додадена');
            },
            error => {
                switch (error.status) {
                    case 401:
                        this.notificationService.error('Грешка', 'Само администратор може да прави измени');
                        break;
                    case 404:
                        this.notificationService.error('Грешка', `Не постои корисник со емаил - ${request.email}`);
                        break;
                    default:
                        this.notificationService.error('Грешка', 'Проблем со серверот');
                        break;
                }
            });
    }

    ngOnDestroy(): void {
        if (this.getAllUserDetailsSubscription) {
            this.getAllUserDetailsSubscription.unsubscribe();
            this.getAllUserDetailsSubscription = null;
        }
        if (this.updateUserSettingsSubsription) {
            this.updateUserSettingsSubsription.unsubscribe();
            this.updateUserSettingsSubsription = null;
        }
    }
}
