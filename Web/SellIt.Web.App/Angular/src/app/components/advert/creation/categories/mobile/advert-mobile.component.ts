import { IMobileAdvertisementRequest } from './../../../../../models/models';
import { ApiService } from './../../../../../services/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ImageService } from '../../../../../services/image.service';

@Component({
  selector: 'app-advert-mobile',
  templateUrl: './advert-mobile.component.html',
  styleUrls: ['./advert-mobile.component.css']
})
export class AdvertMobileComponent implements OnDestroy {
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
      memory: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]]
    });
  }

  public submitForm(): void {
    if (this.advertForm.valid) {
      const controls = this.advertForm.controls;
      this.isLoading = true;

      const request: IMobileAdvertisementRequest = {
        title: controls.title.value,
        type: +controls.type.value,
        brand: controls.brand.value,
        model: controls.model.value,
        color: controls.color.value,
        memory: controls.memory.value,
        description: controls.description.value,
        price: controls.price.enabled ? +controls.price.value : null,
        base64Images: this.imageService.getBase64Images()
      };

      this.submitFormSubscription = this.apiService.createMobileAdvert(request).subscribe(
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
