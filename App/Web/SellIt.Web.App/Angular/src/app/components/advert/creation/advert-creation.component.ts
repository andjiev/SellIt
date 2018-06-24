import { Subscription } from 'rxjs';
import { IAdvertisementCategory } from './../../../models/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-advert-creation',
  templateUrl: './advert-creation.component.html',
  styleUrls: ['./advert-creation.component.css']
})
export class AdvertCreationComponent implements OnInit, OnDestroy {
  private categorySubscription: Subscription;

  public AdvertCategory = IAdvertisementCategory;
  public category: IAdvertisementCategory;
  public inputFileModel: Array<any> = new Array<any>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService) { }

  ngOnInit() {
    this.categorySubscription = this.route.params.subscribe(params => {
      this.category = +params['id'];
    });
  }

  public navigateToCategory(): void {
    this.router.navigate(['adverts/new']);
  }

  public onAccept(event: any) {
    this.imageService.setImages(this.inputFileModel);
  }

  public onRemove(event: any) {
    this.inputFileModel = this.inputFileModel.filter(x => x !== event);
    this.imageService.setImages(this.inputFileModel);
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
