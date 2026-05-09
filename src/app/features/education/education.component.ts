import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { LucideAngularModule, GraduationCap, Code } from 'lucide-angular';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="formacion" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('edu_title') }}</h2>
      </div>

      <div class="edu-grid">
        <div class="card edu-card fade-up">
          <div class="edu-icon-wrapper">
            <lucide-icon [name]="GraduationCap" class="w-6 h-6 text-blue-500"></lucide-icon>
          </div>
          <div class="edu-content">
            <div class="edu-header">
              <h3 class="edu-degree">{{ i18n.t('edu2_title') }}</h3>
              <span class="edu-tag">{{ i18n.t('edu_ongoing') }}</span>
            </div>
            <p class="edu-school">{{ i18n.t('edu2_school') }}</p>
            <p class="edu-desc">{{ i18n.t('edu2_desc') }}</p>
          </div>
        </div>

        <div class="card edu-card fade-up fade-up-delay-1">
          <div class="edu-icon-wrapper">
            <lucide-icon [name]="GraduationCap" class="w-6 h-6 text-purple-500"></lucide-icon>
          </div>
          <div class="edu-content">
            <div class="edu-header">
              <h3 class="edu-degree">{{ i18n.t('edu1_title') }}</h3>
            </div>
            <p class="edu-school">{{ i18n.t('edu1_school') }}</p>
            <p class="edu-desc">{{ i18n.t('edu1_desc') }}</p>
          </div>
        </div>

        <div class="card edu-card fade-up fade-up-delay-2">
          <div class="edu-icon-wrapper">
            <lucide-icon [name]="Code" class="w-6 h-6 text-emerald-500"></lucide-icon>
          </div>
          <div class="edu-content">
            <div class="edu-header">
              <h3 class="edu-degree">{{ i18n.t('edu3_title') }}</h3>
            </div>
            <p class="edu-school">{{ i18n.t('edu3_school') }}</p>
            <p class="edu-desc">{{ i18n.t('edu3_desc') }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class EducationComponent implements AfterViewInit {
  i18n = inject(I18nService);
  
  readonly GraduationCap = GraduationCap;
  readonly Code = Code;

  ngAfterViewInit() {
    setTimeout(() => this.initFadeUp(), 100);
  }

  private initFadeUp() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  }
}
