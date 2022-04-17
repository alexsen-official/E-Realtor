import { Component, Input } from '@angular/core';
import { IProperty } from '../../../interfaces/property.interface';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() property!: IProperty;
  @Input() previewOnly: boolean = false;

  constructor() { }
}
