import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ICarAdvertisementRequest } from './../../../../models/models';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ApiService } from '../../../../services/api.service';

@Component({
    selector: 'app-advert-car',
    templateUrl: './advert-car.component.html',
    styleUrls: ['./advert-car.component.css']
})
export class AdvertCarComponent implements OnDestroy {

    private submitFormSubscription: Subscription;

    public advertForm: FormGroup;
    public isLoading = false;

    constructor(private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private router: Router,
        private apiService: ApiService) {

        this.advertForm = formBuilder.group({
            title: ['', [Validators.required]],
            type: ['1', [Validators.required]],
            brand: ['', [Validators.required]],
            model: ['', [Validators.required]],
            color: ['', [Validators.required]],
            body: ['', [Validators.required]],
            year: ['', [Validators.required]],
            kmTraveled: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required]]
        });
    }

    public submitForm(): void {
        if (this.advertForm.valid) {
            const controls = this.advertForm.controls;
            this.isLoading = true;

            const request: ICarAdvertisementRequest = {
                title: controls.title.value,
                type: +controls.type.value,
                brand: controls.brand.value,
                model: controls.model.value,
                color: controls.color.value,
                body: controls.body.value,
                year: +controls.year.value,
                kmTraveled: +controls.kmTraveled.value,
                description: controls.description.value,
                price: controls.price.enabled ? +controls.price.value : null
            };

            this.submitFormSubscription = this.apiService.createCarAdvert(request).subscribe(
                response => {
                    this.notificationService.success('Успешно', 'Огласот е успешно додаден');
                    this.router.navigate(['adverts']);
                },
                error => {
                    this.isLoading = false;
                }
            );
        }
        else {
            Object.keys(this.advertForm.controls).forEach(field => {
                const control = this.advertForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            this.notificationService.error('Грешка', 'Полињата се задолжителни');
        }
    }

    public handleChange(value: any): void {
        value.checked ? this.advertForm.controls.price.disable()
            : this.advertForm.controls.price.enable();
    }

    ngOnDestroy() {
        if (this.submitFormSubscription) {
            this.submitFormSubscription.unsubscribe();
        }
    }
}
