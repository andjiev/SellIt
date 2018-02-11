import { Subscription } from 'rxjs';
import { AdvertCategory } from './../../../models/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-advert-creation',
  templateUrl: './advert-creation.component.html',
  styleUrls: ['./advert-creation.component.css']
})
export class AdvertCreationComponent implements OnInit, OnDestroy {
  private categorySubscription: Subscription;

  public AdvertCategory = AdvertCategory;
  public category: AdvertCategory;

  constructor(private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.categorySubscription = this.route.params.subscribe(params => {
      this.category = +params['id'];
    });
  }

  public navigateToCategory(): void {
    this.router.navigate(['adverts/new']);
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
