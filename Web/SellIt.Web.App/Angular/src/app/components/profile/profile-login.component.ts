import { TokenService } from 'angular2-auth';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginUserRequest, ICreateUserRequest } from '../../models/models';

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.css']
})
export class ProfileLoginComponent {
  public isLogin = true;
  public hide = true;
  public loginFormGroup: FormGroup;
  public signUpFormGroup: FormGroup;

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
    private tokenService: TokenService
  ) {
    this.loginFormGroup = formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signUpFormGroup = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  public changeForm(): void {
    this.isLogin = !this.isLogin;
  }

  public finishForm(): void {
    if (this.isLogin && this.loginFormGroup.valid) {
      const request: ILoginUserRequest = {
        email: this.loginFormGroup.controls['email'].value,
        password: this.loginFormGroup.controls['password'].value
      };
      this.apiService.loginUser(request).subscribe(
        response => {
          this.tokenService.setToken(response);
          this.router.navigate(['/profile']);
        },
        error => { }
      );
    }

    if (!this.isLogin && this.signUpFormGroup.valid) {

      const request: ICreateUserRequest = {
        name: this.signUpFormGroup.controls['name'].value,
        email: this.signUpFormGroup.controls['email'].value,
        password: this.signUpFormGroup.controls['password'].value,
        city: this.cities.find(x => x.value === this.signUpFormGroup.controls['city'].value).viewValue,
        phone: this.signUpFormGroup.controls['phone'].value,
      };

      this.apiService.createUser(request).subscribe(
        response => {
          this.tokenService.setToken(response);
          this.router.navigate(['/profile']);
        },
        error => { }
      );
    }
  }
}
