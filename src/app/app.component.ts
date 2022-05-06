import { Component } from '@angular/core';
import { ThemeService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Realtor';

  get isDarkTheme() {
    return this._theme.isDarkTheme;
  }

  constructor(private readonly _theme: ThemeService) { }
}
