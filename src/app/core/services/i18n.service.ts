import { Injectable, signal, computed } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class I18nService {
  // Señal que almacena el idioma actual
  lang = signal<Language>('es');

  // Diccionario reactivo basado en el idioma actual
  private currentTranslations = computed(() => TRANSLATIONS[this.lang()]);

  toggle(): void {
    const newLang = this.lang() === 'es' ? 'en' : 'es';
    this.lang.set(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    console.log('Idioma cambiado a:', newLang);
  }

  init(): void {
    const saved = localStorage.getItem('lang') as Language;
    const browserLang = navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
    const initial = saved || browserLang || 'es';
    
    this.lang.set(initial as Language);
    document.documentElement.setAttribute('lang', initial);
  }

  t(key: string): string {
    const translations = this.currentTranslations();
    return (translations as any)[key] || key;
  }
}