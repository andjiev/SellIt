import { TokenService } from 'angular2-auth';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ILoginUserRequest, ICreateUserRequest } from '../../models/models';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css']
})
export class ProfileLoginComponent {
  public isLogin = true;
  public hide = true;
  public hideRepeated = true;
  public loginFormGroup: FormGroup;
  public signUpFormGroup: FormGroup;
  public isLoading = false;

  public cities = [
    { value: 'bt', viewValue: 'Битола' },
    { value: 'sk', viewValue: 'Скопје' },
    { value: 'ku', viewValue: 'Куманово' },
    { value: 'te', viewValue: 'Тетово' },
    { value: 'pp', viewValue: 'Прилеп' },
    { value: 've', viewValue: 'Велес' }
  ];

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private notificationService: NotificationsService
  ) {
    this.loginFormGroup = formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    this.signUpFormGroup = formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      city: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(9)]]
    });
  }

  public changeForm(): void {
    this.isLogin = !this.isLogin;
    this.hide = true;
  }

  public onSubmit(): void {
    if (this.isLogin && this.loginFormGroup.valid) {
      this.isLoading = true;

      const request: ILoginUserRequest = {
        email: this.loginFormGroup.controls['email'].value,
        password: this.loginFormGroup.controls['password'].value
      };

      this.apiService.loginUser(request).subscribe(
        response => {
          this.tokenService.setToken(response);
          this.router.navigate(['/profile']);
        },
        error => {
          this.isLoading = false;
        }
      );
    }

    else if (this.isLogin) {
      Object.keys(this.loginFormGroup.controls).forEach(field => {
        const control = this.loginFormGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.notificationService.error('Грешка', 'Полињата се задолжителни');
    }

    else if (!this.isLogin && this.signUpFormGroup.valid && this.passwordsMatch()) {
      this.isLoading = true;

      const request: ICreateUserRequest = {
        name: this.signUpFormGroup.controls['name'].value,
        email: this.signUpFormGroup.controls['email'].value,
        password: this.signUpFormGroup.controls['password'].value,
        city: this.cities.find(x => x.value === this.signUpFormGroup.controls['city'].value).viewValue,
        phone: this.signUpFormGroup.controls['phone'].value,
      };

      this.apiService.createUser(request).subscribe(
        response => {
          this.notificationService.success('Успешно', 'Успешна регистрација');
          this.tokenService.setToken(response);
          this.router.navigate(['/profile']);
        },
        error => {
          this.isLoading = false;
         }
      );
    }

    else if (this.signUpFormGroup.valid && !this.passwordsMatch()) {
      this.notificationService.error('Грешка', 'Лозинките не се совпаѓаат');
    }

    else if (!this.isLogin) {
      Object.keys(this.signUpFormGroup.controls).forEach(field => {
        const control = this.signUpFormGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.notificationService.error('Грешка', 'Полињата се задолжителни');
    }
  }

  private passwordsMatch() {
    return this.signUpFormGroup.controls.password.value ===
      this.signUpFormGroup.controls.confirmPassword.value;
  }
}
