import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../core/services/i18n.service';
import { LucideAngularModule, Code, Layout, Brain } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section id="sobre-mi" class="section">
      <div class="section-header">
        <h2 class="section-title">{{ i18n.t('about_title') }}</h2>
      </div>

      <div class="about-grid">
        <div class="fade-up fade-up-delay-2">
          <p class="section-subtitle mb-6">
            {{ i18n.t('about_p1') }}
          </p>
          <p class="section-subtitle">
            {{ i18n.t('about_p2') }}
          </p>
        </div>

        <div class="about-cards">
          <div class="card about-card fade-up fade-up-delay-1">
            <div class="about-card-icon bg-blue-500/10 text-blue-500">
              <lucide-icon [name]="Code" class="w-6 h-6"></lucide-icon>
            </div>
            <h3 class="font-bold mb-2">{{ i18n.t('about_card1_title') }}</h3>
            <p class="text-sm text-secondary">{{ i18n.t('about_card1_desc') }}</p>
          </div>

          <div class="card about-card fade-up fade-up-delay-2">
            <div class="about-card-icon bg-purple-500/10 text-purple-500">
              <lucide-icon [name]="Layout" class="w-6 h-6"></lucide-icon>
            </div>
            <h3 class="font-bold mb-2">{{ i18n.t('about_card2_title') }}</h3>
            <p class="text-sm text-secondary">{{ i18n.t('about_card2_desc') }}</p>
          </div>

          <div class="card about-card fade-up fade-up-delay-3">
            <div class="about-card-icon bg-emerald-500/10 text-emerald-500">
              <lucide-icon [name]="Brain" class="w-6 h-6"></lucide-icon>
            </div>
            <h3 class="font-bold mb-2">{{ i18n.t('about_card3_title') }}</h3>
            <p class="text-sm text-secondary">{{ i18n.t('about_card3_desc') }}</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent implements AfterViewInit {
  i18n = inject(I18nService);
  
  readonly Code = Code;
  readonly Layout = Layout;
  readonly Brain = Brain;

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
