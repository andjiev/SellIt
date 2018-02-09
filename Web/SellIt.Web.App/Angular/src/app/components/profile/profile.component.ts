import { TokenService } from 'angular2-auth';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
