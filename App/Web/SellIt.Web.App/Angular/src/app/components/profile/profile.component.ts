import { IUpdateUserProfileRequest, IUpdateUserPasswordRequest } from './../../models/models';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from 'angular2-auth';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public cities = [
    { value: 'bt', viewValue: 'Битола' },
    { value: 'sk', viewValue: 'Скопје' },
    { value: 'ku', viewValue: 'Куманово' },
    { value: 'te', viewValue: 'Тетово' },
    { value: 'pp', viewValue: 'Прилеп' },
    { value: 've', viewValue: 'Велес' }
  ];

  public passwordForm: FormGroup;
  public profileForm: FormGroup;
  public isProfile = true;
  public hideCurrent = true;
  public hideNew = true;
  public hideRepeated = true;
  public isLoading = true;
  public clickedSave = false;

  constructor(private apiService: ApiService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService) {
    this.passwordForm = formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.profileForm = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  public changeForm(): void {
    this.isProfile = !this.isProfile;
  }

  public onSubmit(): void {
    if (this.isProfile && this.profileForm.valid) {
      this.clickedSave = true;

      const request: IUpdateUserProfileRequest = {
        name: this.profileForm.controls['name'].value,
        email: this.profileForm.controls['email'].value,
        city: this.cities.find(x => x.value === this.profileForm.controls['city'].value).viewValue,
        phone: this.profileForm.controls['phone'].value,
      };

      this.apiService.updateUserProfile(request).subscribe(
        response => {
          this.notificationService.success('Успешно', 'Промените се успешно зачувани');
        },
        error => {
          switch (error.status) {
            case 400:
              this.notificationService.error('Грешка', 'Емаилот веќе е регистриран');
              break;
            default:
              this.notificationService.error('Грешка', 'Проблем со серверот');
              break;
          }
          this.clickedSave = false;
        },
        () => {
          this.clickedSave = false;
        }
      );
    }

    else if (this.isProfile) {
      Object.keys(this.profileForm.controls).forEach(field => {
        const control = this.profileForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.notificationService.error('Грешка', 'Полињата се задолжителни');
    }

    else if (!this.isProfile && this.passwordForm.valid && this.passwordsMatch()) {
      this.clickedSave = true;

      const request: IUpdateUserPasswordRequest = {
        currentPassword: this.passwordForm.controls['currentPassword'].value,
        newPassword: this.passwordForm.controls['newPassword'].value,
      };

      this.apiService.updateUserPassword(request).subscribe(
        response => {
          this.notificationService.success('Успешно', 'Лозинката е успешно променета');
        },
        error => {
          switch (error.status) {
            case 404:
              this.notificationService.error('Грешка', 'Лозинката не е точна');
              break;
            default:
              this.notificationService.error('Грешка', 'Проблем со серверот');
              break;
          }
          this.clickedSave = false;
        },
        () => {
          this.clickedSave = false;
        }
      );
    }

    else if (this.passwordForm.valid && !this.passwordsMatch()) {
      this.notificationService.error('Грешка', 'Лозинките не се совпаѓаат');
    }

    else if (!this.isProfile) {
      Object.keys(this.passwordForm.controls).forEach(field => {
        const control = this.passwordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.notificationService.error('Грешка', 'Полињата се задолжителни');
    }
  }

  ngOnInit() {
    this.apiService.getUserDetails().subscribe(
      response => {
        const controls = this.profileForm.controls;
        controls.name.setValue(response.name);
        controls.email.setValue(response.email);
        controls.city.setValue(this.cities.find(x => x.viewValue === response.city).value);
        controls.phone.setValue(response.phone);
        this.isLoading = false;
      },
      error => {
        switch (error.status) {
          default:
            this.notificationService.error('Грешка', 'Проблем со серверот');
            break;
        }
      }
    );
  }

  private passwordsMatch() {
    return this.passwordForm.controls.newPassword.value ===
      this.passwordForm.controls.confirmPassword.value;
  }
}
