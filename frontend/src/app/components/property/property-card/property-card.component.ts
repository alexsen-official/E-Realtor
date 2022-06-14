import { Component, Input, OnInit }   from '@angular/core';
import { IProperty }                  from '../../../interfaces';
import { ImageService, ReaderResult } from '../../../services';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: IProperty;

  propertyImage: ReaderResult = null;
  isLoaded = false;

  constructor(private readonly _image: ImageService) { }

  ngOnInit() {
    this.getImageFromService();
  }

  getImageFromService() {
    this._image
        .getImage(this.property._id, this.property.images[0])
        .subscribe(
          blob => {
            this._image
                .createImageFromBlob(blob)
                .then(image => this.propertyImage = image);

            this.isLoaded = true;
          },
          error => {
            this.isLoaded = true;
            console.log(error);
          }
        );
  }
}
