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

  public hide = true;
  public hideRepeated = true;

  constructor(private apiService: ApiService,
  private tokenService: TokenService) { }

  ngOnInit() {
    console.log(this.tokenService.getToken());
    this.apiService.getUserDetails().subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
