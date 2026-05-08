import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<Theme>('dark');

  toggle(): void {
    this.theme.update((t) => {
      const newTheme: Theme = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  }

  init(): void {
    const saved = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    this.theme.set(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }
}