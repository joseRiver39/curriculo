import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/services/theme.service';
import { I18nService } from './core/services/i18n.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { EducationComponent } from './features/education/education.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <div [attr.data-theme]="themeService.theme()" class="min-h-screen bg-primary transition-colors duration-300">
      <app-navbar></app-navbar>
      
      <main>
        <app-hero id="hero"></app-hero>
        <app-about id="sobre-mi"></app-about>
        <app-skills id="habilidades"></app-skills>
        <app-projects id="proyectos"></app-projects>
        <app-experience id="experiencia"></app-experience>
        <app-education id="formacion"></app-education>
        <app-contact id="contacto"></app-contact>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    main {
      padding-top: 64px; /* Altura de la navbar */
    }
  `]
})
export class AppComponent implements OnInit {
  themeService = inject(ThemeService);
  i18n = inject(I18nService);

  ngOnInit() {
    this.themeService.init();
    this.i18n.init();
  }
}
