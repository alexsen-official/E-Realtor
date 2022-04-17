import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  id!: number;

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      params => this.id = Number(params['id'])
    );
  }

  onNext(): void {
    this.id++;
    this._router.navigate(['/property-detail', this.id]).then();
  }

  onPrevious(): void {
    this.id--;
    this._router.navigate(['/property-detail', this.id]).then();
  }
}
