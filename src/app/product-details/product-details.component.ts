import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import {ApiService} from "../shared/services/api.service";
import {UserDataService} from "../shared/services/user-data.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  items: GalleryItem[] = [];
  productInfo = null;

  constructor(private route: ActivatedRoute, public gallery: Gallery, public lightbox: Lightbox,
              private apiService: ApiService, private userDataService: UserDataService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.apiService.getProductDetails(id).subscribe((response) => {
      if (!response.error) {
        this.productInfo = response.data;
        if (response.data.images.length > 0) {
          response.data.images.forEach(img => {
            this.items.push(new ImageItem({ src: `data:${img.contentType};base64,${img.imageBase64}`, thumb: `data:${img.contentType};base64,${img.imageBase64}` }));
          });
        }
      }
    });
    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  addToCart(): void {
    this.userDataService.addProductToCart(this.productInfo);
  }

}
