import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor() { }

  ngOnInit() {
    moment.locale('mk');
  }
}
