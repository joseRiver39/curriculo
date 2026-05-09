import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { ThemeService } from '../../core/services/theme.service';
import { LucideAngularModule, Moon, Sun, Languages } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <nav class="navbar">
      <a href="#" class="navbar-logo">JOSÉ RIVERA</a>
      
      <ul class="navbar-links">
        <li><a href="#sobre-mi">{{ i18n.t('nav_about') }}</a></li>
        <li><a href="#habilidades">{{ i18n.t('nav_skills') }}</a></li>
        <li><a href="#proyectos">{{ i18n.t('nav_projects') }}</a></li>
        <li><a href="#experiencia">{{ i18n.t('nav_experience') }}</a></li>
        <li><a href="#formacion">{{ i18n.t('nav_education') }}</a></li>
        <li><a href="#contacto">{{ i18n.t('nav_contact') }}</a></li>
      </ul>

      <div class="navbar-controls">
        <button (click)="i18n.toggle()" class="control-btn">
          <lucide-icon [name]="Languages" class="w-4 h-4"></lucide-icon>
          <span>{{ i18n.lang() === 'es' ? 'EN' : 'ES' }}</span>
        </button>
        
        <button (click)="themeService.toggle()" class="control-btn">
          <lucide-icon [name]="themeService.theme() === 'dark' ? Sun : Moon" class="w-4 h-4"></lucide-icon>
        </button>
      </div>

      <div class="navbar-progress" [style.width.%]="scrollProgress"></div>
    </nav>
  `
})
export class NavbarComponent {
  i18n = inject(I18nService);
  themeService = inject(ThemeService);
  
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly Languages = Languages;

  scrollProgress = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (winScroll / height) * 100;
  }
}
