import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experiencia" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('exp_title') }}</h2>
      </div>

      <div class="timeline">
        <div class="timeline-item fade-up">
          <div class="timeline-dot"></div>
          <div class="timeline-date">2024 — {{ i18n.t('exp_present') }}</div>
          <h3 class="timeline-role">{{ i18n.t('exp_job1_title') }}</h3>
          <p class="timeline-company">{{ i18n.t('exp_job1_company') }}</p>
          <ul class="timeline-bullets">
            <li>{{ i18n.t('exp_job1_b1') }}</li>
            <li>{{ i18n.t('exp_job1_b2') }}</li>
            <li>{{ i18n.t('exp_job1_b3') }}</li>
            <li>{{ i18n.t('exp_job1_b4') }}</li>
            <li>{{ i18n.t('exp_job1_b5') }}</li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent implements AfterViewInit {
  i18n = inject(I18nService);

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
