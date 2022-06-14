import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute }             from '@angular/router';
import { IProperty }                  from '../../../interfaces';
import { ImageService, ReaderResult } from '../../../services';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  property!: IProperty;
  propertyImages: ReaderResult[] = [];

  isLoading = false;

  constructor(private readonly _route: ActivatedRoute,
              private readonly _image: ImageService) { }

  get location() {
    return `${ this.property.country }, ${ this.property.state }, ${ this.property.city }, ${ this.property.street }`;
  }

  ngOnInit() {
    this.isLoading = true;

    this._route.data.subscribe(
      data => {
          this.property = data['property'];

          for (const imageSrc of this.property.images) {
            this._image
                .getImage(this.property._id, imageSrc)
                .subscribe(
                  blob => {
                    this._image
                        .createImageFromBlob(blob)
                        .then(image => this.propertyImages.push(image));

                    this.isLoading = false;
                  },
                  error => {
                    this.isLoading = false;
                    console.log(error);
                  });
          }
      }
    );
  }
}
