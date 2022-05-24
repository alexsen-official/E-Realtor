import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme: Theme;

  constructor() {
    this.currentTheme = localStorage.getItem('theme') as Theme;
  }

  get isDarkTheme() { return this.currentTheme === 'dark'; }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  reverseTheme() {
    this.setTheme(this.isDarkTheme ? 'light' : 'dark');
  }
}
