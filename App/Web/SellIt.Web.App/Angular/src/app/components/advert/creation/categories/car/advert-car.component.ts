import { ICarAdvertisementRequest } from './../../../../../models/models';
import { ApiService } from './../../../../../services/api.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ImageService } from '../../../../../services/image.service';

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
        private apiService: ApiService,
        private imageService: ImageService) {

        this.advertForm = formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            type: ['1', [Validators.required]],
            brand: ['', [Validators.required, Validators.minLength(3)]],
            model: ['', [Validators.required, Validators.minLength(1)]],
            color: ['', [Validators.required, Validators.minLength(3)]],
            body: ['', [Validators.required, Validators.minLength(4)]],
            year: ['', [Validators.required, Validators.minLength(4)]],
            kmTraveled: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required]]
        });
    }

    public submitForm(): void {
        if (!this.advertForm.valid) {
            Object.keys(this.advertForm.controls).forEach(field => {
                const control = this.advertForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
            this.notificationService.error('Грешка', 'Полињата се задолжителни');
            return;
        }
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
        const formData = this.createFormData(request, this.imageService.getImages());

        this.submitFormSubscription = this.apiService.createCarAdvert(formData).subscribe(
            response => {
                this.notificationService.success('Успешно', 'Огласот е успешно додаден');
                this.router.navigate(['adverts']);
            },
            error => {
                switch (error.status) {
                    default:
                        this.notificationService.error('Грешка', 'Проблем со серверот');
                        break;
                }
                this.isLoading = false;
            }
        );
    }

    public handleChange(value: any): void {
        value.checked ? this.advertForm.controls.price.disable()
            : this.advertForm.controls.price.enable();
    }

    private createFormData(request, files: any[]): FormData {
        const formData = new FormData();

        formData.append('model', JSON.stringify(request));
        for (const file of files) {
            formData.append('files', file.file, file.file.name);
        }
        return formData;
    }

    ngOnDestroy() {
        if (this.submitFormSubscription) {
            this.submitFormSubscription.unsubscribe();
        }
        this.imageService.clearImages();
    }
}
