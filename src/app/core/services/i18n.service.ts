import { Injectable, signal } from '@angular/core';
import { TRANSLATIONS } from './translations';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class I18nService {
  lang = signal<Language>('es');

  toggle(): void {
    this.lang.update((l) => {
      const newLang = l === 'es' ? 'en' : 'es';
      localStorage.setItem('lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
      return newLang;
    });
  }

  init(): void {
    const saved = localStorage.getItem('lang') as Language;
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
    const initial = saved ?? browserLang;
    this.lang.set(initial);
    document.documentElement.setAttribute('lang', initial);
  }

  t(key: string): string {
    return TRANSLATIONS[this.lang()][key as keyof (typeof TRANSLATIONS)['es']] ?? key;
  }
}