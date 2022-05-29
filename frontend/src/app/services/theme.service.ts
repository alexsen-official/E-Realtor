import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable }       from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly darkThemeClass = 'dark-theme';

  currentTheme: Theme = 'light';

  constructor(private overlay: OverlayContainer) {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme)
      this.currentTheme = savedTheme as Theme;
    else if (this.prefersDark)
      this.setTheme('dark');

    this.matchOverlays();
  }

  get isDarkTheme() { return this.currentTheme === 'dark';                              }
  get prefersDark() { return window.matchMedia('(prefers-color-scheme: dark)').matches; }
  get themeClass()  { return this.isDarkTheme ? this.darkThemeClass : '';               }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  reverseTheme() {
    this.setTheme(this.isDarkTheme ? 'light' : 'dark');
  }

  matchOverlays() {
    const overlayContainer = this.overlay.getContainerElement();

    overlayContainer.addEventListener('DOMNodeInserted', () => {
      if (this.isDarkTheme)
        overlayContainer.classList.add(this.darkThemeClass);
      else
        overlayContainer.classList.remove(this.darkThemeClass);
    });
  }
}
